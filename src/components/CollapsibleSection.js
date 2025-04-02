// components/CollapsibleSection.js
import React, { useState } from 'react';
import styled from 'styled-components'; // Or use CSS classes

// Inside components/CollapsibleSection.js

const SectionHeader = styled.button`
  /* --- Style Updates --- */
  background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%); // Subtle gradient
  color: #e0e0e0; // Light text color
  border: 1px solid #555;
  border-radius: 8px; // Rounded corners for the box effect
  padding: 12px 20px; // Adjust padding as needed
  width: 100%;
  text-align: center; // Center the text
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; // Modern font stack (adjust as needed)
  font-weight: 600; // Slightly bolder
  font-size: 1.15em; // Slightly larger font
  cursor: pointer;
  outline: none;
  margin-top: 15px; // Space above each header
  margin-bottom: 0; // Remove bottom margin as content attaches below
  display: flex; // Use flexbox for alignment
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);

  &:hover {
    background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%); // Slightly lighter on hover
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  /* Position the arrow - adjust if needed */
  span.arrow {
      margin-left: 10px; // Space between text and arrow
      font-size: 0.8em; // Make arrow slightly smaller
  }
`;

// --- Update the CollapsibleSection component usage of the header ---
function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Add a span for the arrow to style it separately if needed */}
      <SectionHeader onClick={toggleOpen}>
        {title}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </SectionHeader>
      {/* Keep SectionContent as is or adjust as needed */}
      <SectionContent isOpen={isOpen}>
        {children}
      </SectionContent>
    </div>
  );
}

// Keep the SectionContent styled component as well
const SectionContent = styled.div`
  background-color: #2a2a2a;
  /* Remove top border if the header provides the top edge visual */
  border: 1px solid #555;
  border-top: none;
  /* Connect visually with the header */
  border-radius: 0 0 8px 8px; // Round only bottom corners
  padding: 0; // Remove padding if PrefixGrid handles it
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-bottom: 10px; // Add space below the content when open
  overflow: hidden; // Ensure content respects border radius
`;


export default CollapsibleSection;