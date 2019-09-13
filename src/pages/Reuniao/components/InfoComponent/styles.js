import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 600px;
  width: 94%;
  padding: 3%;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff1f;
  border-radius: 5px;
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
