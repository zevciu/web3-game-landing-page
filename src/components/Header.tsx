import React, { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../API/WalletAPI.tsx";
import styled from 'styled-components';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 98.75%;
  z-index: 999;
  padding: 0.8rem;
  background-color: rgba(233,205,208, 0.5);
  backdrop-filter: blur(2px);
  transition: transform 0.3s ease;

  @media only screen and (max-width: 768px) {
    padding: 0.2rem;
  }
`;


const ButtonStyle = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.125rem;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  border: 0.1875rem solid;
  padding: 0.25rem 0.35rem;
  box-shadow: 0.0625rem 0.0625rem 0 0, 0.125rem 0.125rem 0 0, 0.1875rem 0.1875rem 0 0, 0.25rem 0.25rem 0 0, 0.3125rem 0.3125rem 0 0; 
  bottom: 0.625rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent;

  &:hover {
    background-color: #f2f2f2;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 0.8rem;
    padding: 0.3rem 0rem;
    border: 0.14rem solid;
    margin-top: 0.3rem;
  }
`;


const LeftButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;


const RightButton = styled.button`
  font-family: 'PixelFont';
  font-size: 1.1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;


const StatusContainer = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 1.2rem;

  @media only screen and (max-width: 1024px) {
    font-size: 0.7rem;
    margin-top: 0.8rem;
  }
`;


const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1rem;

  @media only screen and (max-width: 768px) {
    margin-right: 0rem;
  }
`;


const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flext-start;
  margin-left: 0.5rem;

  @media only screen and (max-width: 1024px) {
    margin-left: 0.8rem;
    margin-bottom: 0.5rem;
  }
  `


const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


const Text = styled.h1`
  font-family: 'PixelText1';
  font-size: 1.88rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const StatusText = styled.h1`
   font-family: 'PixelText7';
   font-size: 0.55rem;
`


const LangButton = styled.button`
  font-family: 'PixelFont5';
  font-size: 0.7rem;
  color: #000;
  letter-spacing: 0.1rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #f2f2f2;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 0.6rem;
    margin-top: 1rem;
  }
`

const Icon = styled.img`
  width: 2rem;
  height: 2rem;

  @media only screen and (max-width: 1024px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media only screen and (max-width: 768px) {
    width: 1.6rem;
    height: 1.6rem;
  }
`;


const FlagIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.25rem;

  @media only screen and (max-width: 1024px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;


const useHeaderAnimation = () => {
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const scrollThreshold = window.innerHeight / 2;

      setIsHeaderVisible(scrollY <= scrollThreshold || scrollY <= headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isHeaderVisible;
};


interface HeaderProps {
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  onLanguageChange: () => void;
  data: {
    errorMessage: string;
    walletNotFoundMessage: string;
    walletConnectedMessage: string;
    walletNotConnectedMessage: string;
    walletDisconnectedMessage: string;
    walletReconnectedMessage: string;
  }
  language: string;
}


const Header: React.FC<HeaderProps> = ({ onLeftButtonClick, onLanguageChange, data, language }) => {
  const isHeaderVisible = useHeaderAnimation();
  const [walletAddress, setWallet] = useState<string>("");
  const [status, setStatus] = useState<string | JSX.Element>("");


  function addWalletListener() {
    if (!window.ethereum) {
      setStatus(
        <StatusText>    
          <a target="_blank" href={`https://metamask.io/download.html`} style={{ textDecoration: 'none' }}>
            <div dangerouslySetInnerHTML={{ __html: data.walletNotFoundMessage }} />
          </a>
        </StatusText>
      );
      return;
    }
  
    window.ethereum.on("accountsChanged", (accounts) => {
      setWallet(accounts[0] || "");
      setStatus(
        <StatusText> {
        accounts.length > 0 
        ? data.walletReconnectedMessage 
        : data.walletDisconnectedMessage} 
        </StatusText>
      );
    });
  }
  

  useEffect(() => {
    const fetchCurrentWalletConnected = async () => {
      const { address, status } = await getCurrentWalletConnected(language);
      setWallet(address);
      setStatus(status);
    };
  
    fetchCurrentWalletConnected();
    addWalletListener(); 
  }, []);
  
  
    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet(language);
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };

    const isMobile = window.innerWidth < 768;
    
    

  return (
    <HeaderContainer style={{ transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)' }}>

      <LeftSideContainer>
      
      <ButtonStyle>
        <LeftButton onClick={onLeftButtonClick}>
          <Icon src="/assets/UI/console_1.png" alt="Icon" />
        </LeftButton>
      </ButtonStyle>
      </LeftSideContainer>

      <MiddleContainer>
      <Text>{language === "english" ? "web3 pixel art game" : "pixel art-owa gra web3"}</Text>
      </MiddleContainer>

      <RightSideContainer>
      <LangButton onClick={onLanguageChange}>
      {language === 'english' ? <FlagIcon src="/assets/UI/pl-flag.svg" alt="PL Flag" /> : <FlagIcon src="/assets/UI/uk-flag.svg" alt="UK Flag" />}
      {language === 'english' ? 'PL' : 'EN'}
      </LangButton>

      {!isMobile && (
      <ButtonStyle>
          <RightButton onClick={connectWalletPressed}>
        {walletAddress.length > 0 
        ? `${data.walletConnectedMessage} ${String(walletAddress).substring(0, 6)}...${String(walletAddress).substring(38)}`
        : data.walletNotConnectedMessage}
          </RightButton>
      </ButtonStyle>
    )}
      

      <StatusContainer>{status}</StatusContainer>
      </RightSideContainer>

    </HeaderContainer>
  );
};


export default Header;
