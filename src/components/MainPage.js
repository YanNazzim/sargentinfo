// src/components/MainPage.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MainPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Use min-height to ensure it fills the space below the navbar */
  min-height: calc(100vh - 140px); /* Adjusted roughly for header height on mobile */
  background-color: #1e1e1e;
  color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    justify-content: flex-start; /* Align top on mobile to avoid keyboard issues if input is added */
    padding-top: 60px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem; /* Much more manageable on mobile */
  }
`;

const HeroSubtitle = styled.h3`
  font-size: 1.5rem;
  color: #bdbdbd;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  max-width: 600px;
  line-height: 1.6;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

function MainPage() {
  return (
    <MainPageContainer
      initial={{ opacity: 0, y: -20 }} // Start invisible and slightly up
      animate={{ opacity: 1, y: 0 }}    // Animate to fully visible and original position
      exit={{ opacity: 0, y: 20 }}      // Animate out
      transition={{ duration: 0.3 }}  // Control animation speed
    >
      <HeroTitle>SARGENT Product Info Hub</HeroTitle>
      <HeroSubtitle>Exit Devices, Mortise Locks, Bored Locks & Key Systems</HeroSubtitle>
      <br/>
      <Description>
        Welcome to the centralized resource for Sargent product details. Use the navigation bar above to explore information specific to different lock series and technical prefix options.
      </Description>
      
    </MainPageContainer>
  );
}

export default MainPage;