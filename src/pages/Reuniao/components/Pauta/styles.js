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
  justify-content: space-between;
  svg {
    color: white;
    width: 25px;
    height: 25px;
    cursor: pointer;
    padding: 4px;
  }
`;

export const LineContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  /* border-bottom: 1px solid white; */
`;

export const Info = styled.p`
  font-family: 'Helvetica';
  font-size: 20px;
  color: white;
  margin-right: 10px;
`;
