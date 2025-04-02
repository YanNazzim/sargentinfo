// components/PrefixesTable.js
import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import styled, { keyframes } from 'styled-components';
// Import data and components
import { allPrefixes, prefixSeries } from "./prefixData"; // [cite: uploaded:components/prefixData.js]
import { Images } from "./images"; // Import Images for placeholder fallback [cite: uploaded:components/images.js]
import "../App.css"; // Make sure your shared styles are here
import CollapsibleSection from "./CollapsibleSection"; // [cite: uploaded:components/CollapsibleSection.js]

// --- Keyframes for subtle animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;


// --- Lightbox Styled Components ---
const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`;

const LightboxImageContainer = styled.div`
  position: relative;
  max-width: 80vw;
  max-height: 80vh;
  cursor: default;
  transform: scale(0.8);
  opacity: 0;
  animation: ${scaleUp} 0.3s 0.1s forwards;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  }
`;

// --- Prefix Card and Grid Styles ---
const PrefixImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  display: block;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer; // Ensure cursor indicates clickability

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const PrefixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // Responsive columns
  gap: 20px;
  padding: 20px 15px; // Add padding inside the grid area

  @media (max-width: 600px) {
    grid-template-columns: 1fr; // Stack to 1 column earlier
  }
`;

const PrefixCard = styled.div`
  background-color: #333;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 20px; // Increased padding
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px); // Slightly more lift on hover
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const PrefixCardHeader = styled.h4`
  color: #81d4fa;
  margin-top: 0; // Remove default top margin
  margin-bottom: 15px; // More space below header
  font-size: 1.2em; // Slightly larger header
  font-weight: 600;
`;

const PrefixCardDescription = styled.div`
  font-size: 0.95em;
  color: #ccc;
  margin-top: auto; // Pushes description down if card height varies
  line-height: 1.5; // Improve readability

  p, ul, li, br {
    margin: 8px 0;
  }
  ul {
    padding-left: 20px;
    text-align: left;
  }
`;

// --- react-select Styles ---
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


// --- Styled Search Input Components ---
const SearchContainer = styled.div`
  opacity: ${props => props.show ? 1 : 0};
  max-height: ${props => props.show ? '100px' : '0'};
  overflow: hidden;
  transition: opacity 0.4s ease-out, max-height 0.4s ease-out, margin-bottom 0.4s ease-out;
  margin-bottom: ${props => props.show ? '30px' : '0'};
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  background-color: #1f1f1f;
  color: #e8e8e8;
  border: 2px solid #00bcd4;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 3px 8px rgba(0, 188, 212, 0.3);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #ffeb3b;
    box-shadow: 0 0 10px rgba(255, 235, 59, 0.6);
  }
`;
// --- End Styled Components ---


// --- Component Definition ---
const PrefixesTable = () => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  // --- Pre-process prefixes based on selected series ---
  const processedPrefixesForSelectedSeries = useMemo(() => {
    if (!selectedSeries) {
        // console.log("Pre-processing: No series selected."); // Optional logging
        return []; // Return empty array if no series is selected
    }

    const currentSeriesValue = selectedSeries.value;
    // console.log(`Pre-processing: Starting for Series: ${currentSeriesValue}`); // Optional logging

    // 1. Filter prefixes applicable to the selected series
    const applicablePrefixes = allPrefixes.filter(
      (prefix) =>
        Array.isArray(prefix.series) &&
        prefix.series.includes(currentSeriesValue)
    ); // [cite: uploaded:components/prefixData.js]

    // console.log(`Pre-processing: Found ${applicablePrefixes.length} applicable prefixes.`); // Optional logging

    // 2. Map over applicable prefixes to calculate final display strings
    const processed = applicablePrefixes.map(prefix => {
      // console.log(`Pre-processing Prefix: ${prefix.code}`); // Optional logging

      // --- Helper function embedded for clarity ---
      const getFinalValue = (property, propertyName) => {
        let rawValue = property; // Start with the raw property
        let finalValue = '';     // Default final value

        // console.log(` -> Processing property: ${propertyName}, Raw data:`, rawValue); // Optional logging

        if (typeof rawValue === 'object' && rawValue !== null) {
            // console.log(`  -> Is object. Checking key: ${currentSeriesValue}`); // Optional logging
            // 1. Try series-specific key
            if (rawValue[currentSeriesValue] !== undefined && rawValue[currentSeriesValue] !== null) {
                finalValue = rawValue[currentSeriesValue];
                // console.log(`  -> Found series key '${currentSeriesValue}'. Value:`, finalValue); // Optional logging
            }
            // 2. If series key not found or value is null/undefined, try default key
            else if (rawValue['default'] !== undefined && rawValue['default'] !== null) {
                finalValue = rawValue['default'];
                // console.log(`  -> Series key '${currentSeriesValue}' missing/falsy. Using 'default'. Value:`, finalValue); // Optional logging
            } else {
                // console.log(`  -> Series key '${currentSeriesValue}' and 'default' key missing/falsy.`); // Optional logging
                finalValue = propertyName === 'imagePath' ? Images.placeholder : ''; // Specific fallback for image
            }
        } else if (rawValue) {
            // It's already a direct value (string or require object)
            finalValue = rawValue;
            // console.log(`  -> Is direct value:`, finalValue); // Optional logging
        } else {
            // console.log(`  -> Property is missing or falsy.`); // Optional logging
            finalValue = propertyName === 'imagePath' ? Images.placeholder : ''; // Specific fallback for image
        }

        // Handle potential { default: 'path' } from require() specifically for imagePath
        if (propertyName === 'imagePath') {
            if(typeof finalValue === 'object' && finalValue?.default) {
                // console.log(`  -> Handling require() object for image. Extracted path:`, finalValue.default); // Optional logging
                return finalValue.default; // Use the default export string
            }
            // Ensure it's a string, otherwise fallback (handles cases where placeholder might be object too)
             if(typeof finalValue !== 'string') {
                 // console.warn(`  -> Final image value is not a string, using placeholder's default.`); // Optional logging
                 return Images.placeholder?.default || ''; // Use placeholder's path or empty string
             }
        }
        // console.log(`  -> Final calculated value for ${propertyName}:`, finalValue); // Optional logging
        return finalValue; // Return the calculated string value
      };
      // --- End Helper ---

      const displayName = getFinalValue(prefix.name, 'name');
      const displayDescription = getFinalValue(prefix.description, 'description');
      const displayImagePath = getFinalValue(prefix.imagePath, 'imagePath');

      return {
        // Keep original data + add calculated display strings
        ...prefix,
        displayName,
        displayDescription,
        displayImagePath, // This will be the final STRING path
      };
    });

    // console.log(`Pre-processing: Finished. Processed data:`, processed); // Optional logging
    return processed;

  }, [selectedSeries]); // Recalculate only when selectedSeries changes


  // --- Filter and Group the PRE-PROCESSED data ---
  const groupedProcessedPrefixes = useMemo(() => {
    // console.log("Filtering/Grouping: Starting..."); // Optional logging
    let filtered = processedPrefixesForSelectedSeries; // Start with pre-processed data

    // Filter by search term (operates on the calculated displayName)
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      // console.log(`Filtering/Grouping: Applying search term: ${lowerCaseSearchTerm}`); // Optional logging
      filtered = filtered.filter((prefix) => {
        return (
          prefix.code.toLowerCase().includes(lowerCaseSearchTerm) ||
          prefix.displayName.toLowerCase().includes(lowerCaseSearchTerm) // Search on calculated name
        );
      });
      // console.log(`Filtering/Grouping: ${filtered.length} prefixes after search.`); // Optional logging
    } else {
        // console.log(`Filtering/Grouping: No search term.`); // Optional logging
    }

    // Group the filtered prefixes by category
    // console.log("Filtering/Grouping: Grouping by category..."); // Optional logging
    const grouped = filtered.reduce((acc, prefix) => {
      const category = prefix.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(prefix);
      return acc;
    }, {});

    // Order categories
    const orderedGrouped = {};
    const categoryOrder = ["Mechanical/Electrical", "Cylinder"];
    categoryOrder.forEach((cat) => { if (grouped[cat]) { orderedGrouped[cat] = grouped[cat]; delete grouped[cat]; } });
    Object.keys(grouped).sort().forEach((cat) => { orderedGrouped[cat] = grouped[cat]; });

    // console.log("Filtering/Grouping: Finished. Grouped data:", orderedGrouped); // Optional logging
    return orderedGrouped;

  }, [processedPrefixesForSelectedSeries, searchTerm]); // Recalculate when processed data or search term changes


  // --- Lightbox Handlers ---
   const openLightbox = (imageUrl) => {
     if (typeof imageUrl === 'string' && imageUrl) { // Check if it's a non-empty string
       setLightboxImage(imageUrl);
       setIsLightboxOpen(true);
       document.body.style.overflow = "hidden";
     } else {
       console.error("Lightbox Error: Invalid or empty image URL provided", imageUrl);
     }
   };
   const closeLightbox = () => {
       setIsLightboxOpen(false);
       setLightboxImage("");
       document.body.style.overflow = "auto";
   };
   useEffect(() => {
       const handleKeyDown = (event) => {
           if (event.key === "Escape" && isLightboxOpen) {
             closeLightbox();
           }
        };
        window.addEventListener("keydown", handleKeyDown);
       return () => {
         window.removeEventListener("keydown", handleKeyDown);
         if (isLightboxOpen) {
            document.body.style.overflow = "auto";
          }
        };
    }, [isLightboxOpen]);
   const handleImageClickInLightbox = (event) => { event.stopPropagation(); };


  // --- Determine states ---
  const sectionsShouldBeOpen = searchTerm.trim() !== "";
  const showSearch = !!selectedSeries;

  // --- Component Render ---
  return (
    <>
      <div className="content-transition" style={{ padding: "20px" }}>
         <h1 className="Heading">Device Prefixes</h1>
         <div className="form-group" style={{ marginBottom: "25px" }}>
             <label style={{ display: "block", marginBottom: "8px", color: "#bdbdbd" }}>Select Series:</label>
             <Select
                 options={prefixSeries} // [cite: uploaded:components/prefixData.js]
                 value={selectedSeries}
                 onChange={(option) => { setSelectedSeries(option); setSearchTerm(""); }}
                 placeholder="Select a Device Series..."
                 styles={customSelectStyles}
                 aria-label="Select Device Series"
             />
         </div>
         <SearchContainer show={showSearch}>
             <StyledSearchInput
                 type="text"
                 placeholder="Search by Code or Name..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 aria-label="Search Prefixes"
             />
         </SearchContainer>

        {/* Prefixes Display Area - Iterate over groupedProcessedPrefixes */}
        {selectedSeries && (
          <div>
            {/* Use the results from the second memo hook */}
            {Object.keys(groupedProcessedPrefixes).length > 0 ? (
              Object.entries(groupedProcessedPrefixes).map(
                ([category, prefixesInCategory]) => (
                  <CollapsibleSection
                    key={category}
                    title={`${category} Options`}
                    isOpen={sectionsShouldBeOpen}
                  >
                    <PrefixGrid>
                      {/* Map over the already processed prefixes */}
                      {prefixesInCategory.map((prefix) => {
                        // Directly use the pre-calculated display strings
                        return (
                          <PrefixCard key={prefix.code}>
                            <PrefixCardHeader>
                              {prefix.code} - {prefix.displayName}
                            </PrefixCardHeader>
                            <PrefixImage
                              src={prefix.displayImagePath} /* Use pre-calculated path string */
                              alt={prefix.displayName}
                              onClick={() => openLightbox(prefix.displayImagePath)} /* Pass pre-calculated path string */
                              onError={(e) => {
                                console.error(`Error loading image for ${prefix.code}:`, prefix.displayImagePath);
                                e.target.src = Images.placeholder?.default || Images.placeholder || ''; // Attempt placeholder on error
                                e.target.style.border = '1px solid red'; // Indicate error visually
                              }}
                            />
                            <PrefixCardDescription
                              dangerouslySetInnerHTML={{ __html: prefix.displayDescription }} /* Use pre-calculated description */
                            />
                          </PrefixCard>
                        );
                      })}
                    </PrefixGrid>
                  </CollapsibleSection>
                )
              )
            ) : (
               <div className="no-results" style={{ marginTop: showSearch ? '0' : '20px' }}>
                 {searchTerm.trim() !== ""
                     ? "No prefixes match your search criteria for this series."
                     : "No applicable prefixes found for this series." // Changed message slightly
                 }
               </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Rendering */}
      {isLightboxOpen && (
          <LightboxOverlay onClick={closeLightbox}>
              <LightboxImageContainer onClick={handleImageClickInLightbox}>
                  <img src={lightboxImage} alt="Enlarged prefix view" />
              </LightboxImageContainer>
          </LightboxOverlay>
      )}
    </>
  );
};

export default PrefixesTable;