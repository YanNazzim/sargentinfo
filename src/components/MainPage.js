import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MainPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Use min-height to ensure it fills the space below the 60px navbar */
  min-height: calc(100vh - 60px); 
  background-color: #1e1e1e;
  color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: center;
`;

function MainPage() {
  return (
    // 3. Add animation props to the container component
    <MainPageContainer
      initial={{ opacity: 0, y: -20 }} // Start invisible and slightly up
      animate={{ opacity: 1, y: 0 }}    // Animate to fully visible and original position
      exit={{ opacity: 0, y: 20 }}      // Animate out (optional, depends on routing setup)
      transition={{ duration: 0.3 }}  // Control animation speed
    >
      <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>SARGENT Product Info Hub</h1>
      <h3 style={{ fontSize: '1.5rem', color: '#bdbdbd' }}>Exit Devices, Mortise Locks, Bored Locks & Key Systems</h3>
      <br/>
      <p style={{ maxWidth: '600px', lineHeight: '1.6' }}>
        Welcome to the centralized resource for Sargent product details. Use the navigation bar above to explore information specific to different lock series and technical prefix options.
      </p>
      
    </MainPageContainer>
  );
}

export default MainPage;