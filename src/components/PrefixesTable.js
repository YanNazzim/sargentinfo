// components/PrefixesTable.js
import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
// Import the updated data structure
import { allPrefixes, prefixSeries } from './prefixData'; // [cite: uploaded:components/prefixData.js]
import '../App.css'; // Make sure your shared styles are here

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

// --- Prefix Image Style ---
const PrefixImage = styled.img`
    max-width: 100px; // Adjust as needed
    max-height: 100px; // Adjust as needed
    display: block;
    margin: 5px auto;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform 0.2s ease-in-out;
    cursor: pointer; // <-- Make image clickable

    &:hover {
        transform: scale(1.05);
    }
`;

// --- Category Header Row Style ---
const CategoryHeaderRow = styled.tr`
  background-color: #1a1a1a; /* Darker background for header */

  th {
    width: 100%;
    padding: 12px 15px;
    text-align: center;
    font-weight: bold;
    color: #81d4fa; /* Accent color for the header text */
    font-size: 1.1em;
    border-top: 2px solid #444; /* Add separator line above */
    border-bottom: 1px solid #444;
  }
`;


// --- react-select styles ---
const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#2a2a2a',
      borderColor: state.isFocused ? '#81d4fa' : '#555',
      boxShadow: state.isFocused ? '0 0 0 1px #81d4fa' : 'none',
      minHeight: '40px',
      '&:hover': {
        borderColor: '#888',
      },
    }),
    menu: (provided) => ({
       ...provided,
       backgroundColor: '#2a2a2a',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? '#005a87'
          : state.isFocused
          ? '#444'
          : 'transparent',
        color: '#e0e0e0',
        padding: '10px 15px',
        '&:active': {
          backgroundColor: '#555',
        },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e0e0e0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
    input: (provided) => ({
      ...provided,
      color: '#e0e0e0',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#555',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#aaa',
      '&:hover': {
        color: '#ccc',
      },
    }),
  };

// --- Search input style ---
const searchInputStyle = {
    width: '100%',
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    border: '1px solid #555',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '25px',
};

// --- Component Definition ---
const PrefixesTable = () => {
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');

    // --- Helper function to get series-specific values ---
    const getSeriesSpecificValue = (property, selectedSeriesValue) => {
        if (typeof property === 'object' && property !== null) {
          // Check if there's a specific value for the series, otherwise use default
          return property[selectedSeriesValue] ?? property['default'] ?? '';
        }
        // If property is already a string or other primitive, return it
        return property ?? '';
    };

    // --- Filtering and Grouping Logic ---
    const groupedAndFilteredPrefixes = useMemo(() => {
        // Return empty object immediately if no series is selected
        if (!selectedSeries) {
            return {};
        }

        // 1. Filter by selected series
        let seriesFiltered = allPrefixes.filter(prefix =>
            Array.isArray(prefix.series) && prefix.series.includes(selectedSeries.value)
        ) // [cite: uploaded:components/prefixData.js];

        // 2. Filter by search term if present
        if (searchTerm.trim() !== '') {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            seriesFiltered = seriesFiltered.filter(prefix => {
                // Use helper to get potentially series-specific name for searching
                const displayName = getSeriesSpecificValue(prefix.name, selectedSeries.value); // [cite: uploaded:components/prefixData.js]
                // Check against prefix code and display name
                return (
                    prefix.code.toLowerCase().includes(lowerCaseSearchTerm) || // [cite: uploaded:components/prefixData.js]
                    displayName.toLowerCase().includes(lowerCaseSearchTerm)
                );
            });
        }

        // 3. Group the filtered prefixes by category
        const grouped = seriesFiltered.reduce((acc, prefix) => {
            const category = prefix.category || 'Other'; // Assign to 'Other' if category is missing // [cite: uploaded:components/prefixData.js]
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
        const categoryOrder = ['Mechanical/Electrical', 'Cylinder']; // Define desired order
        // Add categories in the defined order
        categoryOrder.forEach(cat => {
            if (grouped[cat]) { // Check if the category exists in the filtered data
                orderedGrouped[cat] = grouped[cat];
                delete grouped[cat]; // Remove from original object to avoid duplication
            }
        });
        // Add any remaining categories (like 'Other') alphabetically
        Object.keys(grouped).sort().forEach(cat => {
             orderedGrouped[cat] = grouped[cat];
        });


        return orderedGrouped; // Return the ordered, grouped object

    }, [selectedSeries, searchTerm]); // Recompute when series or search term changes


    // --- Lightbox Handlers --- [cite: uploaded:components/DeviceTable.js]
    const openLightbox = (imageUrl) => {
        setLightboxImage(imageUrl); // Set the image for the lightbox
        setIsLightboxOpen(true); // Open the lightbox
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false); // Close the lightbox
        setLightboxImage(''); // Clear the image
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    // Effect to handle closing lightbox with Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isLightboxOpen) {
                closeLightbox(); // Close lightbox if Escape is pressed
            }
        };

        // Add event listener when component mounts or isLightboxOpen changes
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function: remove listener and restore scrolling if needed
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // Ensure scrolling is restored if component unmounts while lightbox is open
            if (isLightboxOpen) {
                 document.body.style.overflow = 'auto';
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
            <div className="content-transition" style={{ padding: '20px' }}>
                <h1 className="Heading">Device Prefixes</h1>

                {/* Series Dropdown Selector */}
                 <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#bdbdbd' }}>
                    Select Series:
                    </label>
                    <Select
                      options={prefixSeries} // Options derived from prefixData.js // [cite: uploaded:components/prefixData.js]
                      value={selectedSeries} // Controlled component value
                      // Update selected series and clear search term on change
                      onChange={(option) => {
                          setSelectedSeries(option);
                          setSearchTerm('');
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
                {selectedSeries && ( // Only show table if a series is selected
                    <div className="table-container">
                      {/* Apply CSS classes for styling */}
                      <table className="prefix-table data-table">
                          {/* Table Header */}
                          <thead>
                            <tr>
                                <th>Prefix Code</th>
                                <th>Image</th>
                                <th>Description</th>
                            </tr>
                          </thead>
                          {/* Table Body */}
                          <tbody>
                            {/* Check if there are any results after filtering/grouping */}
                            {Object.keys(groupedAndFilteredPrefixes).length > 0 ? (
                                // Iterate over each category (group) found
                                Object.entries(groupedAndFilteredPrefixes).map(([category, prefixesInCategory]) => (
                                    // Use React Fragment for each category section
                                    <React.Fragment key={category}>
                                        {/* Render the Category Header Row */}
                                        <CategoryHeaderRow>
                                            {/* Header spans all 3 columns */}
                                            <th colSpan="3">{category} Options</th>
                                        </CategoryHeaderRow>
                                        {/* Render rows for prefixes within this category */}
                                        {prefixesInCategory.map((prefix) => {
                                            // Get potentially series-specific name and description
                                            const displayName = getSeriesSpecificValue(prefix.name, selectedSeries.value); // [cite: uploaded:components/prefixData.js]
                                            const displayDescription = getSeriesSpecificValue(prefix.description, selectedSeries.value); // [cite: uploaded:components/prefixData.js]

                                            // Return table row for the prefix
                                            return (
                                                <tr key={prefix.code}>
                                                    {/* Prefix Code and Name */}
                                                    <td data-label="Prefix Code">{prefix.code} ({displayName})</td>
                                                    {/* Prefix Image (Clickable for Lightbox) */}
                                                    <td data-label="Image">
                                                        <PrefixImage
                                                            src={prefix.imagePath} // Image source from data // [cite: uploaded:components/prefixData.js]
                                                            alt={displayName} // Alt text
                                                            onClick={() => openLightbox(prefix.imagePath)} // Open lightbox on click // [cite: uploaded:components/prefixData.js]
                                                            // Error handler for broken images
                                                            onError={(e) => {
                                                                e.target.onerror = null; // Prevent infinite loop
                                                                // IMPORTANT: Update this path if needed
                                                                e.target.src = "/path/to/your/assets/images/placeholder.png";
                                                            }}
                                                        />
                                                    </td>
                                                    {/* Prefix Description (Handles HTML) */}
                                                    <td
                                                        data-label="Description"
                                                        // Render description HTML safely
                                                        dangerouslySetInnerHTML={{ __html: displayDescription }}
                                                    ></td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                ))
                            ) : (
                                // Render message if no prefixes found after filtering
                                <tr>
                                    <td colSpan="3" className="no-results">
                                        {/* Show different message based on whether search term was used */}
                                        {searchTerm.trim() !== ''
                                            ? 'No prefixes match your search term for this series.'
                                            : 'No prefixes found for this series.'}
                                    </td>
                                </tr>
                            )}
                          </tbody>
                      </table>
                    </div>
                )}
            </div> {/* End main content container */}

            {/* Lightbox Rendering (Conditional) */}
            {isLightboxOpen && ( // Only render lightbox when open
                <LightboxOverlay onClick={closeLightbox}> {/* Close on overlay click */}
                    <LightboxImageContainer onClick={handleImageClickInLightbox}> {/* Prevent close on image click */}
                        <img src={lightboxImage} alt="Enlarged prefix view" /> {/* The enlarged image */}
                    </LightboxImageContainer>
                </LightboxOverlay>
            )}
        </> // End Fragment
    );
};

export default PrefixesTable; // Export the component