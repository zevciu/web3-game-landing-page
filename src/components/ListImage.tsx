import React, { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12rem;
  width: 83%;

  @media only screen and (max-width: 1280px) {
    margin-bottom: 40px;
    width: 85%;
    grid-gap: 4rem;
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;

    @media only screen and (max-width: 768px) {
      width: 80%;
      margin: 2rem;
      grid-gap: 0rem;
    }
  }
`;


const LeftFrame = styled.div`
  overflow: hidden;

  @media only screen and (max-width: 1024px) {
    margin-bottom: 40px;
  }
`;


const LeftFrameInner = styled.div``;


const Heading = styled.h2`
  font-family: 'PixelFont1';
  font-size: 1.3rem;
  color: #101010;
  margin-bottom: 35px;
  text-transform: uppercase;

  @media only screen and (max-width: 1024px) {
    text-align: center;
    line-height: 2;
  }
`;


const RowListName = styled.div`
  font-size: 14px;
  font-family: 'PixelText2';
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 18px 0;
  border-bottom: 1px solid #e2e8ef;
  cursor: pointer;
  position: relative;

  &:after {
    position: absolute;
    content: '';
    display: block;
    width: 10px;
    height: 5px;
    background: url('/assets/uparrow.png') center center no-repeat;
    background-size: 100%;
    right: 0px;
    top: 50%;
    margin-top: -2.5px;
  }

  &.active-name-row:after {
    transform: rotate(180deg);
  }

  &.first {
    border-top: 1px solid #e2e8ef;
  }
`;


const RowListDesc = styled.div`
  line-height: 2;
  text-align: justify;
  font-size: 18px;
  font-family: 'Nobel Book', helvetica, arial, roboto, sans-serif;
  letter-spacing: 1px;
  transition: height 0.35s ease-in-out;
  overflow: hidden;
  border-bottom: 1px solid #e2e8ef;

  &.active-row {
    display: block;
  }

  & div {
    padding: 22px 0;
  }
`;


const RightFrame = styled.div`
  width: 100%;
  height: auto;

  // @media only screen and (max-width: 1024px) {
  //   width: 100%;
  //   height: auto;
  // }

  @media only screen and (max-width: 1024px) {
    width: 70%;
    margin-left: 7rem;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0rem;
  }
`;


const FrameFoto = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  display: none;

  &.active-foto {
    display: block;
  }

  &.active-foto.active-row {
    display: block;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const ArrowIcon = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 1rem;
`;


const Text = styled.p`
  font-family: 'PixelText2';
  font-size: 0.9rem;
  
  @media only screen and (max-width: 1024px) {
    font-size: 0.9rem;
    margin: 0.2rem;
  }
`;


interface ListImageProps {
  data: {
    heading: string;
    items: {
      title: string;
      text: string;
      imageSrc: string;
    }[];
  };
}


const ListImage: React.FC<ListImageProps> = ({ data }) => {
  const [activeRow, setActiveRow] = useState<number | null>(1);

  const handleRowClick = (index: number) => {
    if (activeRow !== index) {
      setActiveRow(index);
    }
  };

  return (
    <Container>
      <LeftFrame>
        <LeftFrameInner>
          <Heading>{data.heading}</Heading>
          {data.items.map((item, index) => (
            <React.Fragment key={index}>
              <RowListName
                className={`row-list-name ${activeRow === index + 1 ? 'active-name-row' : ''} ${
                  index === 0 ? 'first' : ''
                }`}
                onClick={() => handleRowClick(index + 1)}
              >
                <b>{item.title}</b>
                {activeRow === index + 1 ? (
                  <ArrowIcon src="/assets/UI/down-arrow.svg" alt="Up Arrow Icon" />
                ) : (
                  <ArrowIcon src="/assets/UI/right-arrow.svg" alt="Up Arrow Icon" />
                )}
              </RowListName>
              {activeRow === index + 1 && (
                <RowListDesc className={`row-list-desc ${activeRow === index + 1 ? 'active-row' : ''}`}>
                  <Text dangerouslySetInnerHTML={{ __html: item.text }} />
                </RowListDesc>
              )}
            </React.Fragment>
          ))}
        </LeftFrameInner>
      </LeftFrame>
      <RightFrame>
        {data.items.map((item, index) => (
          <FrameFoto
            key={index}
            className={`l-frame-foto ${activeRow === index + 1 ? 'active-foto' : ''}`}
            style={{
              opacity: activeRow === index + 1 ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={item.imageSrc} alt="alt text" />
          </FrameFoto>
        ))}
      </RightFrame>
    </Container>
  );
};


export default ListImage;