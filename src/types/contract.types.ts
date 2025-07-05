export interface DataItem {
  propertyCid: string;
  dataGroupCID: string;
  dataCID: string;
}

export interface CsvRecord {
  propertyCid: string;
  dataGroupCid: string;
  dataCid: string;
  filePath: string;
  uploadedAt: string;
}

export interface BatchSubmissionResult {
  transactionHash: string;
  blockNumber: number;
  gasUsed: string;
  itemsSubmitted: number;
}

export interface TransactionState {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
  transactionHash?: string;
  error?: string;
}
