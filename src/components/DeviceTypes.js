import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import DeviceSeries from "./deviceSeries";
import deviceData from "./deviceData.js";

// --- Styled Components (Updated for new look) ---
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

const SeriesDropdown = styled.select`
  display: block;
  width: 100%;
  max-width: 450px; /* Slightly wider */
  margin: 0 auto 3rem auto;
  padding: 12px 18px; /* More padding */
  font-size: 1.15em;
  border-radius: 8px;
  border: 2px solid #3a3a3a;
  background-color: #2a2a2a; /* Darker background */
  color: #e0e0e0;
  cursor: pointer;
  appearance: none; /* Hide default arrow */
  /* Custom SVG arrow matching the accent color */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 18px;

  &:focus {
    outline: none;
    border-color: #ffeb3b; /* Vibrant focus color */
    box-shadow: 0 0 8px rgba(255, 235, 59, 0.5);
  }
`;

const AnimatedContent = styled(motion.div)`
  // Styles for the container if needed, otherwise it's just for animation
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100;
  transition: background-color 0.2s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      #2575fc 0%,
      #6a11cb 100%
    );
  }
`;

// --- End of Styled Components ---

// Animation variants (Keep as is)
const tableVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeIn" } },
};

// Animation variants for the scroll button (Keep as is)
const scrollButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function DeviceTypes() {
  const [selectedSeriesName, setSelectedSeriesName] = useState(
    deviceData[0]?.series || ""
  );

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButton && window.scrollY > 300) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.scrollY <= 300) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScrollButton]);

  const selectedSeriesData = deviceData.find(
    (series) => series.series === selectedSeriesName
  );

  const handleSeriesChange = (event) => {
    setSelectedSeriesName(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <DeviceTypesContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DeviceHeader>Exit Devices by Series</DeviceHeader>
      <ToolTip>
        Select a series below. Click on a function number to learn more!
      </ToolTip>

      {/* Dropdown Menu */}
      <SeriesDropdown value={selectedSeriesName} onChange={handleSeriesChange}>
        {deviceData.map((series, index) => (
          <option key={index} value={series.series}>
            {series.series}
          </option>
        ))}
      </SeriesDropdown>

      {/* Animated Table Section */}
      <AnimatePresence mode="wait">
        {selectedSeriesData && (
          <AnimatedContent
            key={selectedSeriesName}
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DeviceSeries
              series={selectedSeriesData}
              seriesName={selectedSeriesName}
            />{" "}
          </AnimatedContent>
        )}
      </AnimatePresence>

      {/* Conditionally Render the Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <ScrollToTopButton
            onClick={scrollToTop}
            variants={scrollButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            ↑
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </DeviceTypesContainer>
  );
}
export default DeviceTypes;