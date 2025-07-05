import React from 'react';

interface UnsupportedBrowserProps {
  browserName: string;
  userAgent: string;
}

export const UnsupportedBrowser: React.FC<UnsupportedBrowserProps> = ({
  browserName,
  userAgent,
}) => {
  return (
    <div className="min-h-screen bg-brand-offwhite-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
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
        </div>

        {/* Unsupported Browser Warning */}
        <div className="bg-brand-white-100 rounded-lg shadow-md p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-brand-charcoal-100 mb-2">
              Browser Not Supported
            </h2>
            <p className="text-brand-storm-100">
              We detected you're using <strong>{browserName}</strong>, which is
              not supported by this application.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">
              Why is this happening?
            </h3>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>
                This application requires MetaMask browser extension to connect
                to the Polygon blockchain
              </li>
              <li>
                MetaMask is not available for Safari and some other browsers
              </li>
              <li>
                Web3 functionality requires specific browser APIs that may not
                be available in your browser
              </li>
            </ul>
          </div>

          <div className="bg-brand-green-20 border border-brand-green-60 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-brand-charcoal-100 mb-3">
              ✅ Supported Browsers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌐</div>
                <p className="font-medium text-brand-charcoal-100">Chrome</p>
                <p className="text-xs text-brand-storm-100">Recommended</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <p className="font-medium text-brand-charcoal-100">Firefox</p>
                <p className="text-xs text-brand-storm-100">Fully supported</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔷</div>
                <p className="font-medium text-brand-charcoal-100">Edge</p>
                <p className="text-xs text-brand-storm-100">Chromium-based</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-brand-charcoal-100">
              Next Steps:
            </h3>
            <ol className="text-sm text-brand-charcoal-100 space-y-2 list-decimal list-inside">
              <li>Switch to Chrome, Firefox, or Edge browser</li>
              <li>Install the MetaMask browser extension</li>
              <li>Return to this page and connect your wallet</li>
              <li>Upload your CSV file and submit transactions</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              🌐 Download Chrome
            </a>
            <a
              href="https://www.mozilla.org/firefox/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
            >
              🔥 Download Firefox
            </a>
            <a
              href="https://www.microsoft.com/edge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md transition-colors"
            >
              🔷 Download Edge
            </a>
          </div>
        </div>

        {/* Alternative Solutions */}
        <div className="bg-brand-white-100 rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-brand-charcoal-100 mb-4">
            Alternative Solutions
          </h3>
          <div className="space-y-3 text-sm text-brand-storm-100">
            <div className="flex items-start">
              <span className="text-brand-green-100 mr-2">📱</span>
              <div>
                <p className="font-medium text-brand-charcoal-100">
                  Mobile Options:
                </p>
                <p>Use MetaMask mobile browser or Trust Wallet on your phone</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-brand-green-100 mr-2">💻</span>
              <div>
                <p className="font-medium text-brand-charcoal-100">CLI Tool:</p>
                <p>
                  Use the Elephant CLI directly from your command line without
                  browser requirements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <details className="bg-brand-storm-20 rounded-md p-4 cursor-pointer">
          <summary className="font-medium text-brand-charcoal-100 mb-2">
            Technical Details
          </summary>
          <div className="text-xs text-brand-storm-100 mt-2">
            <p>
              <strong>Detected Browser:</strong> {browserName}
            </p>
            <p>
              <strong>User Agent:</strong> {userAgent}
            </p>
            <p>
              <strong>Required APIs:</strong> Web3, MetaMask Provider, Ethereum
              JSON-RPC
            </p>
          </div>
        </details>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-4">
            <a
              href="https://elephant.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-storm-100 hover:text-brand-charcoal-100 underline text-sm"
            >
              🏠 Elephant Network
            </a>
            <a
              href="https://elephant.xyz/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-storm-100 hover:text-brand-charcoal-100 underline text-sm"
            >
              📄 Whitepaper
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
