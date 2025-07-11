import React from 'react';

interface MetaMaskButtonProps {
  isInstalled: boolean;
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onInstall: () => void;
}

const MetaMaskIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 318.6 318.6"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <polygon
      fill="#E2761B"
      stroke="#E2761B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="274.1,35.5 174.6,109.4 193,65.8 "
    />
    <g>
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="44.4,35.5 143.1,110.1 125.6,65.8 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="238.3,206.8 211.8,247.4 268.5,262.6 284.8,207.7 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="33.9,207.7 50.1,262.6 106.8,247.4 80.3,206.8 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="106.8,247.4 140.6,230.9 111.4,208.1 "
      />
      <polygon
        fill="#E4761B"
        stroke="#E4761B"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="177.9,230.9 211.8,247.4 207.1,208.1 "
      />
    </g>
    <g>
      <polygon
        fill="#D7C1B3"
        stroke="#D7C1B3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.2 "
      />
      <polygon
        fill="#D7C1B3"
        stroke="#D7C1B3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="106.8,247.4 138.3,262.2 138.1,253 140.6,230.9 "
      />
    </g>
    <polygon
      fill="#233447"
      stroke="#233447"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="138.8,193.5 110.6,185.2 130.5,176.1 "
    />
    <polygon
      fill="#233447"
      stroke="#233447"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="179.7,193.5 188,176.1 208,185.2 "
    />
    <g>
      <polygon
        fill="#CD6116"
        stroke="#CD6116"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="106.8,247.4 111.6,206.8 80.3,207.7 "
      />
      <polygon
        fill="#CD6116"
        stroke="#CD6116"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="207,206.8 211.8,247.4 238.3,207.7 "
      />
      <polygon
        fill="#CD6116"
        stroke="#CD6116"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 "
      />
      <polygon
        fill="#CD6116"
        stroke="#CD6116"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 "
      />
    </g>
    <g>
      <polygon
        fill="#E4751F"
        stroke="#E4751F"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="87.8,162.1 111.4,208.1 110.6,185.2 "
      />
      <polygon
        fill="#E4751F"
        stroke="#E4751F"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="208.1,185.2 207.1,208.1 230.8,162.1 "
      />
      <polygon
        fill="#E4751F"
        stroke="#E4751F"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 "
      />
      <polygon
        fill="#E4751F"
        stroke="#E4751F"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 "
      />
    </g>
    <polygon
      fill="#F6851B"
      stroke="#F6851B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "
    />
    <polygon
      fill="#F6851B"
      stroke="#F6851B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "
    />
    <polygon
      fill="#C0AD9E"
      stroke="#C0AD9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="180.3,262.2 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.2 106.8,247.4 117.8,256.4 140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "
    />
    <polygon
      fill="#161616"
      stroke="#161616"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "
    />
    <g>
      <polygon
        fill="#763D16"
        stroke="#763D16"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 281.8,129.1 275.6,124.3 283.6,118.2 "
      />
      <polygon
        fill="#763D16"
        stroke="#763D16"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 140.6,106.9 44.4,35.5 "
      />
    </g>
    <polygon
      fill="#F6851B"
      stroke="#F6851B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "
    />
    <polygon
      fill="#F6851B"
      stroke="#F6851B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "
    />
    <polygon
      fill="#F6851B"
      stroke="#F6851B"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 173.1,227.6 173.3,182.8 "
    />
  </svg>
);

export const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isInstalled,
  isConnected,
  isLoading,
  onConnect,
  onInstall,
}) => {
  if (isConnected) {
    return (
      <div className="flex items-center bg-brand-green-20 border border-brand-green-60 rounded-lg p-3">
        <MetaMaskIcon />
        <span className="text-brand-charcoal-100 font-medium">
          MetaMask Connected
        </span>
      </div>
    );
  }

  if (!isInstalled) {
    return (
      <button
        onClick={onInstall}
        className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <MetaMaskIcon />
        <span>Install MetaMask</span>
      </button>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isLoading}
      className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <MetaMaskIcon />
          <span>Connect MetaMask</span>
        </>
      )}
    </button>
  );
};
