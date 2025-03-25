import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import DeviceSeries from "./deviceSeries";
import deviceData from "./deviceData.js";

const DeviceTypesContainer = styled(motion.div)`
  padding: 1.875rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const DeviceHeader = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.5em; /* Adjusted for better mobile readability */
  }

  @media (max-width: 480px) {
    font-size: 1.25em; /* Further adjustment for very small screens */
  }
`;

function DeviceTypes() {
  return (
    <DeviceTypesContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <DeviceHeader>Device Types</DeviceHeader>
      {deviceData.map((series, index) => (
        <DeviceSeries key={index} series={series} />
      ))}
      <p>More details about each type will be added here.</p>
    </DeviceTypesContainer>
  );
}
export default DeviceTypes;