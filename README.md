# 🐘 Elephant Network Data Submitter Web App

A React-based web application for submitting data hashes to the Elephant Network smart contract using MetaMask. This web app provides the same functionality as the CLI's `submit-to-contract` command but with a user-friendly web interface.

## Features

- **MetaMask Integration**: Connect your wallet and switch to Polygon network automatically
- **CSV File Upload**: Drag-and-drop or browse to upload CSV files with data to submit
- **Transaction Batching**: Configurable batch sizes for efficient gas usage
- **Real-time Status**: Live updates on transaction submission progress
- **Transaction Links**: Direct links to view transactions on PolygonScan

## Key Differences from CLI

This web app is **simpler** than the CLI version:

1. **No Eligibility Checks**: Does not verify consensus data or check if user has already submitted
2. **No Blockchain Traversal**: Does not query the blockchain for existing submissions
3. **MetaMask Only**: Uses MetaMask for wallet connection instead of private keys
4. **Direct Submission**: Takes CSV input and submits directly to the contract

## Prerequisites

- **MetaMask Extension**: Install MetaMask browser extension
- **Polygon Network**: Ensure you have MATIC tokens for gas fees
- **CSV File**: Valid CSV file from the `validate-and-upload` CLI command

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Connect Wallet**: Click "Connect MetaMask" and approve the connection
2. **Switch Network**: If not on Polygon, click "Switch to Polygon"
3. **Configure** (optional):
   - Add `?configuration=true` to the URL to show configuration options
   - Set the contract address (default: `0x525E59e4DE2B51f52B9e30745a513E407652AB7c`)
   - Adjust batch size (default: 200 items per transaction)
4. **Upload CSV**: Drag and drop or select your CSV file
5. **Submit**: Click "Submit to Contract" to send transactions

### Configuration Options

The configuration section is hidden by default for a cleaner user experience. To access it:

- **Show Configuration**: Visit `http://localhost:5174?configuration=true`
- **Hide Configuration**: Visit `http://localhost:5174` (default)

## CSV Format

The app expects CSV files with these columns:

- `propertyCid`: Property identifier CID
- `dataGroupCid`: Data group identifier CID
- `dataCid`: Data content CID
- `filePath`: Original file path (for reference)
- `uploadedAt`: Upload timestamp

## Technical Details

### Built With

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Ethers.js v6** for blockchain interaction
- **PapaParse** for CSV parsing

### Smart Contract Integration

- Uses the same ABI as the CLI version
- Converts CIDs to bytes32 hashes for contract calls
- Submits data in batches using `submitBatchData` function
- Estimates gas and adds 20% buffer

### Security

- No private key handling (uses MetaMask)
- Input validation for CSV data
- Transaction confirmation required via MetaMask
- All blockchain interactions are read-only except submissions

## Development

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── CsvUploader.tsx      # CSV file upload component
├── hooks/
│   └── useMetaMask.ts       # MetaMask wallet integration
├── services/
│   └── transactionBatcher.ts # Transaction batching logic
├── types/
│   └── contract.types.ts    # TypeScript type definitions
├── config/
│   └── constants.ts         # Contract ABI and constants
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Environment

- **Default Network**: Polygon Mainnet (Chain ID: 137)
- **Default RPC**: Uses MetaMask's configured RPC
- **Contract**: Elephant Network Data Consensus Contract

## Troubleshooting

### MetaMask Issues

- Ensure MetaMask is installed and unlocked
- Check you're connected to Polygon network
- Verify you have sufficient MATIC for gas

### CSV Issues

- Verify CSV has all required columns
- Check for empty rows or invalid data
- Ensure CIDs are properly formatted

### Transaction Issues

- Check gas price settings in MetaMask
- Ensure batch size isn't too large (max 500)
- Verify contract address is correct

## License

This project follows the same license as the main Elephant CLI project.
