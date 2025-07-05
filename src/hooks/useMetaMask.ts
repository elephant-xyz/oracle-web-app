import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import type { Signer } from 'ethers';

interface MetaMaskState {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
  provider: BrowserProvider | null;
  signer: Signer | null;
}

interface UseMetaMaskReturn extends MetaMaskState {
  connectWallet: () => Promise<void>;
  switchToPolygon: () => Promise<void>;
  disconnectWallet: () => void;
  isMetaMaskInstalled: boolean;
  getMetaMaskInstallUrl: () => string;
}

const POLYGON_CHAIN_ID = 137;
const POLYGON_PARAMS = {
  chainId: `0x${POLYGON_CHAIN_ID.toString(16)}`,
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
};

export const useMetaMask = (): UseMetaMaskReturn => {
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    chainId: null,
    isLoading: false,
    error: null,
    provider: null,
    signer: null,
  });

  const isMetaMaskInstalled = typeof window.ethereum !== 'undefined';

  const getMetaMaskInstallUrl = (): string => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    } else if (userAgent.includes('Firefox')) {
      return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
    } else if (userAgent.includes('Edg')) {
      return 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm';
    } else {
      // Default to Chrome Web Store
      return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    }
  };

  const checkConnection = async () => {
    if (typeof window.ethereum === 'undefined') {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        setState(prev => ({
          ...prev,
          isConnected: true,
          account: accounts[0].address,
          chainId: Number(network.chainId),
          provider,
          signer,
          error: null,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();

      setState(prev => ({
        ...prev,
        isConnected: true,
        account,
        chainId: Number(network.chainId),
        provider,
        signer,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  };

  const switchToPolygon = async () => {
    if (typeof window.ethereum === 'undefined') {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_PARAMS.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [POLYGON_PARAMS],
          });
        } catch (addError) {
          setState(prev => ({
            ...prev,
            error:
              addError instanceof Error
                ? addError.message
                : 'Failed to add Polygon network',
          }));
        }
      } else {
        setState(prev => ({
          ...prev,
          error:
            switchError instanceof Error
              ? switchError.message
              : 'Failed to switch network',
        }));
      }
    }
  };

  const disconnectWallet = () => {
    setState({
      isConnected: false,
      account: null,
      chainId: null,
      isLoading: false,
      error: null,
      provider: null,
      signer: null,
    });
  };

  useEffect(() => {
    checkConnection();

    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        checkConnection();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return {
    ...state,
    connectWallet,
    switchToPolygon,
    disconnectWallet,
    isMetaMaskInstalled,
    getMetaMaskInstallUrl,
  };
};

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
