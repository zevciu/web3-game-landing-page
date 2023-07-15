import React from 'react';
import styled from 'styled-components';


const TextImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5rem;
    

    @media only screen and (max-width: 768px) {
    margin: 1rem;
  }
`;


const ImageContainer = styled.div`
  flex: 1;
  margin: 5rem;

  @media only screen and (max-width: 1460px) {
    margin: 3rem; 
  }

  @media only screen and (max-width: 768px) {
    margin: 1rem;
    margin-top: 2rem;
  }
`;


const Image = styled.img`
  width: 100%;
  height: auto;
`;


const ContentContainer = styled.div`
  flex: 1;
  padding: 0 20px;
  margin: 5rem;
  margin-right: 3rem;

  @media only screen and (max-width: 1280px) {
    margin-left: 4rem;
  }

  @media only screen and (max-width: 1024px) {
    margin: 0.2rem;
    padding: 0rem;
  }
`;


const Title = styled.h3`
  font-family: 'PixelFont1';
  font-size: 1.3rem;
  margin-bottom: 1rem;
  padding: 1rem;

  @media only screen and (max-width: 1024px) {
    text-align: center;
  }
`;


const Text = styled.p`
  font-family: 'PixelText2';
  font-size: 0.9rem;
  margin-bottom: 0.125rem;
  text-align: justify;
  padding: 1rem;
  line-height: 2;

  @media only screen and (max-width: 1024px) {
    margin-right: 0;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 1rem;
  justify-content: left;

  @media only screen and (max-width: 1024px) {
    justify-content: center;
  }
`;


const Button = styled.button`
  font-family: 'PixelFont';
  font-size: 1.5rem;
  letter-spacing: 0.125rem;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  border: 0.1875rem solid;
  padding: 0.25rem 0.35rem;
  box-shadow: 0.0625rem 0.0625rem 0 0, 0.125rem 0.125rem 0 0, 0.1875rem 0.1875rem 0 0, 0.25rem 0.25rem 0 0, 0.3125rem 0.3125rem 0 0;
  margin-top: 0.3125rem;
  bottom: 0.625rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent;

  &:hover {
    background-color: #f2f2f2;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;


interface TextImageProps {
  data: {
    imageSrc: string;
    title: string;
    text: string;
    button1?: string;
    button2?: string;
  };
  onClickButton?: () => void;
  imagePosition?: 'left' | 'right';
}


const TextImage: React.FC<TextImageProps> = ({
  data,
  onClickButton,
  imagePosition = 'right'
}) => {
  const { imageSrc, title, text, button1, button2 } = data;
  const isImageOnRight = imagePosition === 'right';

  return (
    <TextImageContainer>
      {!isImageOnRight && (
        <ImageContainer>
          <Image src={imageSrc} alt={title} />
        </ImageContainer>
      )}
      <ContentContainer>
        <Title>{title}</Title>
        <Text dangerouslySetInnerHTML={{ __html: text}} />
        <ButtonContainer>
          {button1 && <Button onClick={onClickButton}>{button1}</Button>}
          {button2 && <Button onClick={onClickButton}>{button2}</Button>}
        </ButtonContainer>
      </ContentContainer>
      {isImageOnRight && (
        <ImageContainer>
          <Image src={imageSrc} alt={title} />
        </ImageContainer>
      )}
    </TextImageContainer>
  );
};


export default TextImage;