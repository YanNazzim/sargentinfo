import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MainPage from './components/MainPage';
import DeviceTypes from './components/DeviceTypes';
import PrefixesTable from './components/PrefixesTable';
import MortiseLocks from './components/MortiseLocks';
import BoredLocks from './components/BoredLocks';
import KeySystems from './components/KeySystems'; // NEW IMPORT

// Global Styles (reset and dark mode)
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
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

// --- New Navbar Styles ---

const Header = styled.header`
  background-color: #1e1e1e; /* Darker than body, but not black */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; /* Standard professional height */
`;

const AppTitle = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  
  span {
      color: #FFEB3B; /* Vibrant accent color */
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  height: 100%;

  @media (max-width: 950px) {
      /* Allow navigation links to wrap if needed */
      flex-wrap: wrap;
      justify-content: flex-end;
      height: auto; /* Allow height to adjust if wrapping */
      padding: 5px 0;
  }
`;

const NavLink = styled.button`
  /* Reset button styles for link appearance */
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0 15px; /* Padding for horizontal spacing */
  height: 100%;
  min-height: 40px; /* Ensure a minimum height for wrapping links */
  display: flex;
  align-items: center;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #FFEB3B;
  }

  ${(props) =>
    props.active &&
    `
      color: #FFEB3B; /* Vibrant active text color */
      font-weight: 600;
      /* Underline style for active link */
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); /* Vibrant gradient underline */
      }
  `}

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0 10px;
  }
`;

const ContentContainer = styled.main`
  /* Simple container for page content */
`;

function App() {
  const [activeSection, setActiveSection] = useState('main');

  const navLinks = [
    { name: 'Exit Devices', key: 'exit-devices' },
    { name: 'Mortise Locks', key: 'mortise-locks' },
    { name: 'Bored Locks', key: 'bored-locks' },
    { name: 'Key Systems', key: 'key-systems' }, // NEW LINK
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
        return <KeySystems />; // NEW ROUTE
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