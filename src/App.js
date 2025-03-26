import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MainPage from './components/MainPage';
import DeviceTypes from './components/DeviceTypes';
import Prefixes from './components/Prefixes';
import SpecialOrders from './components/SpecialOrders';

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

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #1e1e1e;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
`;

const NavButton = styled.button`
  padding: 12px 25px;
  color: #fff;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border: none;
  border-radius: 8px;
  font-size: 1rem; /* Using rem */
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 0.5em; /* Using em */

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  /* Remove left/right margins on very small screens */
  &:first-child,
  &:last-child {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  @media (max-width: 480px) {
    /* Styles for mobile */
    padding: 0.75em 1.25em;
    font-size: 0.875rem;
  }
`;

function App() {
  const [activeSection, setActiveSection] = useState('main');

  const renderSection = () => {
    switch (activeSection) {
      case 'main':
        return <MainPage onNavigate={setActiveSection} />;
      case 'device-types':
        return <DeviceTypes />;
      case 'prefixes':
        return <Prefixes />;
      case 'special-orders':
        return <SpecialOrders />;
      default:
        return <MainPage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div>
      <GlobalStyle />
      {activeSection !== 'main' && (
        <Nav>
          <NavButton
            onClick={() => setActiveSection('device-types')}
            style={{
              background:
                activeSection === 'device-types'
                  ? 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)'
                  : 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            }}
          >
            Devices
          </NavButton>
          <NavButton
            onClick={() => setActiveSection('prefixes')}
            style={{
              background:
                activeSection === 'prefixes'
                  ? 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)'
                  : 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            }}
          >
            Prefixes
          </NavButton>
          <NavButton
            onClick={() => setActiveSection('special-orders')}
            style={{
              background:
                activeSection === 'special-orders'
                  ? 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)'
                  : 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            }}
          >
            Special Orders
          </NavButton>
        </Nav>
      )}

      {renderSection()}
    </div>
  );
}

export default App;