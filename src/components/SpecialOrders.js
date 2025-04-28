// components/SpecialOrders.js
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import deviceData from './deviceData'; // Assuming path is correct [cite: uploaded:components/deviceData.js]
import functionDescriptions from './functionDescriptions'; // Assuming path is correct [cite: uploaded:components/functionDescriptions.js]
import thickDoorPartsDataRanges from './thickdoorData.js'; // Assuming path is correct and file exists with range structure
import { Images } from "./images"; // Assuming path is correct [cite: uploaded:components/images.js]

// --- Styled Components ---
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
  max-width: 600px;
  margin-bottom: 25px;
  background-color: #2a2a2a;
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

const BasicInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #333;
  border-radius: 5px;
  border: 1px solid #444;
   h3 {
     color: #81d4fa;
     margin-bottom: 10px;
   }
   p {
     margin: 5px 0;
     line-height: 1.5;
   }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  background: linear-gradient(135deg, #1fcc44 0%, #1a9e36 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;

  &:hover {
    background: linear-gradient(135deg, #23e04d 0%, #1daf3d 100%);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
     transform: translateY(1px);
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ResultsSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SummarySection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #444;

  h3 {
    color: #81d4fa;
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
    line-height: 1.5;
  }
  strong {
     color: #ccc;
  }
`;

const PartsSection = styled.div`
   h3 {
     color: #81d4fa;
     margin-bottom: 15px;
   }
   h4 {
     color: #bdbdbd;
     margin-top: 15px;
     margin-bottom: 8px;
     font-size: 1.1em;
     border-bottom: 1px dashed #555;
     padding-bottom: 5px;
   }
   ul {
     list-style: none;
     padding-left: 0;
     margin: 0;
   }
   li {
     background-color: #2a2a2a;
     padding: 8px 12px;
     border-radius: 4px;
     margin-bottom: 6px;
     font-size: 0.95em;
   }
    i { // Style for placeholder text
        color: #aaa;
        font-style: italic;
    }
`;

const OptionWithImage = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    object-fit: contain;
    border-radius: 4px;
    vertical-align: middle; // Helps alignment
  }
  span {
    font-weight: 500;
    vertical-align: middle; // Helps alignment
  }
`;

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#3a3a3a',
    borderColor: state.isFocused ? '#81d4fa' : '#555',
    boxShadow: state.isFocused ? '0 0 0 1px #81d4fa' : 'none',
    minHeight: '40px',
    marginBottom: '15px',
    '&:hover': { borderColor: '#888' },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2a2a2a',
    zIndex: 5,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#005a87'
      : state.isFocused
      ? '#444'
      : 'transparent',
    color: '#e0e0e0',
    padding: '8px 12px', // Keep padding reasonable
    '&:active': {
      backgroundColor: '#555',
    },
    display: 'flex',
    alignItems: 'center'
  }),
  singleValue: (provided, state) => ({ // Selected value in control
    ...provided,
    color: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
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
    '&:hover': { color: '#ccc' },
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: '#bdbdbd',
    fontSize: '0.9em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '8px 12px',
    borderBottom: '1px solid #444',
  }),
};

// --- Helper Functions ---
const generateThicknessOptions = () => {
    const options = [];
    let currentValue = 2.25;
    const maxValue = 5.0;
    const increment = 0.0625;
    while (currentValue <= maxValue) {
        const inches = Math.floor(currentValue);
        const remainder = currentValue - inches;
        let fraction = '';
        if (remainder > 0) {
            const sixteenths = Math.round(remainder / increment);
             if (sixteenths === 16) { fraction = ''; }
             else if (sixteenths % 8 === 0) { fraction = ` ${sixteenths / 8}/2`; }
             else if (sixteenths % 4 === 0) { fraction = ` ${sixteenths / 4}/4`; }
             else if (sixteenths % 2 === 0) { fraction = ` ${sixteenths / 2}/8`; }
             else { fraction = ` ${sixteenths}/16`; }
             if (inches === 0) fraction = fraction.trimStart();
        }
        const label = `${inches > 0 ? inches : ''}${fraction}"`;
        options.push({ value: currentValue, label: label });
        currentValue = parseFloat((currentValue + increment).toFixed(4));
    }
    return options;
};

const getPartsForThickness = (selectedThicknessValue) => {
  const applicableParts = {
    spindles: new Set(),
    trimScrews: new Set(),
    auxScrews: new Set(),
    rimCylinderScrews: new Set(),
    rimCylinderTailpiece: new Set(),
  };

  if (!thickDoorPartsDataRanges || !Array.isArray(thickDoorPartsDataRanges)) {
      console.error("thickDoorPartsDataRanges is not defined or not an array");
      return null; // Or return an empty structure
  }

  thickDoorPartsDataRanges.forEach(range => {
    if (selectedThicknessValue >= range.min && selectedThicknessValue <= range.max) {
      if (range.parts) {
        Object.entries(range.parts).forEach(([category, partsList]) => {
          if (applicableParts[category] && Array.isArray(partsList)) {
            partsList.forEach(part => applicableParts[category].add(part));
          }
        });
      }
      if (range.subRanges && Array.isArray(range.subRanges)) {
        range.subRanges.forEach(subRange => {
          if (selectedThicknessValue >= subRange.min && selectedThicknessValue <= subRange.max) {
            if (subRange.parts) {
              Object.entries(subRange.parts).forEach(([category, partsList]) => {
                if (applicableParts[category] && Array.isArray(partsList)) {
                  partsList.forEach(part => applicableParts[category].add(part));
                }
              });
            }
          }
        });
      }
    }
  });

  const finalParts = {};
  Object.keys(applicableParts).forEach(category => {
    finalParts[category] = Array.from(applicableParts[category]);
  });

  const foundAnyParts = Object.values(finalParts).some(arr => arr.length > 0);
  return foundAnyParts ? finalParts : null;
};

// --- Component ---
function SpecialOrders() {
  // --- State Variables ---
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedThickness, setSelectedThickness] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [currentResults, setCurrentResults] = useState(null);

  // --- Static Data & Memoized Calculations ---
  const specialOrderCodes = useMemo(() => [
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
    { value: 'NC-E100', label: 'NC-E100 - QSPAR Code ()' },
  ], []);

  const deviceOptions = useMemo(() => {
     if (!deviceData || !Array.isArray(deviceData)) return []; // Basic validation
     return deviceData.map(seriesInfo => ({
       label: seriesInfo.series,
       options: (seriesInfo.devices || []).map(device => ({
         value: device.name, // Assuming name is unique enough for value
         label: device.name.replace(/<[^>]*>?/gm, ''), // Clean HTML
         functions: device.functions,
         series: seriesInfo.series
       }))
     }));
   }, []);

  const functionOptions = useMemo(() => {
     if (!selectedDevice || !selectedDevice.functions) return [];
     let codes = [];
     const functionsData = selectedDevice.functions;
     if (Array.isArray(functionsData)) { codes = functionsData.map(f => String(f).trim()).filter(f => f); }
     else if (typeof functionsData === 'string') {
         const potentialCodes = functionsData.split(',').map(f => f.trim()).filter(f => f);
         // Simple check: if it looks like codes vs a description
         if (potentialCodes.length > 0 && !functionsData.includes('<br') && functionsData.length < 150) { codes = potentialCodes; }
         else { return [{ value: 'desc', label: functionsData.replace(/<[^>]*>?/gm, ''), isDisabled: true }]; }
     } else { return []; } // Handle case where functionsData isn't array or string
     return codes.map(code => ({
       value: code,
       label: `${code} - ${functionDescriptions[code] || 'Unknown Function'}` // Assuming functionDescriptions is available
     })).filter(option => option.label); // Ensure label exists
   }, [selectedDevice]);

  const thicknessOptions = useMemo(generateThicknessOptions, []);

  const pullTrimFunctions = useMemo(() => new Set(['04', '10', '28', '62', '63', '66']), []);

   const pullTrimOptionsList = useMemo(() => [
     { value: 'ETP', label: 'ETP Pull', image: Images.placeholderPullETP || Images.placeholder }, // REPLACE PLACEHOLDER
     { value: '570P', label: '570P Pull', image: Images.placeholderPull570P || Images.placeholder }, // REPLACE PLACEHOLDER
     { value: '571P', label: '571P Pull', image: Images.placeholderPull571P || Images.placeholder }, // REPLACE PLACEHOLDER
     { value: '572P', label: '572P Pull', image: Images.placeholderPull572P || Images.placeholder }, // REPLACE PLACEHOLDER
     // { value: 'XXXP', label: 'XXXP Pull', image: Images.placeholderPullXXXP || Images.placeholder }, // Add more as needed
   ], []);

  const trimOptions = useMemo(() => {
    const baseOptions = [
      { value: 'ET', label: 'ET (Escutcheon Trim)', image: Images.ETTrim || Images.placeholder }, // Standard ET Trim, ensure placeholder exists
      { value: 'NoTrim', label: 'No Trim / Exit Only Prep', image: null },
    ];
    if (selectedFunction && pullTrimFunctions.has(selectedFunction.value)) {
      return [...baseOptions, ...pullTrimOptionsList];
    }
    return baseOptions;
  }, [selectedFunction, pullTrimFunctions, pullTrimOptionsList]);

  const formatOptionLabel = ({ value, label, image }) => (
    <OptionWithImage>
      {image && <img src={image} alt={label || value} onError={(e) => { if (Images && Images.placeholder) e.target.src = Images.placeholder; else e.target.style.display='none'; }} />}
      <span>{label}</span>
    </OptionWithImage>
  );

  // --- Event Handlers ---
  const handleCodeChange = (option) => {
    setSelectedCode(option);
    setSelectedDevice(null);
    setSelectedFunction(null);
    setSelectedTrim(null);
    setSelectedThickness(null);
    setShowResults(false);
    setCurrentResults(null);
  };

  const handleDeviceChange = (option) => {
    setSelectedDevice(option);
    setSelectedFunction(null);
    setSelectedTrim(null); // Reset trim when device changes
    setShowResults(false);
    setCurrentResults(null);
  };

  const handleFunctionChange = (option) => {
    setSelectedFunction(option);
    setSelectedTrim(null); // Reset trim when function changes
    setShowResults(false);
    setCurrentResults(null);
  };

  const handleTrimChange = (option) => {
    setSelectedTrim(option);
    setShowResults(false);
    setCurrentResults(null);
  };

  const handleThicknessChange = (option) => {
    setSelectedThickness(option);
    setShowResults(false);
    setCurrentResults(null);
  };

  const handleSubmit = () => {
    if (!selectedThickness || selectedThickness.value === 1.75) {
      alert("Please select a door thickness greater than 1-3/4\" for the NC-E05 special order.");
      return;
    }
    if (!selectedDevice || !selectedFunction || !selectedTrim) {
      alert("Please select a Device, Function, and Trim before submitting.");
      return;
    }

    const parts = getPartsForThickness(selectedThickness.value);

    if (!parts) {
      console.warn(`No specific parts data found for thickness value: ${selectedThickness.value}`);
      setCurrentResults({
        code: selectedCode, device: selectedDevice, function: selectedFunction,
        trim: selectedTrim, thickness: selectedThickness,
        error: `No specific thick door parts found for thickness ${selectedThickness.label}. Verify data in thickdoorData.js or standard parts may apply.`
      });
    } else {
      setCurrentResults({
        code: selectedCode, device: selectedDevice, function: selectedFunction,
        trim: selectedTrim, thickness: selectedThickness,
        parts: parts
      });
    }
    setShowResults(true);
  };

  // --- Derived State ---
  const isSubmitDisabled = !selectedCode || selectedCode.value !== 'NC-E05' || !selectedDevice || !selectedFunction || !selectedTrim || !selectedThickness || selectedThickness.value === 1.75;

  // --- Render ---
  return (
    <Container>
      <Header>Special Orders Configuration</Header>

      <FormSection>
        <Label htmlFor="special-order-code">Select Special Order Code:</Label>
        <Select
          inputId="special-order-code"
          options={specialOrderCodes}
          value={selectedCode}
          onChange={handleCodeChange}
          placeholder="Choose a code..."
          styles={customSelectStyles}
          aria-label="Select Special Order Code"
        />

        {selectedCode && selectedCode.value === 'NC-E05' && (
          <>
            <Label htmlFor="device-select">Choose Device Model:</Label>
            <Select
              inputId="device-select"
              options={deviceOptions}
              value={selectedDevice}
              onChange={handleDeviceChange}
              placeholder="Select Device by Series..."
              styles={customSelectStyles}
              formatGroupLabel={data => (
                <div style={customSelectStyles.groupHeading()}>
                  <span>{data.label}</span>
                </div>
              )}
              aria-label="Select Device Model"
            />

            {selectedDevice && (
              <>
                <Label htmlFor="function-select">Select Function:</Label>
                <Select
                  inputId="function-select"
                  options={functionOptions}
                  value={selectedFunction}
                  onChange={handleFunctionChange}
                  placeholder="Select function..."
                  styles={customSelectStyles}
                  isDisabled={!functionOptions || functionOptions.length === 0}
                  aria-label="Select Function"
                />

                <Label htmlFor="trim-select">Select Trim:</Label>
                <Select
                  inputId="trim-select"
                  options={trimOptions}
                  value={selectedTrim}
                  onChange={handleTrimChange}
                  placeholder="Select trim..."
                  styles={customSelectStyles}
                  formatOptionLabel={formatOptionLabel} // Use custom formatter for images
                  isDisabled={!selectedFunction} // Disable if no function selected
                  aria-label="Select Trim"
                />

                <Label htmlFor="thickness-select">Specify Door Thickness (Required for NC-E05):</Label>
                <Select
                  inputId="thickness-select"
                  options={thicknessOptions}
                  value={selectedThickness}
                  onChange={handleThicknessChange}
                  placeholder='Select thickness (2-1/4" to 5")...'
                  styles={customSelectStyles}
                  getOptionValue={(option) => option.value}
                  filterOption={(option, rawInput) => {
                    const candidate = String(option.label).toLowerCase();
                    const input = String(rawInput).toLowerCase();
                    return candidate.includes(input);
                  }}
                  aria-label="Select Door Thickness"
                />
              </>
            )}
            <SubmitButton onClick={handleSubmit} disabled={isSubmitDisabled}>
              Show Thick Door Parts
            </SubmitButton>
          </>
        )}

        {selectedCode && selectedCode.value !== 'NC-E05' && (
          <BasicInfo>
            <h3>Details for {selectedCode.label}</h3>
            <p>Define requirements, show images, or add forms specific to this code here.</p>
            {selectedCode.value === 'NC-E24' && <p style={{ color: 'orange', fontWeight: 'bold' }}>Warning: DSS confirmation is mandatory before ordering NC-E24.</p>}
            {selectedCode.value === 'NC-E46' && <p style={{ color: 'orange', fontWeight: 'bold' }}>Warning: Letter from AHJ required for NC-E46.</p>}
          </BasicInfo>
        )}
      </FormSection>

      {showResults && currentResults && selectedCode?.value === 'NC-E05' && (
        <ResultsSection>
          <SummarySection>
            <h3>Device Summary</h3>
            <p><strong>Code:</strong> {currentResults.code?.label ?? 'N/A'}</p>
            <p><strong>Device:</strong> {currentResults.device?.label ?? 'N/A'}</p>
            <p><strong>Function:</strong> {currentResults.function?.label ?? 'N/A'}</p>
            <p><strong>Trim:</strong> {currentResults.trim?.label ?? 'N/A'}</p>
            <p><strong>Door Thickness:</strong> {currentResults.thickness?.label ?? 'N/A'}</p>
          </SummarySection>

          {currentResults.error ? (
            <p style={{ color: 'orange', fontWeight: 'bold' }}>{currentResults.error}</p>
          ) : currentResults.parts && Object.values(currentResults.parts).some(arr => arr.length > 0) ? (
            <PartsSection>
              <h3>Parts Needed for {currentResults.thickness?.label ?? 'Selected Thickness'}</h3>
              {Object.entries(currentResults.parts).map(([categoryKey, partList]) => {
                const categoryMap = {
                  spindles: "Spindles",
                  trimScrews: "Trim Screws",
                  auxScrews: "Auxiliary Screws",
                  rimCylinderScrews: "Rim Cylinder Screws",
                  rimCylinderTailpiece: "Rim Cylinder Tailpiece"
                };
                const categoryName = categoryMap[categoryKey] || categoryKey;
                if (partList && partList.length > 0) {
                  return (
                    <div key={categoryKey}>
                      <h4>{categoryName}</h4>
                      <ul>
                        {partList.map((part, index) => (
                          <li key={`${categoryKey}-${index}`}>
                            {part === "MANUALLY_ADD_PART" ? <i>Part number needed in thickdoorData.js</i> : part}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </PartsSection>
          ) : (
            <p>No specific thick door parts data found for the selected thickness based on ranges in thickdoorData.js.</p>
          )}
        </ResultsSection>
      )}
    </Container>
  );
}

export default SpecialOrders;