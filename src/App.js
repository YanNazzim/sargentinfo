// src/App.js
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MainPage from './components/MainPage';
import DeviceTypes from './components/DeviceTypes';
import PrefixesTable from './components/PrefixesTable';
import MortiseLocks from './components/MortiseLocks';
import BoredLocks from './components/BoredLocks';
import KeySystems from './components/KeySystems';
import GlobalSearch from './components/GlobalSearch'; // IMPORT SEARCH

// Global Styles (reset and dark mode)
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    /* Prevent horizontal scroll on body caused by animations */
    overflow-x: hidden; 
  }

  a {
    color: #81d4fa;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #bdbdbd;
  }

  p, li, table {
    color: #e0e0e0;
  }
`;

// --- Navbar Styles ---

const Header = styled.header`
  background-color: #1e1e1e;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Slightly reduced gap for mobile */
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px 15px;
    gap: 10px;
  }
`;

const AppTitle = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: nowrap;
  
  span {
      color: #FFEB3B;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem; /* Slightly smaller on very small screens */
  }
`;

const SearchContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  min-width: 200px; /* Allow it to shrink a bit more on mobile */
  
  @media (max-width: 768px) {
    order: 2; /* Ensure search stays accessible */
    width: 100%; /* Take full width on mobile row */
    min-width: unset;
    margin-bottom: 5px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 950px) {
      justify-content: flex-start;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 5px; /* Space for scrollbar */
      border-top: 1px solid #333;
      
      /* Horizontal Scroll for Mobile Nav */
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch; /* Smooth scroll on iOS */
      
      /* Hide scrollbar for a cleaner look */
      &::-webkit-scrollbar {
        display: none; 
      }
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      
      order: 3; /* Push nav to the bottom of the header on wrap */
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  position: relative;
  transition: color 0.2s ease;
  white-space: nowrap; /* Prevent text wrapping in nav buttons */

  &:hover {
    color: #FFEB3B;
  }

  ${(props) =>
    props.active &&
    `
      color: #FFEB3B;
      font-weight: 600;
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
        border-radius: 2px;
      }
  `}
`;

const ContentContainer = styled.main`
  /* Simple container for page content */
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll from content */
`;

function App() {
  const [activeSection, setActiveSection] = useState('main');

  const navLinks = [
    { name: 'Exit Devices', key: 'exit-devices' },
    { name: 'Mortise Locks', key: 'mortise-locks' },
    { name: 'Bored Locks', key: 'bored-locks' },
    { name: 'Key Systems', key: 'key-systems' },
    { name: 'Prefixes', key: 'prefixes' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'main':
        return <MainPage onNavigate={setActiveSection} />;
      case 'exit-devices':
        return <DeviceTypes />;
      case 'mortise-locks':
        return <MortiseLocks />;
      case 'bored-locks':
        return <BoredLocks />;
      case 'key-systems':
        return <KeySystems />;
      case 'prefixes':
        return <PrefixesTable />;
      default:
        return <MainPage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Header>
          <AppTitle onClick={() => setActiveSection('main')}>
              SARGENT <span>INFO</span>
          </AppTitle>
          
          {/* Pass onNavigate prop here */}
          <SearchContainer>
            <GlobalSearch onNavigate={setActiveSection} />
          </SearchContainer>

          <Nav>
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                onClick={() => setActiveSection(link.key)}
                active={activeSection === link.key}
              >
                {link.name}
              </NavLink>
            ))}
          </Nav>
      </Header>

      <ContentContainer>
        {renderSection()}
      </ContentContainer>
    </div>
  );
}

export default App;