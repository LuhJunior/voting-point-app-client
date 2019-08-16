import React, { useState } from 'react';
import { GroupRounded } from '@material-ui/icons';

import QuorumCount from './components/QuorumCount';
import Pauta from './components/Pauta';
import Votation from './components/Votation';

import {
  Container,
  InfoContainer,
  IconContainer,
  Title,
} from './styles';

const Reuniao = () => {
  const [etapa, setEtapa] = useState('quorum');

  const next = (screen) => setEtapa(screen);

  const RenderEtapa = () => {
    if (etapa === 'quorum') return <QuorumCount next={() => next('pauta')} />;
    if (etapa === 'pauta') return <Pauta next={() => next('votation')} />;
    if (etapa === 'votation') return <Votation />;
    return null;
  };

  return (
    <Container>
      <InfoContainer>
        <IconContainer>
          <GroupRounded />
        </IconContainer>
        <Title>Reunião</Title>
      </InfoContainer>
      <RenderEtapa />
    </Container>
  );
};

export default Reuniao;
