import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Select from 'react-select'; // Using react-select for consistency if used elsewhere
import deviceData from './deviceData'; // Data for devices and series [cite: uploaded:components/deviceData.js]
import functionDescriptions from './functionDescriptions'; // Descriptions for functions [cite: uploaded:components/functionDescriptions.js]

// --- Styled Components ---

// Main Container - Inheriting styles similar to MainPage
const Container = styled.div`
  padding: 30px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin-bottom: 25px;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 600px; // Control max width of the form area
  margin-bottom: 25px;
  background-color: #2a2a2a; // Slightly lighter background for the form area
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #bdbdbd;
  font-weight: 500;
`;

// Reusable Select component styles (similar to PrefixesTable)
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#3a3a3a', // Darker input background
    borderColor: state.isFocused ? '#81d4fa' : '#555',
    boxShadow: state.isFocused ? '0 0 0 1px #81d4fa' : 'none',
    minHeight: '40px',
    marginBottom: '15px', // Space below each select
    '&:hover': {
      borderColor: '#888',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2a2a2a',
    zIndex: 5, // Ensure dropdown is above content below it
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
  groupHeading: (provided) => ({
    ...provided,
    color: '#bdbdbd', // Style for optgroup heading
    fontSize: '0.9em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '8px 12px',
    borderBottom: '1px solid #444',
  }),
};

// Basic Info Section (for codes other than NC-E05)
const BasicInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #333;
  border-radius: 5px;
  border: 1px solid #444;
`;

// --- Helper Functions ---

// Generate door thickness options
const generateThicknessOptions = () => {
    const options = [];
    // Start at 1 3/4 inches (1.75)
    let currentValue = 2.25;
    // End at 5 inches
    const maxValue = 5.0;
    // Increment by 1/16 (0.0625)
    const increment = 0.0625;

    while (currentValue <= maxValue) {
        // Convert decimal to fraction string (simplified representation)
        const inches = Math.floor(currentValue);
        const remainder = currentValue - inches;
        let fraction = '';

        // Find simplest fraction for remainder (up to 16ths)
        if (remainder > 0) {
            const sixteenths = Math.round(remainder / increment);
            // Reduce fraction (e.g., 8/16 -> 1/2) - Basic reduction
            if (sixteenths === 16) {
              // This case shouldn't happen if <= maxValue, but prevents errors
              fraction = ''; // Next full inch handled by loop increment
            } else if (sixteenths % 8 === 0) {
                fraction = ` ${sixteenths / 8}/2`;
            } else if (sixteenths % 4 === 0) {
                fraction = ` ${sixteenths / 4}/4`;
            } else if (sixteenths % 2 === 0) {
                fraction = ` ${sixteenths / 2}/8`;
            } else {
                fraction = ` ${sixteenths}/16`;
            }
            // Trim leading space if no inches part
             if (inches === 0) fraction = fraction.trimStart();
        }


        const label = `${inches > 0 ? inches : ''}${fraction}"`;
        options.push({ value: currentValue, label: label });

        // Use precise addition to avoid floating point issues
        currentValue = parseFloat((currentValue + increment).toFixed(4));
    }
    return options;
};


// --- Component Logic ---

function SpecialOrders() {
  // State for selections
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedThickness, setSelectedThickness] = useState(null);

  // Placeholder special order codes
  const specialOrderCodes = [
    { value: 'NC-E01', label: 'NC-E01 - Alternate Construction for 8700' },
    { value: 'NC-E05', label: 'NC-E05 - Thick Door (2-1/4" to 5" thick)' },
    { value: 'NC-E11', label: 'NC-E11 - CCSD (Clark County School District)' },
    { value: 'NC-E15', label: 'NC-E15 - 722/US10A (10B Black)' },
    { value: 'NC-E16', label: 'NC-E16 - 8700 modified for electric strike' },
    { value: 'NC-E20', label: 'NC-E20 - 80 series Rail Length (over 48" Door Width. Max of 72")' },
    { value: 'NC-E24', label: 'NC-E24 - FM7100 for existing construction only - MUST HAVE CONFIRMATION FROM DSS' },
    { value: 'NC-E26', label: 'NC-E26 - 55- Rail, Cut to length' },
    { value: 'NC-E32', label: 'NC-E32 - 124-46 x Thumbturn in lieu of inside mortise cylinder (8816/8916 only)' },
    { value: 'NC-E38', label: 'NC-E38 - 7000 Series Alternate Construction' },
    { value: 'NC-E44', label: 'NC-E44 - 7000 Series Non Catalog Finish on levers' },
    { value: 'NC-E46', label: 'NC-E46 - Infinite Delay for Delayed Egress (59-) Requires approval from Authority having Jurisdiction via Letter' },
    { value: 'NC-E47', label: 'NC-E47 - 5CH (when used with 55, 56, AL, etc)' },
    { value: 'NC-E100', label: 'NC-E100 - Custom Finish Order' },
  ];

  // Prepare device options with optgroups from deviceData [cite: uploaded:components/deviceData.js]
  const deviceOptions = useMemo(() => {
    return deviceData.map(seriesInfo => ({
      label: seriesInfo.series, // This becomes the optgroup label
      options: seriesInfo.devices.map(device => ({
        value: device.name, // Use name as value (ensure uniqueness or use an ID)
        label: device.name.replace(/<[^>]*>?/gm, ''), // Clean HTML for display
        functions: device.functions, // Store available functions
        series: seriesInfo.series // Store series for potential later use
      }))
    }));
  }, []);

  // Prepare function options based on selected device
  const functionOptions = useMemo(() => {
    if (!selectedDevice || !selectedDevice.functions) return [];

    let codes = [];
    const functionsData = selectedDevice.functions;

    // Parse function codes (similar logic to DeviceTable.js [cite: uploaded:components/DeviceTable.js])
    if (Array.isArray(functionsData)) {
        codes = functionsData.map(f => String(f).trim()).filter(f => f);
    } else if (typeof functionsData === 'string') {
        const potentialCodes = functionsData.split(',').map(f => f.trim()).filter(f => f);
        // Basic check if it looks like a list of codes vs a description
        if (potentialCodes.length > 0 && !functionsData.includes('<br') && functionsData.length < 100) {
           codes = potentialCodes;
        } else {
           return [{ value: 'desc', label: functionsData.replace(/<[^>]*>?/gm, ''), isDisabled: true }]; // Show description if not codes
        }
    }

    return codes.map(code => ({
      value: code,
      label: `${code} - ${functionDescriptions[code] || 'Unknown Function'}` // [cite: uploaded:components/functionDescriptions.js]
    }));
  }, [selectedDevice]);


  // Placeholder trim options
  const trimOptions = [
    { value: 'trim1', label: 'Trim 1' },
    { value: 'trim2', label: 'Trim 2' },
    { value: 'notrim', label: 'No Trim' },
    { value: 'custom', label: 'Custom Trim (Specify)' },
  ];

  // Door thickness options
  const thicknessOptions = useMemo(generateThicknessOptions, []);


  // Reset dependent fields when a higher-level selection changes
  const handleCodeChange = (option) => {
    setSelectedCode(option);
    setSelectedDevice(null);
    setSelectedFunction(null);
    setSelectedTrim(null);
    setSelectedThickness(null);
  };

  const handleDeviceChange = (option) => {
    setSelectedDevice(option);
    setSelectedFunction(null); // Reset function when device changes
  };

  // --- Render Logic ---
  return (
    <Container>
      <Header>Special Orders Configuration</Header>

      <FormSection>
        {/* 1. Select Special Order Code */}
        <Label htmlFor="special-order-code">Select Special Order Code:</Label>
        <Select
          inputId="special-order-code"
          options={specialOrderCodes}
          value={selectedCode}
          onChange={handleCodeChange}
          placeholder="Choose a code..."
          styles={customSelectStyles}
        />

        {/* 2. Conditional Content based on Code */}
        {selectedCode && selectedCode.value === 'NC-E05' && (
          <>
            {/* --- Configurator for NC-E05 --- */}
            <Label htmlFor="device-select">Choose Device Model:</Label>
            <Select
              inputId="device-select"
              options={deviceOptions}
              value={selectedDevice}
              onChange={handleDeviceChange}
              placeholder="Select Device by Series..."
              styles={customSelectStyles}
              formatGroupLabel={data => ( // For optgroup styling
                <div style={customSelectStyles.groupHeading()}>
                  <span>{data.label}</span>
                </div>
              )}
            />

            {selectedDevice && (
              <>
                {/* Function Selection */}
                <Label htmlFor="function-select">Select Function:</Label>
                <Select
                  inputId="function-select"
                  options={functionOptions}
                  value={selectedFunction}
                  onChange={setSelectedFunction}
                  placeholder="Select function..."
                  styles={customSelectStyles}
                  isDisabled={!functionOptions || functionOptions.length === 0}
                />

                {/* Trim Selection */}
                 <Label htmlFor="trim-select">Select Trim:</Label>
                 <Select
                    inputId="trim-select"
                    options={trimOptions}
                    value={selectedTrim}
                    onChange={setSelectedTrim}
                    placeholder="Select trim..."
                    styles={customSelectStyles}
                 />

                 {/* Door Thickness Selection */}
                 <Label htmlFor="thickness-select">Specify Door Thickness:</Label>
                 <Select
                    inputId="thickness-select"
                    options={thicknessOptions}
                    value={selectedThickness}
                    onChange={setSelectedThickness}
                    placeholder="Select thickness..."
                    styles={customSelectStyles}
                 />
              </>
            )}
            {/* --- End Configurator --- */}
          </>
        )}

        {/* Placeholder for other codes */}
        {selectedCode && selectedCode.value !== 'NC-E05' && (
          <BasicInfo>
            <h3>Details for {selectedCode.label}</h3>
            <p>Define the requirements, show relevant images, or add forms specific to this code here.</p>
            {/* Add specific content for NC-E01, NC-X10 etc. */}
          </BasicInfo>
        )}
      </FormSection>

       {/* Display Selected Configuration (Optional) */}
       {selectedCode && selectedCode.value === 'NC-E05' && (selectedDevice || selectedFunction || selectedTrim || selectedThickness) && (
           <FormSection style={{ marginTop: '30px', backgroundColor: '#333' }}>
               <h3>Current Configuration Summary:</h3>
               {selectedCode && <p><strong>Code:</strong> {selectedCode.label}</p>}
               {selectedDevice && <p><strong>Device:</strong> {selectedDevice.label}</p>}
               {selectedFunction && <p><strong>Function:</strong> {selectedFunction.label}</p>}
               {selectedTrim && <p><strong>Trim:</strong> {selectedTrim.label}</p>}
               {selectedThickness && <p><strong>Door Thickness:</strong> {selectedThickness.label}</p>}
           </FormSection>
       )}

    </Container>
  );
}

export default SpecialOrders;