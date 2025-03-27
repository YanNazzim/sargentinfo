import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import DeviceSeries from "./deviceSeries";
import deviceData from "./deviceData.js";

// --- Styled Components (Keep existing styled components as they are) ---
const DeviceTypesContainer = styled(motion.div)`
  padding: 1.875rem;
  margin-bottom: 2.5rem;
  position: relative; // Needed if the button is positioned relative to this container

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

const ToolTip = styled.h3`
  font-size: 1.25em;
  text-align: center;
  margin-bottom: 1.5rem; // Add some space below the tooltip
`;

const SeriesDropdown = styled.select`
  display: block;
  width: 100%;
  max-width: 400px; // Adjust max-width as needed
  margin: 0 auto 2rem auto; // Center the dropdown
  padding: 10px 15px;
  font-size: 1.1em;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #3a3a3a;
  color: #e0e0e0;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2575fc;
    box-shadow: 0 0 5px rgba(37, 117, 252, 0.5);
  }
`;

const AnimatedContent = styled(motion.div)`
  // Styles for the container if needed, otherwise it's just for animation
`;

// --- Add New Styled Component for the Button ---
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 50%; // Make it circular
  width: 50px; // Fixed width
  height: 50px; // Fixed height
  font-size: 24px; // Adjust arrow size
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100; // Ensure it's above other content
  transition: background-color 0.2s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      #2575fc 0%,
      #6a11cb 100%
    ); // Invert gradient on hover
  }
`;

// --- End of Styled Components ---

// Animation variants for fade/slide effect (Keep as is)
const tableVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeIn" } },
};

// Animation variants for the scroll button
const scrollButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function DeviceTypes() {
  // State for series selection (Keep as is)
  const [selectedSeriesName, setSelectedSeriesName] = useState(
    deviceData[0]?.series || ""
  );

  // --- Add State for Scroll Button Visibility ---
  const [showScrollButton, setShowScrollButton] = useState(false);

  // --- Add Effect for Scroll Listener ---
  useEffect(() => {
    const checkScrollTop = () => {
      // Show button if scrolled down more than 300px (adjust as needed)
      if (!showScrollButton && window.scrollY > 300) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.scrollY <= 300) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    // Cleanup function to remove listener when component unmounts
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScrollButton]); // Re-run effect if showScrollButton changes

  // Find the data for the selected series (Keep as is)
  const selectedSeriesData = deviceData.find(
    (series) => series.series === selectedSeriesName
  );

  // Handle dropdown change (Keep as is)
  const handleSeriesChange = (event) => {
    setSelectedSeriesName(event.target.value);
  };

  // --- Add Click Handler for Scroll Button ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
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

      {/* Dropdown Menu (Keep as is) */}
      <SeriesDropdown value={selectedSeriesName} onChange={handleSeriesChange}>
        {deviceData.map((series, index) => (
          <option key={index} value={series.series}>
            {series.series}
          </option>
        ))}
      </SeriesDropdown>

      {/* Animated Table Section (Keep as is) */}
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

      {/* --- Conditionally Render the Scroll-to-Top Button --- */}
      <AnimatePresence>
        {showScrollButton && (
          <ScrollToTopButton
            onClick={scrollToTop}
            variants={scrollButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            ↑ {/* You can use an icon here instead */}
          </ScrollToTopButton>
        )}
      </AnimatePresence>
    </DeviceTypesContainer>
  );
}
export default DeviceTypes;
