import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    /* Stacked layout for mobile */
    display: block;

    thead {
      display: none; /* Hide the table header */
    }

    tbody {
      display: block;

      tr {
        display: block;
        margin-bottom: 10px; /* Spacing between "rows" */
        border-bottom: 1px solid #333;
      }

      td {
        display: block;
        text-align: left;
        padding: 8px;
        border: none;
        position: relative;
        padding-left: 50%; /* Make space for the data-label */
        white-space: normal;
        word-wrap: break-word;

        &:before {
          /* Add a data-label */
          content: attr(data-label);
          position: absolute;
          left: 6px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
`;

const StyledTd = styled.td`
  white-space: pre-line;
  padding: 12px;
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 1em;
  line-height: 1.4;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    /* Set the data-label attribute for mobile */
    &:nth-of-type(1):before {
      content: "Device";
    }
    &:nth-of-type(2):before {
      content: "Functions Available";
    }
    &:nth-of-type(3):before {
      content: "Image";
    }
    &:nth-of-type(4):before {
      content: "Link";
    }
  }
`;

const StyledTh = styled.th`
  background: linear-gradient(to bottom, #333, #2a2a2a);
  padding: 15px;
  font-weight: 600;
  border-bottom: 2px solid #444;
  color: white;
  text-align: Center;
  font-size: 1.1em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  display: block;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    transition: background-color 0.2s ease-in-out;
  }
`;

function DeviceTable({ devices }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>Device</StyledTh>
          <StyledTh>Functions Available</StyledTh>
          <StyledTh>Image</StyledTh>
          <StyledTh>Link</StyledTh>
        </tr>
      </thead>
      <tbody>
        {devices.map((device, index) => (
          <StyledTableRow key={index}>
            <StyledTd data-label="Device">
              <span dangerouslySetInnerHTML={{ __html: device.name }} />
            </StyledTd>
            <StyledTd data-label="Functions Available">
              <span dangerouslySetInnerHTML={{ __html: device.functions }} />
            </StyledTd>
            <StyledTd data-label="Image">
              <StyledImage src={device.image} alt={device.name} />
            </StyledTd>
            <StyledTd data-label="Link">
              {device.link && (
                <a
                  href={device.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Catalog Link
                </a>
              )}
            </StyledTd>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default DeviceTable;