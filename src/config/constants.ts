export const DEFAULT_CONTRACT_ADDRESS =
  '0x525E59e4DE2B51f52B9e30745a513E407652AB7c';

export const DEFAULT_RPC_URL = 'https://polygon-rpc.com';

export const SUBMIT_CONTRACT_ABI_FRAGMENTS = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'propertyHash', type: 'bytes32' },
      { internalType: 'bytes32', name: 'dataGroupHash', type: 'bytes32' },
    ],
    name: 'getCurrentFieldDataHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'propertyHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'dataGroupHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'dataHash', type: 'bytes32' },
        ],
        internalType: 'struct IPropertyDataConsensus.DataItem[]',
        name: 'items',
        type: 'tuple[]',
      },
    ],
    name: 'submitBatchData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'propertyHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'dataGroupHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'submitter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32',
      },
    ],
    name: 'DataSubmitted',
    type: 'event',
  },
] as const;
