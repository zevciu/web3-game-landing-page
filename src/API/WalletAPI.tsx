import { BrowserProvider, Eip1193Provider } from "ethers/providers";
import { walletCopy, walletCopyPL } from "../data/WalletData";
import styled from 'styled-components';


const StatusText = styled.h1`
   font-family: 'PixelText7';
   font-size: 0.55rem;
`


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
      status: (
        <StatusText>
          {language === "english"
            ? `${err instanceof Error ? err.message : walletCopy.errorMessage}`
            : `${err instanceof Error ? err.message : walletCopyPL.errorMessage}`}
        </StatusText>
      ),
    };
  }
};

export const connectWallet = async (language: string): Promise<{ address: EthereumAddress | ""; status: string | JSX.Element }> => {
  if (!window.ethereum) {

    const walletNotFoundMessage = 
    language === 'english' 
    ? walletCopy.walletNotFoundMessage 
    : walletCopyPL.walletNotFoundMessage;

    return {
      address: "",
      status: (
        <StatusText>    
          <a target="_blank" href={`https://metamask.io/download.html`} style={{ textDecoration: 'none' }}>
            <div dangerouslySetInnerHTML={{ __html: walletNotFoundMessage }} />
          </a>
        </StatusText>
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
      status: (
        <StatusText>
          {language === "english" 
            ? `${err instanceof Error ? err.message : walletCopy.errorMessage}` 
            : `${err instanceof Error ? err.message : walletCopyPL.errorMessage}`}
        </StatusText>
      ),
    };
  }
};