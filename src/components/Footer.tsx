import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: #000;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin-bottom: 2rem;
  box-shadow: 0.0625rem 0.0625rem 0 0, 0.125rem 0.125rem 0 0, 0.1875rem 0.1875rem 0 0, 0.25rem 0.25rem 0 0, 0.3125rem 0.3125rem 0 0;
  border: 0.1875rem solid;
  letter-spacing: 0.125rem;

  @media only screen and (max-width: 1024px) {
    width: 80%;
    flex-direction: column;
    margin-top: 1.5rem;
  }
`;


const FooterText = styled.p`
  font-family: 'PixelText5';
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  margin: 0;

  @media only screen and (max-width: 1024px) {
    text-align: center;
    margin-top: 1rem;
  }
`;


const FooterLink = styled.a`
  color: #000;
  text-decoration: none;
`;


const FooterRightIcon = styled.img`
  margin-top: 1rem;
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  border-radius: 1.5rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    background-color: #f2f2f2;
  }

  @media only screen and (max-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;


const FooterRightIconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1024px) {
    justify-content: center;
    margin-right: 0rem;
  }
`;


const FooterLeftIcon = styled.img`
  margin-bottom: 1rem;
  width: 4rem;
  height: 4rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    background-color: transparent
  }

  @media only screen and (max-width: 1024px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 0rem;
  }
`;


const FooterLeftIconsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 0.5rem;
  gap: 3rem;

  @media only screen and (max-width: 1024px) {
    justify-content: center;
    margin-left: 0rem;
    gap: 1rem;
  }
`;


interface FooterProps {
    data: {
        author: string;
        hosting: string;
    };
  }


const Footer: React.FC<FooterProps> = ( {data} ) => {
    return (
      <FooterContainer>

        <div>

          <FooterLeftIconsContainer>
            <FooterLink href="https://ipfs.tech/" target="_blank">
              <FooterLeftIcon src="/assets/UI/IPFS.png" alt="InterPlanetary File System" />
            </FooterLink>
            <FooterLink href="https://fleek.co/" target="_blank">
              <FooterLeftIcon src="/assets/UI/fleek.png" alt="Fleek" />
            </FooterLink>
          </FooterLeftIconsContainer>

          <FooterText dangerouslySetInnerHTML={{ __html: data.hosting}}/>

        </div>

        <div>

          <FooterText dangerouslySetInnerHTML={{ __html: data.author}}/>

          <FooterRightIconsContainer>
            <FooterLink href="https://github.com/zevciu" target="_blank">
              <FooterRightIcon src="/assets/UI/github_2.png" alt="GitHub" />
            </FooterLink>
            <FooterLink href="https://linkedin.com/in/aleksander-przywalny/" target="_blank">
              <FooterRightIcon src="/assets/UI/linkedin_1.svg" alt="LinkedIn" />
            </FooterLink>
          </FooterRightIconsContainer>
          
        </div>

      </FooterContainer>
    );
  };

  
export default Footer;
