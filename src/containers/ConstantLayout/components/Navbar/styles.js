import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#2c3268, #090b29);
`;

export const Bar = styled.hr`
  width: 90%;
  color: white;
  height: 1px;
  background: white;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Span = styled.span`
  font-family: 'Helvetica';
  font-size: 15px;
  color: white;
  padding: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 30px;

  svg {
    position: absolute;
  }
`;
