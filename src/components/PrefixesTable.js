// components/PrefixesTable.js
import React, { useState, useMemo } from 'react';
import Select from 'react-select';
// Import the updated data structure
import { allPrefixes, prefixSeries } from './prefixData'; // Adjust path as necessary
import '../App.css'; // Make sure your shared styles are here

// Custom styles for react-select (keep from previous step)
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

// Style for the search input (add to your CSS or use styled-components)
const searchInputStyle = {
    width: '100%', // Take full width
    padding: '10px 15px',
    fontSize: '1rem',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    border: '1px solid #555',
    borderRadius: '4px',
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
    marginBottom: '25px', // Space below the search input
};

const PrefixesTable = () => {
  const [selectedSeries, setSelectedSeries] = useState(null);
  // --- NEW: State for the search term ---
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to get the correct string based on selected series
  const getSeriesSpecificValue = (property, selectedSeriesValue) => {
    if (typeof property === 'object' && property !== null) {
      return property[selectedSeriesValue] ?? property['default'] ?? '';
    }
    return property ?? '';
  };

  // --- UPDATED: Filtering logic now includes search term ---
  const filteredPrefixes = useMemo(() => {
    if (!selectedSeries) {
      return [];
    }

    // 1. Filter by selected series first
    let seriesFiltered = allPrefixes.filter(prefix =>
        Array.isArray(prefix.series) && prefix.series.includes(selectedSeries.value)
    );

    // 2. If there's a search term, filter further
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      seriesFiltered = seriesFiltered.filter(prefix => {
        // Get the series-specific name for searching
        const displayName = getSeriesSpecificValue(prefix.name, selectedSeries.value);
        // Check if code or name includes the search term (case-insensitive)
        return (
          prefix.code.toLowerCase().includes(lowerCaseSearchTerm) ||
          displayName.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    }

    return seriesFiltered;

  }, [selectedSeries, searchTerm]); // Recalculate when series OR search term changes


  return (
    <div className="content-transition" style={{ padding: '20px' }}>
      <h1 className="Heading">Device Prefixes</h1>

      {/* Series Dropdown */}
      <div className="form-group" style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#bdbdbd' }}>
          Select Series:
        </label>
        <Select
          options={prefixSeries}
          value={selectedSeries}
          // Clear search term when series changes
          onChange={(option) => {
              setSelectedSeries(option);
              setSearchTerm(''); // Clear search on series change
          }}
          placeholder="Select a Device Series..."
          styles={customSelectStyles}
          aria-label="Select Device Series"
        />
      </div>

      {/* --- NEW: Search Input Field --- */}
      {selectedSeries && ( // Only show search when a series is selected
         <div className="form-group"> {/* Optional: wrap in form-group */}
            <input
                type="text"
                placeholder="Search by Code or Name..."
                style={searchInputStyle} // Apply styles
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search Prefixes"
            />
         </div>
      )}


      {/* Prefixes Table */}
      {selectedSeries && (
        <div className="table-container">
          {/* Render table using the doubly filtered 'filteredPrefixes' */}
          <table className="prefix-table data-table">
            <thead>
              <tr>
                <th>Prefix Code</th>
                <th>Image</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrefixes.length > 0 ? (
                filteredPrefixes.map((prefix) => {
                  const displayName = getSeriesSpecificValue(prefix.name, selectedSeries.value);
                  const displayDescription = getSeriesSpecificValue(prefix.description, selectedSeries.value);

                  return (
                    <tr key={prefix.code}>
                      <td data-label="Prefix Code">{prefix.code} ({displayName})</td>
                      <td data-label="Image">
                        <img
                          src={prefix.imagePath}
                          alt={displayName}
                          className="prefix-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/your/assets/images/placeholder.png"; // Update placeholder path
                          }}
                        />
                      </td>
                      <td
                        data-label="Description"
                        dangerouslySetInnerHTML={{ __html: displayDescription }}
                      ></td>
                    </tr>
                  );
                })
              ) : (
                 // Show different message based on whether there was a search term
                 <tr>
                    <td colSpan="3" className="no-results">
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
    </div>
  );
};

export default PrefixesTable;

// Suggestion for your CSS file (e.g., App.css) for the input field:
/*

*/