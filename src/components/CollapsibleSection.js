// components/CollapsibleSection.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import styled from 'styled-components';

// --- Keep your existing styled components ---
const SectionHeader = styled.button`
  /* ... Your existing styles ... */
  background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
  color: #e0e0e0;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 12px 20px;
  width: 100%;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  font-size: 1.15em;
  cursor: pointer;
  outline: none;
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);

  &:hover {
    background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  span.arrow {
      margin-left: 10px;
      font-size: 0.8em;
  }
`;

const SectionContent = styled.div`
  /* ... Your existing styles ... */
  background-color: #2a2a2a;
  border: 1px solid #555;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 0; /* Assuming PrefixGrid handles padding */
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-bottom: 10px;
  overflow: hidden;
`;
// --- End Styled Components ---

// --- Updated CollapsibleSection Logic ---
function CollapsibleSection({ title, children, isOpen: controlledIsOpen }) {
  // Local state always tracks the manual open/close intention
  const [isLocalOpen, setIsLocalOpen] = useState(false);

  // Effect to synchronize *only when the parent forces it open*
  useEffect(() => {
    // When controlledIsOpen becomes true (search starts), force the local state to open.
    if (controlledIsOpen === true) {
      setIsLocalOpen(true);
    }
    // NOTE: We DON'T force it closed here when controlledIsOpen becomes false.
    // This allows the section to remain open if the user manually opened it before searching,
    // or if they manually close it DURING a search.
  }, [controlledIsOpen]); // This effect runs only when controlledIsOpen changes

  // The click handler *always* toggles the local state
  const toggleOpen = () => {
    setIsLocalOpen(prevOpen => !prevOpen);
  };

  // Determine the actual display state:
  // If the parent is forcing it open (search is active), it MUST be open.
  // Otherwise (no search active), rely purely on the user's manual toggle (isLocalOpen).
  const displayIsOpen = controlledIsOpen === true ? true : isLocalOpen;

  return (
    <div>
      {/* Click always runs the toggle function affecting local state */}
      <SectionHeader onClick={toggleOpen}>
        {title}
        {/* Arrow display reflects the actual calculated display state */}
        <span className="arrow">{displayIsOpen ? '▲' : '▼'}</span>
      </SectionHeader>
      {/* Content visibility reflects the actual calculated display state */}
      <SectionContent isOpen={displayIsOpen}>
        {children}
      </SectionContent>
    </div>
  );
}

export default CollapsibleSection;