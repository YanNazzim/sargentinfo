import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
`;


function Prefixes() {
  return (
    <Container>
      <h1>Prefixes</h1>
      <p>Come Back to see how this page turns out!</p>

    </Container>
  );
}

export default Prefixes;