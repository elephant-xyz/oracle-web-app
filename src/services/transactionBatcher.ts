import { ethers, Contract } from 'ethers';
import type { Signer } from 'ethers';
import type { DataItem, BatchSubmissionResult } from '../types/contract.types';
import { SUBMIT_CONTRACT_ABI_FRAGMENTS } from '../config/constants';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';

export class TransactionBatcherService {
  private contract: Contract;
  private batchSize: number;

  constructor(
    contractAddress: string,
    signer: Signer,
    batchSize: number = 200
  ) {
    this.contract = new Contract(
      contractAddress,
      SUBMIT_CONTRACT_ABI_FRAGMENTS,
      signer
    );
    this.batchSize = batchSize;
  }

  /**
   * Converts CID to hash by extracting the hash portion
   */
  private extractHashFromCID = (cid: string): string => {
    try {
      const parsedCid = CID.parse(cid);

      // Check if the multihash is SHA-256 (code 0x12)
      if (parsedCid.multihash.code !== sha256.code) {
        throw new Error(
          `Only SHA-256 hash is supported, got hash function code ${parsedCid.multihash.code}`
        );
      }

      // Extract the hash bytes from the multihash
      // This works for both CID v0 and v1 as long as they use SHA-256
      const hashBytes = parsedCid.multihash.digest;

      // Convert to hex string with 0x prefix using ethers.hexlify
      return ethers.hexlify(hashBytes);
    } catch (e: unknown) {
      console.error(`Failed to extract hash from CID: ${String(e)}`);
      throw new Error(`Invalid CID format: ${cid}`);
    }
  };
  /**
   * Prepares DataItem for contract call by converting CIDs to hashes
   */
  private prepareDataItemForContract(item: DataItem): {
    propertyHash: string;
    dataGroupHash: string;
    dataHash: string;
  } {
    return {
      propertyHash: this.extractHashFromCID(item.propertyCid),
      dataGroupHash: this.extractHashFromCID(item.dataGroupCID),
      dataHash: this.extractHashFromCID(item.dataCID),
    };
  }

  /**
   * Groups items into batches of configured size
   */
  public groupItemsIntoBatches(items: DataItem[]): DataItem[][] {
    const batches: DataItem[][] = [];
    for (let i = 0; i < items.length; i += this.batchSize) {
      batches.push(items.slice(i, i + this.batchSize));
    }
    return batches;
  }

  /**
   * Submits a single batch to the contract
   */
  public async submitBatch(batch: DataItem[]): Promise<BatchSubmissionResult> {
    // Prepare the batch for contract submission
    const preparedBatch = batch.map(item =>
      this.prepareDataItemForContract(item)
    );

    // Estimate gas for the transaction
    const estimatedGas =
      await this.contract.submitBatchData.estimateGas(preparedBatch);

    // Add 20% buffer to gas estimate
    const gasLimit =
      estimatedGas + BigInt(Math.floor(Number(estimatedGas) * 0.2));

    // Submit the transaction
    const txResponse = await this.contract.submitBatchData(preparedBatch, {
      gasLimit,
    });

    // Wait for confirmation
    const receipt = await txResponse.wait();

    if (!receipt) {
      throw new Error('Transaction failed - no receipt received');
    }

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      itemsSubmitted: batch.length,
    };
  }

  /**
   * Submits all batches sequentially
   */
  public async *submitAll(
    items: DataItem[]
  ): AsyncGenerator<BatchSubmissionResult> {
    const batches = this.groupItemsIntoBatches(items);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      try {
        const result = await this.submitBatch(batch);
        yield result;
      } catch (error) {
        throw new Error(
          `Failed to submit batch ${i + 1}/${batches.length}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    }
  }
}
