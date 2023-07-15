import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';


interface Step {
    title: string;
    options: {
      id: number;
      image: string;
      title: string;
      text: string;
    }[];
  }


interface DreamConfiguratorProps {
  steps: Step[];
  onRenderDisclosure: () => void;
  language: string;
}


interface Selections {
  [key: string]: number | null;
}


const MainContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1280px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;


const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0.8rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
    & > *:nth-of-type(1) {
      order: 4;
    }
  
    & > *:nth-of-type(2) {
      order: 1;
    }
  
    & > *:nth-of-type(3) {
      order: 2;
    }
  
    & > *:nth-of-type(4) {
      order: 3;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;

    & > *:nth-of-type(1),
    & > *:nth-of-type(2),
    & > *:nth-of-type(3),
    & > *:nth-of-type(4) {
      order: initial;
    }
  }
`;


const CardWrapper2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12rem;
  padding: 0.8rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0rem;
    margin: auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;


const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;


const PreviousButton = styled(Button)`
  background-color: transparent;
  border: none;
  align-self: center;
  background-image: url('assets/UI/active-pixel-left-arrow.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-left: 1rem;
  margin-right: 1rem;

  @media (max-width: 1024px) {
    margin-bottom: 1rem;
  }
`;


const PreviousButtonPlaceholder = styled.div`
  width: 14rem;
  margin-left: 1rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;


const NextButtonPlaceholder = styled.div`
  width: 7rem;
  margin-left: 1rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;


const NextButton = styled(Button)<{ isActive: boolean; activeImageUrl: string; inactiveImageUrl: string }>`
  background-image: url(${(props) => (props.isActive ? props.activeImageUrl : props.inactiveImageUrl)});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  border: none;
  color: #fff;
  margin-right: 1rem;
  margin-left: 1rem;
  pointer-events: ${(props) => (props.isActive ? 'auto' : 'none')};
  cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};
  align-self: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;


const DreamConfigurator: React.FC<DreamConfiguratorProps> = ({ steps, onRenderDisclosure, language }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({});
  const [, setIsActive] = useState(false);


  const stepCount = steps.length;
  const categoryKeys = steps.map((step) => step.title);
  const selectedOption = selections[categoryKeys[step - 1]];
  

  useEffect(() => {
    const selectedOption = selections[categoryKeys[step - 1]];
    setIsActive(selectedOption !== null && selectedOption !== undefined);
  }, [selections, step]);


  const handleNextStep = () => {
    const currentCategoryKey = categoryKeys[step - 1];
    const selectedOption = selections[currentCategoryKey];
    if (selectedOption !== null) {
        setStep((prevStep) => prevStep + 1);

    const isMobile = window.innerWidth < 1280;
    
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
      }
    };


  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };


  const handleSelection = (category: keyof Selections, id: number) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [category]: prevSelections[category] === id ? null : id,
    }));
  };


  const renderStep = (stepData: Step | undefined, selectedOption: number | null) => {
    if (!stepData) {
      return null;
    }

    const { options } = stepData;

    return (
      <CardWrapper>
        {options.map((option) => (
          <Card
            key={option.id}
            image={option.image}
            title={option.title}
            text={option.text}
            isSelected={selectedOption === option.id}
            onSelect={() => handleSelection(categoryKeys[step - 1], option.id)}
            language={language}
          />
        ))}
      </CardWrapper>
    );
  };

  const renderConfiguration = () => {
    const selectedOptionTitles = categoryKeys.map((category, index) => {
      const selectedOptionId = selections[category];
      const selectedStep = steps[index];
      const selectedOption = selectedStep?.options.find((option) => option.id === selectedOptionId);
      return selectedOption?.title || '';
    });
  
    const allOptionsSelected = selectedOptionTitles.every((optionTitle) => optionTitle !== '');
  
    if (allOptionsSelected) {
      
        const dynamicText = selectedOptionTitles
        .map((title, index) => `<p>${categoryKeys[index]}: <b>${title}</b></p>`)
        .join('');
        
        return (
          
          <MainContentWrapper>
            {step > 1 && <PreviousButton onClick={handlePreviousStep}></PreviousButton>}
            <CardWrapper2>
            <div></div>
      
            <Card
                image="/assets/final_configuration.png"
                title= {language === "english"
                ? "Final Configuration"
                : "Wybór konfiguracji"}
                text={dynamicText}
                onSimpleButtonClick={onRenderDisclosure}
                simpleButtonLabel= {language === "english"
                ? "Accept"
                : "Akceptuj"}
                language={language}
              />
            </CardWrapper2>
            <NextButtonPlaceholder/>
            </MainContentWrapper>
        );
      
    }
    return null;
  };
  
  
  return (
    <>
      {step <= stepCount ? (
        <>
          <MainContentWrapper>
            {step > 1 ? (
              <PreviousButton onClick={handlePreviousStep}></PreviousButton>
            ) : (
              <PreviousButtonPlaceholder />
            )}

            {renderStep(steps[step - 1], selectedOption)}
            
            <NextButton
              isActive={selectedOption !== null && selectedOption !== undefined}
              onClick={handleNextStep}
              activeImageUrl="/assets/UI/active-pixel-right-arrow.png"
              inactiveImageUrl="/assets/UI/inactive-pixel-right-arrow.png"
            ></NextButton>
          </MainContentWrapper>
        </>
      ) : (
        renderConfiguration()
      )}
    </>
  );
};


export default DreamConfigurator;