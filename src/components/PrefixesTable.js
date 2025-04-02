// components/PrefixesTable.js
import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
// Import the updated data structure
import { allPrefixes, prefixSeries } from "./prefixData"; // [cite: uploaded:components/prefixData.js]
import "../App.css"; // Make sure your shared styles are here
import CollapsibleSection from "./CollapsibleSection"; // Import the collapsible section component

// --- Lightbox Styled Components --- [cite: uploaded:components/DeviceTable.js]
const LightboxOverlay = styled.div`
  position: fixed; /* Cover the entire viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Dark semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top */
  cursor: pointer; /* Indicate it's clickable to close */
  backdrop-filter: blur(5px); /* Optional: Add a blur effect */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const LightboxImageContainer = styled.div`
  position: relative;
  max-width: 80vw; /* Limit image width */
  max-height: 80vh; /* Limit image height */
  cursor: default; /* Override overlay cursor */
  transform: scale(0.8);
  opacity: 0;
  animation: scaleUp 0.3s 0.1s forwards; /* Delay start slightly */

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 8px; /* Optional: rounded corners */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  @keyframes scaleUp {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const PrefixImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  display: block;
  // margin: 5px auto; // Keep or adjust as needed
  margin-bottom: 10px; // Add space below image
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

// Add these styled components within PrefixesTable.js

const PrefixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Creates 2 equal columns
  gap: 20px; // Space between grid items
  padding: 10px 0; // Add some padding above/below the grid

  @media (max-width: 768px) {
    // Stack to 1 column on smaller screens
    grid-template-columns: 1fr;
  }
`;

const PrefixCard = styled.div`
  background-color: #333; // Slightly different background for the card
  border: 1px solid #555;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column; // Stack content vertically within the card
  align-items: center; // Center content horizontally
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const PrefixCardHeader = styled.h4`
  color: #81d4fa; // Accent color for the header
  margin-bottom: 10px;
  font-size: 1.1em;
`;

const PrefixCardDescription = styled.div`
  font-size: 0.95em;
  color: #ccc;
  margin-top: 10px;
  // Allow HTML rendering from description
  p,
  ul,
  li {
    // Example: Style nested elements if needed
    margin: 5px 0;
  }
`;

// --- react-select styles ---
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2a2a2a",
    borderColor: state.isFocused ? "#81d4fa" : "#555",
    boxShadow: state.isFocused ? "0 0 0 1px #81d4fa" : "none",
    minHeight: "40px",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#2a2a2a",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#005a87"
      : state.isFocused
      ? "#444"
      : "transparent",
    color: "#e0e0e0",
    padding: "10px 15px",
    "&:active": {
      backgroundColor: "#555",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#e0e0e0",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
  input: (provided) => ({
    ...provided,
    color: "#e0e0e0",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#555",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#aaa",
    "&:hover": {
      color: "#ccc",
    },
  }),
};

// --- Search input style ---
const searchInputStyle = {
  width: "100%",
  padding: "10px 15px",
  fontSize: "1rem",
  backgroundColor: "#2a2a2a",
  color: "#e0e0e0",
  border: "1px solid #555",
  borderRadius: "4px",
  boxSizing: "border-box",
  marginBottom: "25px",
};

// --- Component Definition ---
const PrefixesTable = () => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  // --- Helper function to get series-specific values ---
  const getSeriesSpecificValue = (property, selectedSeriesValue) => {
    if (typeof property === "object" && property !== null) {
      // Check if there's a specific value for the series, otherwise use default
      return property[selectedSeriesValue] ?? property["default"] ?? "";
    }
    // If property is already a string or other primitive, return it
    return property ?? "";
  };

  // --- Filtering and Grouping Logic ---
  const groupedAndFilteredPrefixes = useMemo(() => {
    // Return empty object immediately if no series is selected
    if (!selectedSeries) {
      return {};
    }

    // 1. Filter by selected series
    let seriesFiltered = allPrefixes.filter(
      (prefix) =>
        Array.isArray(prefix.series) &&
        prefix.series.includes(selectedSeries.value)
    ); // [cite: uploaded:components/prefixData.js];

    // 2. Filter by search term if present
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      seriesFiltered = seriesFiltered.filter((prefix) => {
        // Use helper to get potentially series-specific name for searching
        const displayName = getSeriesSpecificValue(
          prefix.name,
          selectedSeries.value
        ); // [cite: uploaded:components/prefixData.js]
        // Check against prefix code and display name
        return (
          prefix.code.toLowerCase().includes(lowerCaseSearchTerm) || // [cite: uploaded:components/prefixData.js]
          displayName.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    }

    // 3. Group the filtered prefixes by category
    const grouped = seriesFiltered.reduce((acc, prefix) => {
      const category = prefix.category || "Other"; // Assign to 'Other' if category is missing // [cite: uploaded:components/prefixData.js]
      // Initialize array for the category if it doesn't exist
      if (!acc[category]) {
        acc[category] = [];
      }
      // Add the prefix to the correct category array
      acc[category].push(prefix);
      return acc; // Return accumulator for the next iteration
    }, {}); // Initial value is an empty object

    // Optional: Order the categories (e.g., 'Mechanical/Electrical' first)
    const orderedGrouped = {};
    const categoryOrder = ["Mechanical/Electrical", "Cylinder"]; // Define desired order
    // Add categories in the defined order
    categoryOrder.forEach((cat) => {
      if (grouped[cat]) {
        // Check if the category exists in the filtered data
        orderedGrouped[cat] = grouped[cat];
        delete grouped[cat]; // Remove from original object to avoid duplication
      }
    });
    // Add any remaining categories (like 'Other') alphabetically
    Object.keys(grouped)
      .sort()
      .forEach((cat) => {
        orderedGrouped[cat] = grouped[cat];
      });

    return orderedGrouped; // Return the ordered, grouped object
  }, [selectedSeries, searchTerm]); // Recompute when series or search term changes

  // --- Lightbox Handlers --- [cite: uploaded:components/DeviceTable.js]
  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl); // Set the image for the lightbox
    setIsLightboxOpen(true); // Open the lightbox
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false); // Close the lightbox
    setLightboxImage(""); // Clear the image
    document.body.style.overflow = "auto"; // Restore background scrolling
  };

  // Effect to handle closing lightbox with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isLightboxOpen) {
        closeLightbox(); // Close lightbox if Escape is pressed
      }
    };

    // Add event listener when component mounts or isLightboxOpen changes
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function: remove listener and restore scrolling if needed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Ensure scrolling is restored if component unmounts while lightbox is open
      if (isLightboxOpen) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isLightboxOpen]); // Dependency array ensures effect runs when isLightboxOpen changes

  // Prevent closing lightbox when clicking the image itself
  const handleImageClickInLightbox = (event) => {
    event.stopPropagation(); // Stop the click from propagating to the overlay
  };
  // --- End Lightbox Handlers ---

  // --- Component Render ---
  return (
    // Use Fragment to wrap component and lightbox without adding extra DOM node
    <>
      {/* Main content container */}
      <div className="content-transition" style={{ padding: "20px" }}>
        <h1 className="Heading">Device Prefixes</h1>

        {/* Series Dropdown Selector */}
        <div className="form-group" style={{ marginBottom: "25px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", color: "#bdbdbd" }}
          >
            Select Series:
          </label>
          <Select
            options={prefixSeries} // Options derived from prefixData.js // [cite: uploaded:components/prefixData.js]
            value={selectedSeries} // Controlled component value
            // Update selected series and clear search term on change
            onChange={(option) => {
              setSelectedSeries(option);
              setSearchTerm("");
            }}
            placeholder="Select a Device Series..." // Placeholder text
            styles={customSelectStyles} // Apply custom styles
            aria-label="Select Device Series" // Accessibility label
          />
        </div>

        {/* Search Input Field (Conditional Render) */}
        {selectedSeries && ( // Only show search if a series is selected
          <div className="form-group">
            <input
              type="text"
              placeholder="Search by Code or Name..."
              style={searchInputStyle} // Apply styles
              value={searchTerm} // Controlled component value
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
              aria-label="Search Prefixes" // Accessibility label
            />
          </div>
        )}

        {/* Prefixes Table (Conditional Render) */}
        {selectedSeries && ( // Only show if a series is selected
          <div /* Optional container for the collapsible sections */>
            {Object.keys(groupedAndFilteredPrefixes).length > 0 ? (
              Object.entries(groupedAndFilteredPrefixes).map(
                ([category, prefixesInCategory]) => (
                  // *** NEW: Collapsible Section Component (Conceptual) ***
                  // You'll need to create or import a Collapsible component
                  // This example uses a basic state management for open/closed
                  <CollapsibleSection
                    key={category}
                    title={`${category} Options`}
                  >
                    {/* *** Reuse your existing table structure INSIDE the collapsible section *** */}
                    <PrefixGrid>
                      {prefixesInCategory.map((prefix) => {
                        // Get potentially series-specific name and description
                        const displayName = getSeriesSpecificValue(
                          prefix.name,
                          selectedSeries.value
                        );
                        const displayDescription = getSeriesSpecificValue(
                          prefix.description,
                          selectedSeries.value
                        );

                        return (
                          // Use the PrefixCard for each item
                          <PrefixCard key={prefix.code}>
                            <PrefixCardHeader>
                              {prefix.code} - {displayName}
                            </PrefixCardHeader>
                            <PrefixImage
                              src={prefix.imagePath}
                              alt={displayName}
                              onClick={() => openLightbox(prefix.imagePath)}
                              onError={(e) => {
                                /* Your error handling */
                              }}
                            />
                            <PrefixCardDescription
                              // Render description HTML safely
                              dangerouslySetInnerHTML={{
                                __html: displayDescription,
                              }}
                            />
                          </PrefixCard>
                        );
                      })}
                    </PrefixGrid>
                  </CollapsibleSection>
                )
              )
            ) : (
              // Keep your "No results" message
              <div className="no-results">
                {searchTerm.trim() !== ""
                  ? "No prefixes match your search term for this series."
                  : "No prefixes found for this series."}
              </div>
            )}
          </div>
        )}
      </div>{" "}
      {/* End main content container */}
      {/* Lightbox Rendering (Conditional) */}
      {isLightboxOpen && ( // Only render lightbox when open
        <LightboxOverlay onClick={closeLightbox}>
          {" "}
          {/* Close on overlay click */}
          <LightboxImageContainer onClick={handleImageClickInLightbox}>
            {" "}
            {/* Prevent close on image click */}
            <img src={lightboxImage} alt="Enlarged prefix view" />{" "}
            {/* The enlarged image */}
          </LightboxImageContainer>
        </LightboxOverlay>
      )}
    </> // End Fragment
  );
};

export default PrefixesTable; // Export the component
