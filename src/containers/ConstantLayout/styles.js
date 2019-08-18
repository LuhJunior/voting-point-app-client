import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  overflow: auto;
`;

export const NavContainer = styled.div`
  width: 20%;
  display: flex;

  @media(max-width: 850px) {
    visibility: hidden;
    width: 0;
  }
`;

export const ContentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  @media(max-width: 850px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`;
