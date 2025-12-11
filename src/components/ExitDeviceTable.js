// src/components/ExitDeviceTable.js
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import deviceData from './deviceData'; // Source of device models and functions
import functionDescriptions from './functionDescriptions'; // Source of function descriptions
import { Images } from './images'; // Source of images

// --- Reusable Styled Components (Adapted for Exit Devices) ---

const TableContainer = styled(motion.div)`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto 30px auto;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  color: #fff;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
`;

// Wrapper for internal scrolling (Desktop only)
const TableWrapper = styled.div`
  /* Desktop: Internal scroll */
  max-height: calc(100vh - 180px); 
  overflow-y: auto;
  border-radius: 8px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #1e1e1e;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  /* Mobile: Remove scrolling wrapper, let body scroll */
  @media (max-width: 1050px) { /* Increased breakpoint for wider table */
    max-height: none;
    overflow-y: visible;
    background-color: transparent;
    box-shadow: none;
    padding-bottom: 1px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; 
  border-spacing: 0;
  margin: 0; 
  table-layout: fixed; /* Fix table layout for responsiveness */

  @media (max-width: 1050px) {
      display: block; 
      thead {
          display: none; 
      }
      tbody { 
          display: block; 
      }
  }
`;

const StyledTh = styled.th`
  background: #1e1e1e;
  padding: 10px 5px;
  font-weight: 600;
  color: #FFEB3B;
  text-align: center;
  font-size: 0.9em;
  border-bottom: 2px solid #444; 
  text-transform: uppercase;
  height: 120px; /* Give space for image */
  
  /* Sticky Header for Desktop */
  position: sticky;
  top: 0;
  z-index: 20;
  vertical-align: top;

  &:first-child {
      border-radius: 8px 0 0 0;
      width: 25%; /* Wider column for function descriptions */
      text-align: left;
      padding-left: 20px;
  }
  &:last-child {
      border-radius: 0 8px 0 0;
  }
  
  span {
      display: block;
      padding-bottom: 5px;
  }
`;

const StyledThImage = styled.img`
    max-height: 80px;
    max-width: 100%;
    object-fit: contain;
    background-color: #fff;
    padding: 2px;
    border-radius: 4px;
    margin-top: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    cursor: pointer;
`;

const StyledTableRow = styled.tr`
  background-color: #2a2a2a; 
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #333;
  }

  /* --- Mobile Card Style --- */
  @media (max-width: 1050px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #444;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    background-color: #2a2a2a;
  }
`;

const StyledTd = styled.td`
  white-space: pre-line;
  padding: 10px 5px; 
  text-align: center;
  color: white;
  font-size: 0.9em;
  line-height: 1.5;
  vertical-align: middle;
  border-bottom: 1px solid #333;

  /* Function Description Column (Desktop) */
  &:first-child { 
    text-align: left;
    color: #ccc;
    padding-left: 20px;
    width: 25%;

    strong {
        color: #FFEB3B; 
        font-size: 1.1em;
        font-weight: 600;
        display: block;
    }
  }

  /* Status Icons (Desktop) */
  &.status-cell {
    font-size: 1.2em;
    font-weight: 700;
    color: #4CAF50; /* Bright Green */
  }
  &.status-cell.unavailable {
    font-size: 1.2em;
    color: #ff0000; /* Red for X */
    font-weight: 400;
  }
  
  /* --- Mobile View Adjustments --- */
  @media (max-width: 1050px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #444;
    font-size: 1em;

    /* Description Cell */
    &:first-child {
        display: block;
        text-align: left;
        padding: 15px;
        background-color: #222;
        border-bottom: 2px solid #444;
        width: 100%;
        
        strong {
             font-size: 1.3em;
             margin-bottom: 5px;
        }
    }

    /* Status/Availability Cells */
    &.status-cell {
      background-color: #303030;
      margin-bottom: 1px;
      font-size: 1.2em;
      
      /* The ::before pseudo-element becomes the Label */
      &:before {
        content: attr(data-series-name);
        font-weight: 600;
        color: #bbb;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Only show the icon (the actual cell content) */
      span { display: none; }
      
      /* Put the icon at the end of the flex container */
      & > * { 
          font-size: 1.4em;
          color: inherit;
      }
    }
    
    /* Alternating background for status rows on mobile for readability */
    &.status-cell:nth-child(even) {
        background-color: #2a2a2a;
    }
    
    /* Remove last border on mobile */
    &:last-child {
        border-bottom: none;
    }
  }
`;

const FunctionDescriptionDetails = styled.div`
    font-size: 0.95em;
    color: #ccc;
    margin-top: 5px;
`;


// --- Data Processing Hook ---
const useExitDeviceData = (deviceData, functionDescriptions, Images) => {
    return useMemo(() => {
        const uniqueFunctions = {};
        const deviceColumns = [];
        const deviceMap = {};

        // 1. Collect all unique devices (columns)
        deviceData.forEach(series => {
            series.devices.forEach(device => {
                // Extract just the series number/identifier (e.g., "8300" from "8300 - Narrow Stile...")
                const rawName = device.name.replace(/<[^>]*>?/gm, '').trim();
                const deviceIdentifierMatch = rawName.match(/^([A-Z]*\d{4})|([A-Z]*\d{2})|(\d{4})/);
                const shortName = deviceIdentifierMatch ? deviceIdentifierMatch[0].trim() : rawName;

                // Use the full name as the key for the map
                const mapKey = rawName; 
                
                // Determine the key for the main device image
                const imageKey = Object.keys(Images).find(key => Images[key] === device.image);
                let image;
                if (imageKey && Images[imageKey]) {
                    image = Images[imageKey];
                } else {
                    image = Images.placeholder;
                }

                if (!deviceMap[mapKey]) {
                    deviceMap[mapKey] = { 
                        name: rawName,
                        shortName: shortName, // The short name for the header
                        seriesName: series.series,
                        image: image
                    };
                    deviceColumns.push(deviceMap[mapKey]);
                }

                // 2. Collect all unique functions (rows) and map their availability
                const functionsString = device.functions;
                if (functionsString) {
                    const codes = functionsString.split(',').map(s => s.trim()).filter(s => s);
                    
                    codes.forEach(code => {
                        if (!uniqueFunctions[code]) {
                            uniqueFunctions[code] = {
                                code: code,
                                description: functionDescriptions[code] || 'Description not found.',
                                availability: {},
                                image: null 
                            };
                        }
                        uniqueFunctions[code].availability[mapKey] = true;
                    });
                }
            });
        });
        
        // Sort device columns by short name for a cleaner table order
        deviceColumns.sort((a, b) => a.shortName.localeCompare(b.shortName));

        // 3. Convert functions map to a sorted array
        const functionsRows = Object.values(uniqueFunctions).sort((a, b) => {
            // Sort primarily by code numerically, then alphabetically if codes are mixed
            const codeA = a.code;
            const codeB = b.code;
            const numA = parseInt(codeA, 10);
            const numB = parseInt(codeB, 10);
            
            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB;
            } else {
                 return codeA.localeCompare(codeB);
            }
        });

        return { deviceColumns, functionsRows };
    }, [deviceData, functionDescriptions, Images]);
};

// --- Component Definition ---

function ExitDeviceTable() {
    const { deviceColumns, functionsRows } = useExitDeviceData(deviceData, functionDescriptions, Images);
    const [lightboxImage, setLightboxImage] = useState(null);

    // This data structure is complex, so we ensure we have data
    if (!deviceColumns || deviceColumns.length === 0) {
      return (
          <TableContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Header>Sargent Exit Devices</Header>
              <p style={{ textAlign: 'center', color: '#ccc' }}>No device data available for display.</p>
          </TableContainer>
      );
    }

    return (
        <>
        <TableContainer
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
        > 
            <Header>Sargent Exit Devices - Function Availability</Header>
            
            <TableWrapper>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>
                                <span>Function & Description</span>
                            </StyledTh>
                            {/* Use shortName for header, full name for mobile label */}
                            {deviceColumns.map((device) => (
                                <StyledTh key={device.name}>
                                    <span>{device.shortName}</span>
                                    <StyledThImage
                                        src={device.image || Images.placeholder}
                                        alt={device.name}
                                        onClick={() => setLightboxImage(device.image || Images.placeholder)}
                                        onError={(e) => { e.target.src = Images.placeholder; }}
                                    />
                                </StyledTh>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {functionsRows.map((func, index) => (
                            <StyledTableRow key={index}>
                                {/* 1. Description Column (Function Code & Text) */}
                                <StyledTd>
                                    <strong>{func.code}</strong>
                                    <FunctionDescriptionDetails 
                                        dangerouslySetInnerHTML={{ __html: func.description }} 
                                    />
                                </StyledTd>
                                
                                {/* 2. Availability Columns */}
                                {deviceColumns.map((device) => {
                                    // Use the full name (the map key) to check availability
                                    const isAvailable = func.availability[device.name]; 
                                    const icon = isAvailable ? '✓' : 'x'; 
                                    const className = isAvailable ? 'status-cell' : 'status-cell unavailable';
                                    
                                    return (
                                        <StyledTd 
                                            key={`${func.code}-${device.name}`} 
                                            className={className}
                                            data-series-name={device.shortName} // Use short name for Mobile Label
                                        >
                                            <span>{icon}</span>
                                        </StyledTd>
                                    );
                                })}
                            </StyledTableRow>
                        ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </TableContainer>
        
        {/* Lightbox for Device Images */}
        {lightboxImage && (
            <div
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer', backdropFilter: 'blur(5px)'
                }}
                onClick={() => setLightboxImage(null)}
            >
                <img 
                    src={lightboxImage} 
                    alt="Enlarged view"
                    style={{
                        maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
                    }}
                />
            </div>
        )}
        </>
    );
}

export default ExitDeviceTable;