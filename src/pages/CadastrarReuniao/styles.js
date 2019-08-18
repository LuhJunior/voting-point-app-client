import styled from 'styled-components';
import Input from '../../components/Input';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: center;
  align-items: flex-start;
  background-color: #343467;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 25px;
  background-color: #ffffff1a;
  border-radius: 5px;
`;

export const IconContainer = styled.div`
  border-radius: 50%;
  padding: 15px;
  background-color: white;
  svg {
    width: 120px;
    height: 120px;
    color: #343467;
  }
`;

export const Title = styled.h1`
  font-family: 'Helvetica';
  font-size: 24px;
  font-weight: 500;
  color: white;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  padding: 1%;
`;

export const InputLabel = styled.label`
  font-family: 'Helvetica';
  font-size: 16px;
  margin-bottom: 10px;
  color: white;
`;

export const StyledInput = styled(Input)`
  height: 30px;
`;

export const PlusInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  svg {
    height: 55px;
    width: 10%;
    color: white;
    cursor: pointer;
  }
`;

export const PlusInput = styled(Input)`
  height: 30px;
  width: 90%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 98%;
  padding: 1%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 48%;
`;

export const PontosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 80px;
  overflow: auto;
  padding: 1%;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 3px;
  ::-webkit-scrollbar {
    border-radius: 3px;
    padding: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1; 
    border-radius: 2px;
    padding: 3px;
  }
`;

export const PontosLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2px;
  border-radius: 3px;
  :hover {
    background-color: #e1e1e1;
  }
  svg {
    color: #343467;
    cursor: pointer;
  }
`;

export const PontosText = styled.p`
  color: #454545;
  font-size: 15px;
  font-family: 'Helvetica';
  margin: 2px;
`;


