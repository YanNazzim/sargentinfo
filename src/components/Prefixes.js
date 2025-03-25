import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
`;



//const Table = styled.table`
//  width: 100%;
//  border-collapse: collapse;
//  margin-top: 20px;
//`;
//
//const Th = styled.th`
//  padding: 8px;
//  border: 1px solid #ddd;
//  background-color: #333;
//  color: white;
//  text-align: left;
//`;
//
//const Td = styled.td`
//  padding: 8px;
//  border: 1px solid #ddd;
//  text-align: left;
//`;

function Prefixes() {
  return (
    <Container>
      <h1>Prefixes</h1>
      <p>Come Back to see how this page turns out!</p>

    </Container>
  );
}

export default Prefixes;