import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 25px;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff1f;
  border-radius: 5px;
  max-width: 600px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

export const Info = styled.p`
  font-family: 'Helvetica';
  font-size: 28px;
  color: white;
`;
