import styled from 'styled-components';
import {
  CheckCircleRounded,
  EditRounded,
  DeleteRounded,
} from '@material-ui/icons';

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
  max-width: 700px;
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
  max-width: 700px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff1a;
  align-items: center;
  padding: 25px;
  border-radius: 5px;
`;

export const TableIconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
