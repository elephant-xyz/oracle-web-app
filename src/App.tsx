import { useState, useEffect } from 'react';
import { CsvUploader } from './components/CsvUploader';
import { MetaMaskButton } from './components/MetaMaskButton';
import { UnsupportedBrowser } from './components/UnsupportedBrowser';
import { useMetaMask } from './hooks/useMetaMask';
import { TransactionBatcherService } from './services/transactionBatcher';
import { detectBrowser } from './utils/browserDetection';
import type {
  CsvRecord,
  DataItem,
  TransactionState,
} from './types/contract.types';
import { DEFAULT_CONTRACT_ADDRESS } from './config/constants';
import './App.css';

function App() {
  // Browser detection
  const browserInfo = detectBrowser();

  const {
    isConnected,
    account,
    chainId,
    isLoading: walletLoading,
    error: walletError,
    signer,
    connectWallet,
    switchToPolygon,
    isMetaMaskInstalled,
    getMetaMaskInstallUrl,
  } = useMetaMask();

  const [csvData, setCsvData] = useState<CsvRecord[]>([]);
  const [contractAddress, setContractAddress] = useState(
    DEFAULT_CONTRACT_ADDRESS
  );
  const [batchSize, setBatchSize] = useState(200);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [transactionState, setTransactionState] = useState<TransactionState>({
    status: 'idle',
  });
  const [submissionResults, setSubmissionResults] = useState<
    Array<{
      batchNumber: number;
      transactionHash: string;
      itemCount: number;
      gasUsed: string;
    }>
  >([]);

  // Check for configuration query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setShowConfiguration(urlParams.get('configuration') === 'true');
  }, []);

  const handleCsvLoaded = (data: CsvRecord[]) => {
    setCsvData(data);
    setTransactionState({ status: 'idle' });
    setSubmissionResults([]);
  };

  const handleCsvError = (error: string) => {
    setTransactionState({ status: 'error', error });
  };

  const handleInstallMetaMask = () => {
    window.open(getMetaMaskInstallUrl(), '_blank');
  };

  const handleClearData = () => {
    setCsvData([]);
    setTransactionState({ status: 'idle' });
    setSubmissionResults([]);
  };

  const handleSubmitTransactions = async () => {
    if (!signer || !csvData.length) return;

    setTransactionState({
      status: 'processing',
      message: 'Preparing transactions...',
    });
    setSubmissionResults([]);

    try {
      // Convert CSV records to DataItems
      const dataItems: DataItem[] = csvData.map(record => ({
        propertyCid: record.propertyCid,
        dataGroupCID: record.dataGroupCid,
        dataCID: record.dataCid,
      }));

      const batcher = new TransactionBatcherService(
        contractAddress,
        signer,
        batchSize
      );

      let batchNumber = 1;
      for await (const result of batcher.submitAll(dataItems)) {
        setSubmissionResults(prev => [
          ...prev,
          {
            batchNumber,
            transactionHash: result.transactionHash,
            itemCount: result.itemsSubmitted,
            gasUsed: result.gasUsed,
          },
        ]);

        setTransactionState({
          status: 'processing',
          message: `Submitted batch ${batchNumber}... Transaction: ${result.transactionHash}`,
        });

        batchNumber++;
      }

      setTransactionState({
        status: 'success',
        message: `Successfully submitted ${submissionResults.length + 1} batches`,
      });
    } catch (error) {
      setTransactionState({
        status: 'error',
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  const isPolygon = chainId === 137;
  const canSubmit =
    isConnected &&
    isPolygon &&
    csvData.length > 0 &&
    transactionState.status !== 'processing';

  // Show unsupported browser screen if browser is not supported
  if (!browserInfo.isSupported) {
    return (
      <UnsupportedBrowser
        browserName={browserInfo.name}
        userAgent={browserInfo.userAgent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://elephant.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="/vertical-logo-gray.svg"
                alt="Elephant Network"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal-100 mb-2">
            🐘 Elephant Network Data Submitter
          </h1>
          <p className="text-brand-storm-100 mb-4">
            Submit data hashes to the Elephant Network smart contract using
            MetaMask
          </p>
          <div className="bg-brand-green-20 border border-brand-green-60 rounded-lg p-4 mb-4 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-brand-charcoal-100 mb-2">
              📋 How to use this tool:
            </h3>
            <ol className="text-sm text-brand-charcoal-100 space-y-1 list-decimal list-inside">
              <li>
                Connect your MetaMask wallet and ensure you're on the Polygon
                network
              </li>
              <li>
                Upload a CSV file containing your data hashes (from the
                Notebook)
              </li>
              <li>
                Review the data and click "Submit to Contract" to send
                transactions
              </li>
              <li>Confirm each transaction in MetaMask when prompted</li>
            </ol>
          </div>
          <div className="flex justify-center">
            <a
              href="https://elephant.xyz/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-brand-storm-100 hover:text-brand-charcoal-100 bg-brand-white-100 hover:bg-brand-offwhite-100 border border-brand-storm-40 rounded-md transition-colors"
            >
              📄 Read Whitepaper
            </a>
          </div>
        </header>

        {/* Wallet Connection */}
        <div className="bg-brand-white-100 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-brand-charcoal-100">
            Step 1: Connect Your Wallet
          </h2>
          <p className="text-brand-storm-100 mb-4 text-sm">
            Connect your MetaMask wallet to interact with the Polygon
            blockchain. You'll need POL tokens to pay for transaction gas fees.
          </p>

          <div className="space-y-4">
            <MetaMaskButton
              isInstalled={isMetaMaskInstalled}
              isConnected={isConnected}
              isLoading={walletLoading}
              onConnect={connectWallet}
              onInstall={handleInstallMetaMask}
            />

            {walletError && (
              <p className="text-red-500 text-sm">{walletError}</p>
            )}

            {isConnected && (
              <div className="space-y-2 pt-2">
                <p className="text-sm text-brand-storm-100">
                  Account: <span className="font-mono">{account}</span>
                </p>
                <p className="text-sm text-brand-storm-100">
                  Chain ID: {chainId}
                </p>

                {!isPolygon && (
                  <div className="mt-4">
                    <p className="text-amber-600 mb-2">
                      ⚠️ Please switch to Polygon network
                    </p>
                    <button
                      onClick={switchToPolygon}
                      className="bg-brand-storm-100 hover:bg-brand-storm-80 text-brand-white-100 px-4 py-2 rounded-md"
                    >
                      Switch to Polygon
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Configuration */}
        {showConfiguration && (
          <div className="bg-brand-white-100 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-brand-charcoal-100">
              Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal-100 mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={e => setContractAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-storm-40 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-60 bg-brand-white-100 text-brand-charcoal-100"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal-100 mb-2">
                  Batch Size
                </label>
                <input
                  type="number"
                  value={batchSize}
                  onChange={e => setBatchSize(parseInt(e.target.value) || 200)}
                  min="1"
                  max="500"
                  className="w-full px-3 py-2 border border-brand-storm-40 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-60 bg-brand-white-100 text-brand-charcoal-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* CSV Upload */}
        <div className="bg-brand-white-100 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-brand-charcoal-100">
            Step 2: Upload Your CSV File
          </h2>
          <p className="text-brand-storm-100 mb-4 text-sm">
            Upload the CSV file generated by the Elephant CLI tool or Jupyter
            Notebook from Google Colab. This file contains the data hashes that
            will be submitted to the smart contract.
          </p>
          <div className="bg-brand-storm-20 border border-brand-storm-40 rounded-md p-3 mb-4">
            <p className="text-xs text-brand-charcoal-100">
              <strong>Expected CSV format:</strong> The file should contain
              columns for <code>propertyCid</code>, <code>dataGroupCid</code>,
              and <code>dataCid</code>. Generate this file using the{' '}
              <code>elephant-cli validate-and-upload</code> command.
            </p>
          </div>
          <CsvUploader
            onDataLoaded={handleCsvLoaded}
            onError={handleCsvError}
            hasData={csvData.length > 0}
          />

          {csvData.length > 0 && (
            <div className="mt-4 p-4 bg-brand-green-20 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-brand-charcoal-100 font-medium">
                    ✅ Loaded {csvData.length} records from CSV
                  </p>
                  <p className="text-sm text-brand-storm-100 mt-1">
                    Will create {Math.ceil(csvData.length / batchSize)}{' '}
                    transaction batches
                  </p>
                </div>
                <button
                  onClick={handleClearData}
                  className="text-sm text-brand-storm-100 hover:text-brand-charcoal-100 underline"
                >
                  Clear & Upload New
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction Submission */}
        {csvData.length > 0 && (
          <div className="bg-brand-white-100 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-brand-charcoal-100">
              Step 3: Submit to Blockchain
            </h2>
            <p className="text-brand-storm-100 mb-4 text-sm">
              Submit your data hashes to the Elephant Network smart contract.
              Each batch will require a separate transaction confirmation in
              MetaMask.
            </p>

            <button
              onClick={handleSubmitTransactions}
              disabled={!canSubmit}
              className="bg-brand-green-100 hover:bg-brand-green-80 disabled:bg-brand-storm-60 text-brand-white-100 px-6 py-3 rounded-md font-medium mb-4"
            >
              {transactionState.status === 'processing'
                ? 'Submitting...'
                : 'Submit to Contract'}
            </button>

            {transactionState.status !== 'idle' && (
              <div
                className={`p-4 rounded-md mb-4 ${
                  transactionState.status === 'success'
                    ? 'bg-brand-green-20 text-brand-charcoal-100'
                    : transactionState.status === 'error'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-brand-storm-20 text-brand-charcoal-100'
                }`}
              >
                {transactionState.status === 'processing' && (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-charcoal-100 mr-2"></div>
                    <span>{transactionState.message}</span>
                  </div>
                )}
                {transactionState.status === 'success' && (
                  <span>✅ {transactionState.message}</span>
                )}
                {transactionState.status === 'error' && (
                  <span>❌ {transactionState.error}</span>
                )}
              </div>
            )}

            {submissionResults.length > 0 && (
              <div className="border border-brand-storm-40 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-brand-offwhite-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-brand-charcoal-100">
                        Batch
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-brand-charcoal-100">
                        Items
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-brand-charcoal-100">
                        Gas Used
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-brand-charcoal-100">
                        Transaction
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionResults.map(result => (
                      <tr
                        key={result.batchNumber}
                        className="border-t border-brand-storm-40"
                      >
                        <td className="px-4 py-2 text-sm text-brand-storm-100">
                          {result.batchNumber}
                        </td>
                        <td className="px-4 py-2 text-sm text-brand-storm-100">
                          {result.itemCount}
                        </td>
                        <td className="px-4 py-2 text-sm text-brand-storm-100">
                          {result.gasUsed}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <a
                            href={`https://polygonscan.com/tx/${result.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-green-100 hover:text-brand-green-80 underline"
                          >
                            {result.transactionHash.slice(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
