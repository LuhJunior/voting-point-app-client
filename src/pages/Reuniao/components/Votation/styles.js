import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
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

export const Info = styled.p`
  font-family: 'Helvetica';
  font-size: 30px;
  color: white;
  /* margin-right: 10px; */
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 33%;
`;
