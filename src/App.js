import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import DeviceTypes from './components/DeviceTypes';
import Functions from './components/Functions';
import Prefixes from './components/Prefixes';
import SpecialOrders from './components/SpecialOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/device-types" element={<DeviceTypes />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/prefixes" element={<Prefixes />} />
        <Route path="/special-orders" element={<SpecialOrders />} />
      </Routes>
    </Router>
  );
}

export default App;