import React from 'react';
import { Link } from 'react-router-dom';
import '../MainPage.css'; // Correct import path

function MainPage() {
  return (
    <div className="main-page">
      <h1>Sargent Information</h1>
      <nav>
        <Link to="/device-types">Device Types</Link>
        <Link to="/functions">Functions</Link>
        <Link to="/prefixes">Prefixes</Link>
        <Link to="/special-orders">Special Orders</Link>
      </nav>
    </div>
  );
}

export default MainPage;