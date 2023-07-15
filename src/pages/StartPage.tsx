import React from 'react';
import styled from 'styled-components';
import ListImage from '../components/ListImage';
import TextImage from '../components/TextImage';
import Hero from '../components/Hero';
import { decentralizedExperiencesCopy, decentralizedExperiencesCopyPL } from '../data/ListImageData';
import { craftYourDreamCopy, craftYourDreamCopyPL, conjunctionOfDreamworldsCopy, conjunctionOfDreamworldsCopyPL } from '../data/TextImageData';
import { heroCopy, heroCopyPL } from '../data/HeroData';
import Footer from '../components/Footer';
import { footerCopy, footerCopyPL } from '../data/FooterData';


interface StartPageProps {
  onConfigureDream: () => void;
  language: string;
}


const GlobalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


const StartPage: React.FC<StartPageProps> = ({ onConfigureDream, language }) => {

  const handleConfigureDream = () => {
    onConfigureDream();
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <GlobalContainer>
  {language === 'english' ? (
    <>
      <Hero data={heroCopy} onClickButton={handleConfigureDream} />
      <TextImage data={craftYourDreamCopy} imagePosition="left" onClickButton={handleConfigureDream} />
      <ListImage data={decentralizedExperiencesCopy} />
      <TextImage data={conjunctionOfDreamworldsCopy} imagePosition="left" onClickButton={handleConfigureDream} />
      <Footer data={footerCopy}/>
    </>
  ) : (
    <>
      <Hero data={heroCopyPL} onClickButton={handleConfigureDream} />
      <TextImage data={craftYourDreamCopyPL} imagePosition="left" onClickButton={handleConfigureDream} />
      <ListImage data={decentralizedExperiencesCopyPL} />
      <TextImage data={conjunctionOfDreamworldsCopyPL} imagePosition="left" onClickButton={handleConfigureDream} />
      <Footer data={footerCopyPL}/>
    </>
  )}
    </GlobalContainer>
  );
};


export default StartPage;