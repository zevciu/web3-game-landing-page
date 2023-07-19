import styled from 'styled-components';


const DisclosureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.625rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.8);
  margin: auto;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  width: 60%;

  @media only screen and (max-width: 1024px) {
    width: 80%;
    padding: 0.8rem;
    margin-top: 6rem;
    margin-bottom: 13.8rem;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 0.8rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border: none;
    box-shadow: none;
  }
`;
  

const DisclosureContent = styled.div`
  flex: 1;
  padding: 0.3125rem;
  margin-top: 0.625rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  align-items: center;
`;


const DisclosureTitle = styled.h3`
  font-family: 'PixelFont1';
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  letter-spacing: 0.125rem;

  @media only screen and (max-width: 1024px) {
    font-size: 1.3rem;
  }
`;


const DisclosureText = styled.p`
  font-family: 'PixelText7'; 
  font-size: 0.8rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  letter-spacing: 0.125rem;
  text-align: justify;

  @media only screen and (max-width: 1024px) {
    font-size: 0.7rem;
    margin-bottom: 1rem;
    padding: 0.8rem;
  }
`;


const DisclosureIcon = styled.img`
  width: 5rem;
  height: 5rem;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }

  @media only screen and (max-width: 1024px) {
    width: 4rem;
    height: 4rem;
  }
`;


const DisclosureIconContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
`;


const DisclosureLink = styled.a`
`;


interface DisclosurePageProps {
  data: {
    title: string;
    text: string;
  };
}


const DisclosurePage: React.FC<DisclosurePageProps> = ( {data} ) => {

  return (
    <DisclosureContainer>
      <DisclosureContent>

      <DisclosureTitle>🧙‍♂️ {data.title} </DisclosureTitle>
      <DisclosureText dangerouslySetInnerHTML={{ __html: data.text}}/>

      <DisclosureIconContainer>
      {/* <DisclosureLink href="https://apd.usos.agh.edu.pl/diplomas/attachments/file/download/19311/" target="_blank">
              <DisclosureIcon src="/assets/UI/master-thesis-1.png" alt="Master's Thesis" /> 
      </DisclosureLink> */}
     
      <DisclosureLink href="https://github.com/zevciu/web3-game-landing-page" target="_blank">
              <DisclosureIcon src="/assets/UI/github-large.png" alt="GitHub" />
       </DisclosureLink>
      </DisclosureIconContainer>

      </DisclosureContent>
      </DisclosureContainer>
  );
};


export default DisclosurePage;