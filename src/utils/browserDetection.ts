export interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
  userAgent: string;
}

export function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent;

  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return {
      name: 'Chrome',
      version: getBrowserVersion(userAgent, 'Chrome'),
      isSupported: true,
      userAgent,
    };
  }

  // Firefox
  if (userAgent.includes('Firefox')) {
    return {
      name: 'Firefox',
      version: getBrowserVersion(userAgent, 'Firefox'),
      isSupported: true,
      userAgent,
    };
  }

  // Edge (Chromium-based)
  if (userAgent.includes('Edg')) {
    return {
      name: 'Edge',
      version: getBrowserVersion(userAgent, 'Edg'),
      isSupported: true,
      userAgent,
    };
  }

  // Safari
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return {
      name: 'Safari',
      version: getBrowserVersion(userAgent, 'Version'),
      isSupported: false,
      userAgent,
    };
  }

  // Opera
  if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    return {
      name: 'Opera',
      version: getBrowserVersion(
        userAgent,
        userAgent.includes('OPR') ? 'OPR' : 'Opera'
      ),
      isSupported: true, // Opera is Chromium-based and supports MetaMask
      userAgent,
    };
  }

  // Internet Explorer
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    return {
      name: 'Internet Explorer',
      version:
        getBrowserVersion(userAgent, 'MSIE') ||
        getBrowserVersion(userAgent, 'rv'),
      isSupported: false,
      userAgent,
    };
  }

  // Samsung Internet
  if (userAgent.includes('SamsungBrowser')) {
    return {
      name: 'Samsung Internet',
      version: getBrowserVersion(userAgent, 'SamsungBrowser'),
      isSupported: false,
      userAgent,
    };
  }

  // Default for unknown browsers
  return {
    name: 'Unknown Browser',
    version: 'Unknown',
    isSupported: false,
    userAgent,
  };
}

function getBrowserVersion(userAgent: string, browserName: string): string {
  const regex = new RegExp(`${browserName}[/\\s]([\\d.]+)`, 'i');
  const match = userAgent.match(regex);
  return match ? match[1] : 'Unknown';
}

export function isMetaMaskAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isMetaMask
  );
}

export function canRunWeb3(): boolean {
  const browser = detectBrowser();
  return browser.isSupported && (isMetaMaskAvailable() || browser.isSupported);
}
