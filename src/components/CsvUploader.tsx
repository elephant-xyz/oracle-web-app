import React, { useState } from 'react';
import Papa from 'papaparse';
import type { CsvRecord } from '../types/contract.types';

interface CsvUploaderProps {
  onDataLoaded: (data: CsvRecord[]) => void;
  onError: (error: string) => void;
  hasData?: boolean;
}

export const CsvUploader: React.FC<CsvUploaderProps> = ({
  onDataLoaded,
  onError,
  hasData = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      onError('Please select a CSV file');
      return;
    }

    setIsLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        try {
          const data = results.data as CsvRecord[];

          // Validate required columns
          const requiredColumns = [
            'propertyCid',
            'dataGroupCid',
            'dataCid',
            'filePath',
            'uploadedAt',
          ];
          const hasAllColumns = requiredColumns.every(
            col => data.length > 0 && col in data[0]
          );

          if (!hasAllColumns) {
            onError(`CSV must contain columns: ${requiredColumns.join(', ')}`);
            setIsLoading(false);
            return;
          }

          // Filter out any empty rows
          const validData = data.filter(
            row => row.propertyCid && row.dataGroupCid && row.dataCid
          );

          if (validData.length === 0) {
            onError('No valid data rows found in CSV');
            setIsLoading(false);
            return;
          }

          onDataLoaded(validData);
          setIsLoading(false);
        } catch (error) {
          onError(
            `Error parsing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
          setIsLoading(false);
        }
      },
      error: error => {
        onError(`Error reading CSV: ${error.message}`);
        setIsLoading(false);
      },
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Don't render the drop zone if data has been loaded
  if (hasData) {
    return null;
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-brand-green-60 bg-brand-green-20'
          : 'border-brand-storm-40 hover:border-brand-storm-60'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-100"></div>
          <span className="ml-2 text-brand-charcoal-100">Parsing CSV...</span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-brand-storm-60"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mb-4">
            <p className="text-lg font-medium text-brand-charcoal-100">
              Drop your CSV file here
            </p>
            <p className="text-sm text-brand-storm-100">or click to browse</p>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-white-100 bg-brand-green-100 hover:bg-brand-green-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-60"
          >
            Choose CSV File
          </label>
          <p className="mt-2 text-xs text-brand-storm-80">
            Expected columns: propertyCid, dataGroupCid, dataCid, filePath,
            uploadedAt
          </p>
        </>
      )}
    </div>
  );
};
