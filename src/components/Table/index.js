import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid white;
  color: white;
  font-family: 'Helvetica';
  border-radius: 2px;
  border-collapse: collapse;
  text-align: left;
  thead {
    tr {
      background-color: #995666;
    }
  }
  thead, tbody {
    th, td {
      border: 3px solid white;
      padding: 15px;
    }
  }
`;

const Table = ({ header, data }) => {

  const Header = useCallback(() => (
    <tr>{ header.map((th, index) => <th key={index}>{th}</th>) }</tr>
  ));
  
  const Body = useCallback(() => (
    data.map((tr, index) => <tr key={index}>{ tr.map((td, index )=> <td key={index}>{td}</td>) }</tr>)
  ));

  return (
    <StyledTable>
      <thead>
        <Header />
      </thead>
      <tbody>
        <Body />
      </tbody>
    </StyledTable>
  );
};

export default Table;
