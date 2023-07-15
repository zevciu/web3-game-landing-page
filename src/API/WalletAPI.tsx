import { BrowserProvider, Eip1193Provider } from "ethers/providers";
import { walletCopy, walletCopyPL } from "../data/WalletData";


declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
    contract: any;
  }
}


type EthereumAddress = string & { __brand: "EthereumAddress" };


export const getCurrentWalletConnected = async (language: string) => {
  try {
    const addressArray = window.ethereum ? await window.ethereum.request({ method: "eth_accounts" }) : [];
    return {
      address: addressArray.length > 0 ? addressArray[0] : "",
      status: "",
    };
  } catch (err) {
    return {
      address: "",
      status: language === "english" 
      ? `😥 ${err instanceof Error ? err.message : walletCopy.errorMessage}` 
      : `😥 ${err instanceof Error ? err.message : walletCopyPL.errorMessage}`,
    };
  }
};

export const connectWallet = async (language: string): Promise<{ address: EthereumAddress | ""; status: string | JSX.Element }> => {
  if (!window.ethereum) {
    return {
      address: "",
      status: (
        <a target="_blank" href={`https://metamask.io/download.html`}>
          {language === 'english' 
          ? walletCopy.walletNotFoundMessage 
          : walletCopyPL.walletNotFoundMessage}
        </a>
      ),
    };
  }

  try {
    const addressArray = await window.ethereum.request({
      method: "eth_requestAccounts",
    }) as EthereumAddress[];

    return {
      status: "",
      address: addressArray[0],
    };
  } catch (err) {
    return {
      address: "",
      status: language === "english" 
      ? `😥 ${err instanceof Error ? err.message : walletCopy.errorMessage}` 
      : `😥 ${err instanceof Error ? err.message : walletCopyPL.errorMessage}`,
    };
  }
};