// src/components/LockTable.js
import React, { useState } from 'react';
import styled from 'styled-components';

// --- Reusable Styled Components ---

const TableContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
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
  max-height: calc(100vh - 200px); 
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
  @media (max-width: 900px) {
    max-height: none;
    overflow-y: visible;
    background-color: transparent;
    box-shadow: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; 
  border-spacing: 0;
  margin: 0; 

  @media (max-width: 900px) {
      display: block; /* Stack for mobile */
      
      thead {
          display: none; /* Hide traditional header on mobile */
      }
      tbody { 
          display: block; 
      }
  }
`;

const StyledTh = styled.th`
  background: #1e1e1e;
  padding: 15px 10px;
  font-weight: 600;
  color: #FFEB3B;
  text-align: center;
  font-size: 1em;
  border-bottom: 2px solid #444; 
  text-transform: uppercase;
  
  /* Sticky Header for Desktop */
  position: sticky;
  top: 0;
  z-index: 20;
  
  &:first-child {
      border-radius: 8px 0 0 0;
      width: 10%;
  }
  &:nth-child(2) {
      text-align: left;
      width: 40%; 
      padding-left: 20px;
  }
  &:last-child {
      border-radius: 0 8px 0 0;
  }
`;

const StyledTableRow = styled.tr`
  background-color: #2a2a2a; 
  transition: background-color 0.2s ease;
  
  /* Desktop Hover */
  &:hover {
    background-color: #333;
  }

  /* --- Mobile Card Style --- */
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #444;
    border-radius: 12px;
    overflow: hidden; /* Clip inner corners */
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    background-color: #2a2a2a;
  }
`;

const StyledTd = styled.td`
  white-space: pre-line;
  padding: 15px 10px; 
  text-align: center;
  color: white;
  font-size: 1.05em;
  line-height: 1.5;
  vertical-align: middle;
  border-bottom: 1px solid #333;

  /* Function Description Column (Desktop) */
  &:nth-child(2) { 
    text-align: left;
    color: #ccc;
    padding-left: 20px;
    
    strong {
        color: #FFEB3B; 
        font-size: 1.1em;
        font-weight: 600;
    }
  }

  /* Status Icons (Desktop) */
  &.status-cell {
    font-size: 1.4em;
    font-weight: 700;
    color: #4CAF50; /* Bright Green */
  }
  &.status-cell.unavailable {
    font-size: 1.4em;
    color: #ff0000ff; /* Dimmed for X */
    font-weight: 400;
  }

  /* --- Mobile View Adjustments --- */
  @media (max-width: 900px) {
    display: block;
    text-align: left;
    padding: 15px;
    border-bottom: 1px solid #444;

    /* 1. Image Cell */
    &:first-child {
        display: flex;
        justify-content: center;
        background-color: #222;
        padding: 20px;
        border-bottom: 1px solid #444;
    }

    /* 2. Description Cell */
    &:nth-child(2) {
        padding: 20px 15px;
        font-size: 1.1em;
        color: #e0e0e0;
        
        strong {
            display: block;
            margin-bottom: 8px;
            font-size: 1.3em; /* Larger title on mobile */
        }
    }

    /* 3. Status/Availability Cells */
    &.status-cell {
      display: flex; /* Enable Flexbox */
      justify-content: space-between; /* Push Label Left, Check Right */
      align-items: center;
      padding: 12px 15px;
      background-color: #303030; /* Slightly lighter row bg */
      margin-bottom: 1px; /* Tiny gap for zebra look */
      border-bottom: none;
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
    }
    
    /* Alternating background for status rows on mobile for readability */
    &.status-cell:nth-child(odd) {
        background-color: #2a2a2a;
    }
  }
`;

const FunctionImage = styled.img`
  max-width: 100px; /* Larger on mobile */
  max-height: 100px;
  display: block;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.5);
  background-color: #444;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
      transform: scale(1.05);
  }
`;

// --- Component Definition ---

function LockTable({ title, seriesData, functionsData }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!seriesData || !functionsData || seriesData.length === 0) {
      return (
          <TableContainer>
              <Header>{title}</Header>
              <p style={{ textAlign: 'center', color: '#ccc' }}>No function data available.</p>
          </TableContainer>
      );
  }
  
  return (
    <>
      <TableContainer> 
        <Header>{title} Functions</Header>
        
        <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Image</StyledTh>
                  <StyledTh>Function Description</StyledTh>
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
                    <StyledTd>
                        {func.image ? (
                            <FunctionImage 
                                src={func.image} 
                                alt={`${func.code} function`} 
                                onClick={() => setLightboxImage(func.image)}
                            />
                        ) : (
                            <span style={{color: '#666', fontStyle: 'italic', fontSize: '0.9em'}}>No Image</span>
                        )}
                    </StyledTd>

                    {/* 2. Description Column */}
                    <StyledTd>
                        <strong>{func.code}</strong>
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: func.description }} />
                    </StyledTd>
                    
                    {/* 3. Availability Columns */}
                    {seriesData.map((series) => {
                      const isAvailable = func.availability[series.code];
                      // Use checkmark or X
                      const icon = isAvailable ? '✓' : 'x'; 
                      const className = isAvailable ? 'status-cell' : 'status-cell unavailable';
                      
                      return (
                        <StyledTd 
                          key={`${func.code}-${series.code}`} 
                          className={className}
                          data-series-name={series.name} // Used for Mobile Label
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
      
      {/* Lightbox */}
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

export default LockTable;