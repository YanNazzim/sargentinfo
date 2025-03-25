import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
`;



function SpecialOrders() {
  return (
    <Container>
      <h1>Special Orders</h1>
      <p>Information about special orders and requests:</p>
      <p>To place a special order, please contact our support team.</p>
      <p>Examples of special orders include:</p>
      <ul>
        <li>Custom device configurations</li>
        <li>Advanced function requests</li>
        <li>Specific data reports</li>
      </ul>
    </Container>
  );
}

export default SpecialOrders;