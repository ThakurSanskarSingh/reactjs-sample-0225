// Web3 Integration utilities
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>; 
     
    };
  }
}

export const connectWallet = async (): Promise<string> => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Dynamically import Web3 only on client side
      const Web3 = (await import('web3')).default;
      const web3 = new Web3(window.ethereum);
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      
      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Failed to connect wallet');
    }
  } else {
    throw new Error('MetaMask is not installed. Please install MetaMask to use Web3 features.');
  }
};

export const getWeb3Instance = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const Web3 = (await import('web3')).default;
    return new Web3(window.ethereum);
  }
  return null;
};