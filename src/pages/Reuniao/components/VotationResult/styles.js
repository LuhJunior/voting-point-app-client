import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 94%;
  padding: 3%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff1f;
  border-radius: 5px;
  max-width: 600px;
`;

export const Title = styled.h1`
  font-family: 'Helvetica';
  font-size: 28px;
  font-weight: 500;
  color: white;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  svg {
    color: white;
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
`;

export const InfoTitle = styled.p`
  font-family: 'Helvetica';
  font-size: 27px;
  font-weight: bold;
  color: white;
  margin: 15px;
  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

export const Info = styled.p`
  font-family: 'Helvetica';
  font-size: 26px;
  color: white;
  margin: 15px;
  @media (max-width: 500px) {
    font-size: 21px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 25px;
  @media (max-width: 500px) {
    margin-top: 15px;
  }
`;
