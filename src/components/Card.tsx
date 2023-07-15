import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
  width: calc(95% / 1 - 3rem);
  height: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.625rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin-bottom: 1.25rem;

  @media only screen and (max-width: 1280px) {
    width: calc(100% - 2rem);
    height: auto;
    padding: 0.625rem;
    margin: 0.625rem 0;
  }
`;


const CardImage = styled.img`
  width: calc(100% + 2.6rem);
  object-fit: cover;
  border-radius: 0.5rem;
  margin: -1.25rem;

  @media only screen and (max-width: 1280px) {
    width: calc(100% + 1.3rem);
    margin: -0.625rem;
  }
`;


const CardTitle = styled.p`
  text-align: center;
  margin: 0.625rem 0;
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding: 0.625rem 0;
  width: 100%;
  box-sizing: border-box;
  font-family: 'PixelText2';
  font-size: 0.9rem;
`;

const CardText = styled.p`
  text-align: justify;
  font-family: 'PixelText8';
  font-size: 0.84rem;
`;


const CardContent = styled.div`
  flex: 1;
  padding: 0.3125rem;
  margin-top: 0.625rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
`;


const CardButton = styled.button<{ isSelected: boolean }>`
  font-family: 'PixelFont';
  font-size: 1.4rem;
  letter-spacing: 0.125rem;
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) => (props.isSelected ? '#000' : '#000')};
  background-color: ${(props) => (props.isSelected ? '#f4cccc' : 'transparent')};
  cursor: pointer;
  border: 0.1875rem solid;
  padding: 0.15rem 0.25rem;
  box-shadow: 0.0625rem 0.0625rem 0 0, 0.125rem 0.125rem 0 0, 0.1875rem 0.1875rem 0 0, 0.25rem 0.25rem 0 0, 0.3125rem 0.3125rem 0 0;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#f4cccc' : '#f2f2f2')};
  }
`;


const SimpleButton = styled.button`
  font-family: 'PixelFont';
  font-size: 1.4rem;
  letter-spacing: 0.125rem;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  background-color: transparent;
  cursor: pointer;
  border: 0.1875rem solid;
  padding: 0.15rem 0.25rem;
  box-shadow: 0.0625rem 0.0625rem 0 0, 0.125rem 0.125rem 0 0, 0.1875rem 0.1875rem 0 0, 0.25rem 0.25rem 0 0, 0.3125rem 0.3125rem 0 0;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f2f2f2;
  }
`;


interface CardProps {
  image?: string;
  title: string;
  text: string | JSX.Element;
  isSelected?: boolean;
  onSelect?: () => void;
  onSimpleButtonClick?: () => void;
  simpleButtonLabel?: string;
  secondButtonLabel?: string;
  onSecondButtonClick?: () => void;
  language: string;
}


const Card: React.FC<CardProps> = ({
  image,
  title,
  text,
  isSelected = false,
  onSelect,
  onSimpleButtonClick,
  simpleButtonLabel,
  onSecondButtonClick,
  secondButtonLabel,
  language,
}) => {
  const selectText = language === 'english' ? 'Select' : 'Wybierz';
  const selectedText = language === 'english' ? 'Selected' : 'Wybrano';
  if (!image) {
    return (
      <div></div>
    )
  }

  return (
    <CardContainer>
      {image && <CardImage src={image} alt={title} />}
      <CardContent>
        <CardTitle dangerouslySetInnerHTML={{ __html: title }} />
        <CardText dangerouslySetInnerHTML={{ __html: text }} />
      </CardContent>
      {onSelect && (
        <CardButton isSelected={isSelected} onClick={onSelect}>
          {isSelected ? selectedText : selectText}
        </CardButton>
      )}
      {onSimpleButtonClick && (
        <SimpleButton onClick={onSimpleButtonClick}>{simpleButtonLabel}</SimpleButton>
      )}
      {onSecondButtonClick && (
        <SimpleButton onClick={onSecondButtonClick}>{secondButtonLabel}</SimpleButton>
      )}
    </CardContainer>
  );
};


export default Card;
