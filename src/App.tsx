import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import DreamConfigurator from './pages/DreamConfiguratorPage';
import GlobalStyle from './globalStyles';
import styled from 'styled-components';
import DisclosurePage from './pages/DisclosurePage';
import Header from './components/Header';
import { DreamConfiguratorCopy, DreamConfiguratorCopyPL } from './data/DreamConfiguratorData';
import { walletCopy, walletCopyPL } from './data/WalletData';
import { disclosureCopy, disclosureCopyPL } from './data/DisclosureData';


const AppContainer = styled.div``;


const App: React.FC = () => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [language, setLanguage] = useState('english');


  const handleReturnToStartPage = () => {
    setShowConfigurator(false);
    setShowDisclosure(false);
  };
  

  const handleLanguageChange = () => {
    setLanguage(language === 'english' ? 'polish' : 'english');
  };


  return (
    <AppContainer>

      <GlobalStyle />
      <Header 
        onLeftButtonClick={handleReturnToStartPage}
        onLanguageChange={handleLanguageChange}
        data = {language === 'english' ? walletCopy : walletCopyPL}
        language={language} />

      {!showConfigurator && !showDisclosure && 
      <StartPage 
        onConfigureDream={() => setShowConfigurator(true)}
        language={language} />}

      {showConfigurator && !showDisclosure && (
        <DreamConfigurator 
        steps={language === 'english' ? DreamConfiguratorCopy : DreamConfiguratorCopyPL} 
        onRenderDisclosure={() => setShowDisclosure(true)}
        language={language} />
      )}

      {showDisclosure && <DisclosurePage 
        data={language === 'english' ? disclosureCopy : disclosureCopyPL} />}

    </AppContainer>
  );
};


export default App;