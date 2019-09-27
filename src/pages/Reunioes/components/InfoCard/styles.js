import styled from 'styled-components';
import {
  CheckCircleRounded, EditRounded, DeleteRounded, SpeakerNotesRounded,
} from '@material-ui/icons';

import Card from '../../../../components/Card';

export const Container = styled(Card)`
  margin-bottom: 15px;
  flex-direction: column;
  position: relative;
`;

export const LineContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.span`
  font-family: 'Helvetica';
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const Info = styled.span`
  font-family: 'Helvetica';
  font-size: 17px;
  margin-bottom: 15px;
  color: white;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 4%;
  right: 2%;
  @media (max-width: 500px) {
    right: 0;
    top: 0;
  }
`;

export const AtivarIcon = styled(CheckCircleRounded)`
  color: #fff;
`;

export const EditarIcon = styled(EditRounded)`
  color: #fff;
`;

export const DeletarIcon = styled(DeleteRounded)`
  color: #fff;
`;

export const PontosIcon = styled(SpeakerNotesRounded)`
  color: #fff;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  justify-content: center;
  align-items: center;
`;
