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

export const ButtonContainer = styled.div`
  display: flex;
  width: 98%;
  padding: 1%;
  margin-top: 10px;
`;
