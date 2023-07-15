import React from 'react';
import styled from 'styled-components';


const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1.5rem;
  width: 60%;
  margin-bottom: 1rem;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    grid-gap: 2rem;
    width: 80%;
  }
`;


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1280px) {
    margin-top: 2rem;
  }

  @media only screen and (max-width: 1024px) {
    margin: auto;
    margin-top: 2.5rem;
  }
`;


const Headline = styled.h1`
  font-family: 'PixelFont4';
  font-size: 3rem;
  font-weight: bold;
  margin: 0;

  @media only screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;


const Subheadline = styled.h2`
  font-family: 'PixelFont8';
  font-size: 1.3rem;
  font-weight: normal;
  margin: 0;

  @media only screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;


const DescriptionCTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 0.3rem;

  @media only screen and (max-width: 1280px) {
    margin: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    margin: 1rem;
    align-items: center;
  }
`;


const Description = styled.p`
  font-family: 'PixelFont8';
  font-size: 1rem;
  margin-bottom: 2rem;
  margin-left: 7rem;
  text-align: justify;

  @media only screen and (max-width: 1024px) {
    margin: 1rem;
    font-size: 0.9rem;
  }
`;


const CTAButton = styled.button`
  font-family: 'PixelFont';
  font-size: 1.5rem;
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
    font-size: 1.2rem;
    margin-top: 1rem;
  }
`;


const GraphicAsset = styled.img`
  width: 60%;
  
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;


interface HeroProps {
  data: {
    headline: string;
    subheadline: string;
    description: string;
    button1?: string;
    button2?: string;
    imageSrc: string;
  };
  onClickButton?: () => void;
}


const Hero: React.FC<HeroProps> = ({ data, onClickButton }) => {
  const {headline, subheadline, description, button1, imageSrc} = data;
  return (
    <>
    <HeroContainer>

      <TextContainer>
        <Headline>{headline}</Headline>
        <Subheadline>{subheadline}</Subheadline>
      </TextContainer>

      <DescriptionCTAWrapper>
        <Description dangerouslySetInnerHTML={{ __html: description}} />
        <CTAButton onClick = {onClickButton}>{button1}</CTAButton>
      </DescriptionCTAWrapper>

      

    </HeroContainer>
    <GraphicAsset src={imageSrc} alt="Hero image" />
    </>
  );
};


export default Hero;