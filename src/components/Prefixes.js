import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
`;



const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  background-color: #333;
  color: white;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

function Prefixes() {
  return (
    <Container>
      <h1>Prefixes</h1>
      <p>Here's a list of common prefixes used in our system:</p>
      <Table>
        <thead>
          <tr>
            <Th>Prefix</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>DEV-</Td>
            <Td>Device-related information</Td>
          </tr>
          <tr>
            <Td>FUNC-</Td>
            <Td>Function-related data</Td>
          </tr>
          <tr>
            <Td>USER-</Td>
            <Td>User-specific data</Td>
          </tr>
        </tbody>
      </Table>
      <p>More detailed prefix information will be available here.</p>
    </Container>
  );
}

export default Prefixes;