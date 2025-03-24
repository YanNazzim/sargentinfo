import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '←';
    margin-right: 10px;
    font-size: 18px;
  }
`;

function Prefixes() {
  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    style={{ padding: '20px' }}
    >
    <StyledLink to="/">Back to Main Page</StyledLink>
      <h1>Prefixes</h1>
      <p>Here's a list of common prefixes used in our system:</p>
      <table>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DEV-</td>
            <td>Device-related information</td>
          </tr>
          <tr>
            <td>FUNC-</td>
            <td>Function-related data</td>
          </tr>
          <tr>
            <td>USER-</td>
            <td>User-specific data</td>
          </tr>
        </tbody>
      </table>
      <p>More detailed prefix information will be available here.</p>
      </motion.div>
  );
}

export default Prefixes;