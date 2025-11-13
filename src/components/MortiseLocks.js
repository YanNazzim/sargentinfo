// src/components/MortiseLocks.js
import React from 'react';
import styled from 'styled-components';
import LockTable from './LockTable';
import { mortiseLockSeries, mortiseLockFunctions } from './mortiseLockData';

const Container = styled.div`
  padding: 20px;
  background-color: #121212; 
  color: #e0e0e0;
  min-height: calc(100vh - 60px); 
`;

function MortiseLocks() {
  return (
    <Container>
      <LockTable 
        title="Sargent Mortise Locks" 
        seriesData={mortiseLockSeries} 
        functionsData={mortiseLockFunctions} 
      />
    </Container>
  );
}

export default MortiseLocks;