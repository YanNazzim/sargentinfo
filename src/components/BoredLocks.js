// src/components/BoredLocks.js
import React from 'react';
import styled from 'styled-components';
import LockTable from './LockTable';
import { boredLockSeries, boredLockFunctions } from './boredLockData';

const Container = styled.div`
  padding: 20px;
  background-color: #121212; 
  color: #e0e0e0;
  min-height: calc(100vh - 60px); 
`;

function BoredLocks() {
  return (
    <Container>
      <LockTable 
        title="Sargent Bored Locks" 
        seriesData={boredLockSeries} 
        functionsData={boredLockFunctions} 
      />
    </Container>
  );
}

export default BoredLocks;