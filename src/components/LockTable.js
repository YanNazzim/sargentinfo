// src/components/LockTable.js
import React, { useState } from 'react';
import styled from 'styled-components';
// Removed 'motion' import since it was interfering with sticky position on the viewport
// import { motion } from 'framer-motion'; 

// --- Reusable Styled Components ---

const TableContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h2`
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  color: #fff;
  margin-bottom: 25px;
`;

// NEW WRAPPER for internal scrolling
const TableWrapper = styled.div`
  /* Calculate max height to fit content nicely on the screen */
  max-height: calc(100vh - 200px); 
  overflow-y: auto;
  
  /* Style the scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #1e1e1e;
  }
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  /* Ensures the sticky header aligns correctly */
  border-radius: 8px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const StyledTable = styled.table`
  width: 100%;
  /* Important: collapse ensures sticky headers work within the wrapper */
  border-collapse: collapse; 
  border-spacing: 0;
  margin: 0; 
  box-shadow: none; 

  @media (max-width: 900px) {
      display: block;
      /* Remove border-spacing from the desktop style */
      border-spacing: 0 10px; 
      
      thead {
          tr {
              display: none;
          }
      }
      tbody { display: block; }
  }
`;

const StyledTh = styled.th`
  background: #1e1e1e;
  padding: 15px 5px;
  font-weight: 600;
  color: #FFEB3B;
  text-align: center;
  font-size: 1em;
  border-bottom: 2px solid #444; 
  text-transform: uppercase;
  
  /* --- STICKY HEADER STYLES --- */
  position: sticky;
  top: 0; /* Sticks to the top of the TableWrapper */
  z-index: 20; /* Ensures header is above scrolling body content */
  /* --- END STICKY HEADER STYLES --- */
  
  /* Apply border radius to the top corners of the sticky header */
  &:first-child {
      border-radius: 8px 0 0 0;
      text-align: center;
      width: 10%;
      padding-left: 10px;
  }
  &:nth-child(2) {
      text-align: left;
      width: 45%; 
      padding-left: 20px;
      border-radius: 0;
  }
  &:last-child {
      border-radius: 0 8px 0 0;
      padding-right: 20px;
  }
`;

const StyledTableRow = styled.tr`
  /* Set background and shadow on the row block */
  background-color: #2a2a2a; 
  /* Use separate spacing for rows when displayed as block on mobile */
  margin: 10px 0; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    background-color: #333;
    transform: translateY(-3px); 
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
`;

const StyledTd = styled.td`
  white-space: pre-line;
  padding: 15px 5px; 
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 1.05em;
  line-height: 1.5;
  border-bottom: none;
  vertical-align: middle;

  /* Style for Status Icons (Checkmark/X) */
  &.status-cell {
    font-size: 1.2em;
    font-weight: 700;
    color: #4CAF50; 
  }
  &.status-cell.unavailable {
    color: #FF5252; 
  }

  /* Specific column styles */
  &:first-child { 
    border-radius: 10px 0 0 10px;
    padding: 5px 10px;
  }
  &:nth-child(2) { 
    text-align: left;
    font-size: 0.95em;
    color: #ccc;
    
    strong {
        color: #FFEB3B; 
        font-size: 1.1em;
        font-weight: 600;
        margin-right: 5px;
    }
  }
  
  &:last-child {
    border-radius: 0 10px 10px 0;
    padding-right: 20px;
  }

  /* Mobile/Tablet View */
  @media (max-width: 900px) {
    /* Removed redundant border radius resets here, relying on TR styles */
    display: block;
    text-align: right;
    padding: 8px 15px; 
    padding-left: 55%; 
    border-radius: 0 !important;

    &:before {
      content: attr(data-label);
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
      color: #bdbdbd;
      width: 40%;
      text-align: left;
    }
    
    /* Image Column on Mobile */
    &:first-child { 
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        transform: none;
        &:before { content: "Image"; display: none; }
    }
    /* Function Column on Mobile */
    &:nth-child(2) {
        text-align: left;
        padding-left: 15px;
        padding-right: 15px;
        transform: none;
        &:before { content: "Function"; display: none; }
        border-bottom: 1px dashed #444; 
        margin-bottom: 5px;
        padding-bottom: 15px;
    }
    
    /* Availability columns on mobile */
    &.status-cell {
      padding-left: 15px;
      padding-right: 15px;
      text-align: right;
      
      &:before {
          content: attr(data-series-name);
          transform: translateY(-50%);
          width: auto;
      }
    }
  }
`;

const FunctionImage = styled.img`
  max-width: 80px;
  max-height: 80px;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  background-color: #3a3a3a;
`;

// --- LockTable Component Definition ---

function LockTable({ title, seriesData, functionsData }) {
    
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!seriesData || !functionsData || seriesData.length === 0) {
      return (
          <TableContainer>
              <Header>{title}</Header>
              <p style={{ textAlign: 'center', color: '#ccc' }}>No function data is currently available for {title}.</p>
          </TableContainer>
      );
  }
  
  return (
    <>
      {/* MODIFIED: Removed motion props */}
      <TableContainer> 
        <Header>{title} Functions</Header>
        
        {/* NEW Wrapper for internal scrolling */}
        <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Image</StyledTh>
                  <StyledTh>Function</StyledTh>
                  {seriesData.map((series) => (
                    <StyledTh key={series.code}>
                      <a 
                          href={series.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: '#FFEB3B', textDecoration: 'none' }}
                      >
                          {series.name}
                      </a>
                    </StyledTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {functionsData.map((func, index) => (
                  <StyledTableRow key={index}>
                    {/* 1. Image Column */}
                    <StyledTd data-label="Image">
                        {func.image ? (
                            <FunctionImage 
                                src={func.image} 
                                alt={`${func.code} function`} 
                                onClick={() => setLightboxImage(func.image)}
                            />
                        ) : (
                            <span style={{color: '#777', fontStyle: 'italic', fontSize: '0.9em'}}>N/A</span>
                        )}
                    </StyledTd>

                    {/* 2. Combined Code - Description Column */}
                    <StyledTd data-label="Function">
                        {/* FIX: Render the code separately as a React element */}
                        <strong>{func.code}</strong>
                        {" - "}
                        {/* FIX: Render the description using dangerouslySetInnerHTML */}
                        <span dangerouslySetInnerHTML={{ __html: func.description }} />
                    </StyledTd>
                    
                    {/* 3+. Availability Columns */}
                    {seriesData.map((series) => {
                      const isAvailable = func.availability[series.code];
                      const icon = isAvailable ? '✓' : '✗';
                      const className = isAvailable ? 'status-cell' : 'status-cell unavailable';
                      
                      return (
                        <StyledTd 
                          key={`${func.code}-${series.code}`} 
                          className={className}
                          data-series-name={series.name}
                        >
                          {icon}
                        </StyledTd>
                      );
                    })}
                  </StyledTableRow>
                ))}
              </tbody>
            </StyledTable>
        </TableWrapper>
      </TableContainer>
      
      {/* Simple Lightbox for Images */}
      {lightboxImage && (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2000,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: 'pointer'
            }}
            onClick={() => setLightboxImage(null)}
        >
            <img 
                src={lightboxImage} 
                alt="Enlarged view of lock function"
                style={{
                    maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
                }}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
      )}
    </>
  );
}

export default LockTable;