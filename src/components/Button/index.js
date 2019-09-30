import styled from 'styled-components';

export default styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  background-color: ${({ mark }) => (mark ? '#2c3268' : '#f44336bd')};
  color: white;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  :hover {
    background-color: #d26966;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
