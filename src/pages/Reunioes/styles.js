import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  background-color: #343467;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff1a;
  padding: 25px;
  border-radius: 5px;
  max-width: 600px;
  margin-bottom: 15px;
`;

export const IconContainer = styled.div`
  border-radius: 50%;
  padding: 15px;
  background-color: white;
  svg {
    width: 100px;
    height: 100px;
    color: #343467;
  }
`;

export const Title = styled.h1`
  font-family: 'Helvetica';
  font-size: 28px;
  font-weight: 500;
  color: white;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  align-items: center;
`;


