// src/components/DeviceTypes.js
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import DeviceSeries from "./deviceSeries"; //
import deviceData from "./deviceData.js"; //

// --- Styled Components ---
const DeviceTypesContainer = styled(motion.div)`
  padding: 30px; /* Increased padding */
  background-color: #121212; /* Match body background */
  min-height: calc(100vh - 60px); /* Fill space below header */
  position: relative; 
  color: #e0e0e0;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const DeviceHeader = styled.h1`
  font-size: 2.5em; /* Larger, modern look */
  font-weight: 700;
  text-align: center;                                                                                                                                                                                                        
  color: #fff;
  margin-bottom: 0.5rem;
  padding-top: 15px; /* Spacing from the top of the content area */

  @media (max-width: 768px) {
    font-size: 2em; 
  }
`;

const ToolTip = styled.h3`
  font-size: 1.1em;
  font-weight: 400; /* Lighter weight for secondary text */
  text-align: center;
  margin-bottom: 2rem; 
  color: #bdbdbd; /* Soft grey */
`;


// --- Component ---

function DeviceTypes() {

  return (
    <DeviceTypesContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DeviceHeader>Exit Devices</DeviceHeader>
      <ToolTip>
        Explore the different device series below. Click on a function number to see details, or the device image/link to see the catalog.
      </ToolTip>

      {/* Render all series tables continuously */}
      {deviceData.map((seriesData, index) => (
        <DeviceSeries
          key={seriesData.series}
          series={seriesData}
          seriesName={seriesData.series} // Pass the name
        />
      ))}

    </DeviceTypesContainer>
  );
}
export default DeviceTypes;