import React from 'react';
import styled from 'styled-components';
// 1. Import motion
import { motion } from 'framer-motion';

// 2. Apply motion to the styled container
const MainPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: center;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const NavButton = styled.button`
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
  margin: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

function MainPage({ onNavigate }) {
  return (
    // 3. Add animation props to the container component
    <MainPageContainer
      initial={{ opacity: 0, y: -20 }} // Start invisible and slightly up
      animate={{ opacity: 1, y: 0 }}    // Animate to fully visible and original position
      exit={{ opacity: 0, y: 20 }}      // Animate out (optional, depends on routing setup)
      transition={{ duration: 0.3 }}  // Control animation speed
    >
      <h1>Sargent General Product Information </h1>
      <h3>Only Exit devices (for now)</h3>
      <br/>
      <h4> Click one of the buttons below to learn more! </h4>
      <NavContainer>
        <NavButton onClick={() => onNavigate('device-types')}>
          Device Types
        </NavButton>
        <NavButton onClick={() => onNavigate('functions')}>Functions</NavButton>
        <NavButton onClick={() => onNavigate('prefixes')}>Prefixes</NavButton>
        <NavButton onClick={() => onNavigate('special-orders')}>
          Special Orders
        </NavButton>
      </NavContainer>
    </MainPageContainer>
  );
}

export default MainPage;