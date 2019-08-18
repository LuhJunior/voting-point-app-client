import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

import {
  Container,
  NavContainer,
  ContentContainer,
  Content,
} from './styles';

export default ({ routes: Routes }) => (
  <Container>
    <NavContainer>
      <Navbar />  
    </NavContainer>
    <ContentContainer>
      <Header />
      <Content>
        <Routes />
      </Content>
    </ContentContainer>
  </Container>
);
