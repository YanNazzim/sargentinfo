import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components (Minimalist List Style) ---

const Container = styled(motion.div)`
  padding: 30px;
  background-color: #121212;
  color: #e0e0e0;
  min-height: calc(100vh - 60px); 
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  padding-top: 15px;
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
`;

const SystemGroup = styled.div`
  background-color: #1e1e1e;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const SystemTitle = styled.h2`
  color: #FFEB3B; /* Accent Color */
  font-size: 1.8em;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const PrefixList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
  margin: 0;
`;

const PrefixListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px dashed #333;
  line-height: 1.6;
  display: flex; /* Use flex to align code and text */
  align-items: baseline;
  
  &:last-child {
      border-bottom: none;
  }

  strong {
      color: #fff;
      font-size: 1.1em;
      display: inline-block;
      min-width: 120px; /* Aligns description text */
      font-weight: 600;
  }

  span {
      color: #ccc;
  }

  /* Optional: Mobile styling to ensure readability */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
    
    strong {
        min-width: unset;
        margin-bottom: 5px;
        color: #FFEB3B; 
        font-size: 1.2em;
    }
  }
`;


// --- REVISED Data Structure: Compiled from Page 75 of 80 Series Catalog ---

const keySystemData = [
  // --- Conventional / Schlage Keyways / Security Options (Based on p. 75) ---
  {
    title: "Conventional & Compatible Cylinder Options",
    details: [
      { prefix: "LC-", text: "Less Cylinder - SARGENT supplies standard blocking rings for 1-1/8\" Cylinders (For longer cylinders order collars/rings separately)" }, //
      { prefix: "BR-", text: "Bump Resistant Cylinder (Available with Conventional & Conventional XC Cylinders Only)" }, //
      { prefix: "SC-", text: "Schlage C keyway cylinder, 0 bitted (not available with: 8904, 8916, 8944, 8975, 8976, 8866, 8304, 8344, 8375 & 8376)" }, //
      { prefix: "SE-", text: "Schlage E keyway cylinder, 0 bitted (not available with: 8904, 8916, 8944, 8975, 8976, 8866, 8304, 8344, 8375 & 8376)" }, //
      { prefix: "SF-", text: "L Lever to accept Schlage large format interchangable core (supplied less core, tailpiece included)" }, //
      { prefix: "21-", text: "SARGENT Lost Ball Construction Keying for Conventional, XC and Signature Series (N/A with 63- or 73-)" }, //
      { prefix: "22-", text: "SARGENT Construction Split Key System for Conventional Cylinders (Existing Systems Only) (N/A with 10-, 11-, 63-or 73-)" }, //
      { prefix: "51-", text: "Removable Core Cylinder (Old Style) provided (existing systems only)" }, //
      { prefix: "52-", text: "Removable Construction Core (Old Style) Permanent core ordered separately (existing systems only)" }, //
    ]
  },
  
  // --- Signature Key System (10-) (Based on p. 75) ---
  {
    title: "SARGENT Signature® Key System (10-)",
    details: [
      { prefix: "10-", text: "SARGENT Signature Key System (Not Available with other Key Systems)" }, //
      { prefix: "10-21-", text: "SARGENT Signature Construction Key System (Lost Ball)" }, //
      { prefix: "10-63-", text: "SARGENT Signature Large Format Interchangeable Core Cylinder (Removable)" }, //
    ]
  },
  
  // --- XC Key System (11-) - Includes LFIC and SFIC Options (Based on p. 75) ---
  {
    title: "SARGENT XC® Key System (11-)",
    details: [
      // XC Conventional & Lost Ball
      { prefix: "11-", text: "XC Key System (Not available with other Key systems unless specified)" }, //
      { prefix: "11-21-", text: "XC-Construction Key System (Lost Ball)" }, //
      // XC Large Format IC (LFIC)
      { prefix: "11-60-", text: "Device to accept XC- Permanent Large Format Interchangeable Core, Disposable plastic Core- provided" }, //
      { prefix: "11-63-", text: "Device provided with XC-Large Format Interchangeable Core Cylinder - (Includes masterkeying, grand masterkeying)" }, //
      { prefix: "11-64-", text: "Device provided with Keyed construction core to accept XC- Permanent Large Format Interchangeable Core (ordered separately)" }, //
      // XC Small Format IC (SFIC)
      { prefix: "11-70-7P-", text: "Device to accept XC-SFIC (7-Pin) XC-Permanent Cores, plastic disposable core provided" }, //
      { prefix: "11-72-7P-", text: "Device to accept XC-SFIC (7-Pin Keyed Construction Core provided) cylinder Permanent core ordered separately" }, //
      { prefix: "11-73-7P-", text: "Device provided with XC- Small Format 7-Pin interchangeable core (Includes masterkeying, grand masterkeying)" }, //
      { prefix: "11-65-73-7P-", text: "Device provided to accept XC-Uncombinated 7-Pin SFIC (Permanent) Core - (Packed Loose)" }, //
    ]
  },
  
  // --- Degree Key System (DG) (Based on p. 75) ---
  {
    title: "SARGENT Degree® Key System (DG)",
    details: [
      { prefix: "DG1-", text: "SARGENT Degree Key System Level 1 (bump resistant with patented keys)" }, //
      { prefix: "DG1-21-", text: "Degree Level 1 Construction Master Keying" }, //
      { prefix: "DG1-60-", text: "Degree Level 1 Removable Disposable Construction Core" }, //
      { prefix: "DG1-63-", text: "Degree Level 1 Removable Core" }, //
      { prefix: "DG1-64-", text: "Degree Level 1 Removable Construction Keyed LFIC" }, //
      { prefix: "DG1-65-", text: "Degree Level 1 Unassembled/Uncombined Core" }, //
      { prefix: "DG2-", text: "SARGENT Degree Key System Level 2 (geographically exclusive; bump and pick resistant)" }, //
      { prefix: "DG2-21-", text: "Degree Level 2 Construction Master Keying" }, //
      { prefix: "DG2-60-", text: "Degree Level 2 Removable Disposable Construction Core" }, //
      { prefix: "DG2-63-", text: "Degree Level 2 Removable Core" }, //
      { prefix: "DG2-64-", text: "Degree Level 2 Removable Construction Keyed LFIC" }, //
      { prefix: "DG2-65-", text: "Degree Level 2 Unassembled/Uncombined Core" }, //
      { prefix: "DG3-", text: "SARGENT Degree Key System Level 3 (geographically exclusive; UL437 certified; bump and pick resistant)" }, //
      { prefix: "DG3-21-", text: "Degree Level 3 Construction Master Keying" }, //
      { prefix: "DG3-60-", text: "Degree Level 3 Removable Disposable Construction Core" }, //
      { prefix: "DG3-63-", text: "Degree Level 3 Removable Core" }, //
      { prefix: "DG3-64-", text: "Degree Level 3 Removable Construction Keyed LFIC" }, //
      { prefix: "DG3-65", text: "Degree Level 3 Unassembled/Uncombined Core" }, //
    ]
  },
  
  // --- SARGENT Standard Interchangeable Cores (Based on p. 75) ---
  {
    title: "SARGENT Standard LFIC and SFIC (Non-Patented)",
    details: [
      // Large Format IC (LFIC)
      { prefix: "60-", text: "Device to accept SARGENT Permanent Large Format Interchangeable Core, Disposable plastic Core provided (Permanent Cores ordered separately)" }, //
      { prefix: "63-", text: "Device provided with Large Format Interchangeable Core Cylinder- (Includes masterkeying, grand masterkeying)" }, //
      { prefix: "64-", text: "Device provided with Keyed construction core to accept Permanent Large Format Interchangeable Core (ordered separately)" }, //
      // Small Format IC (SFIC)
      { prefix: "70-", text: "Device to accept 6 or 7-Pin SFIC Permanent Cores, plastic disposable core provided" }, //
      { prefix: "72-", text: "Device to accept 6- or 7-Pin SFIC (6-Pin Keyed Construction Core provided) Cylinder (Permanent Core ordered separately)" }, //
      { prefix: "73-", text: "Device provided with 6-Pin SFIC (Includes masterkeying, grand masterkeying)" }, //
      { prefix: "73-7P-", text: "Device provided with Small Format 7-Pin Interchangeable Core (Includes masterkeying, grand masterkeying)" }, //
      { prefix: "65-73-", text: "Device provided to accept Uncombinated 6-Pin SFIC (Permanent) Core - (Packed Loose for field keying)" }, //
      { prefix: "65-73-7P-", text: "Device provided to accept Uncombinated 7-Pin SFIC (Permanent) Core - (Packed Loose for field keying)" }, //
    ]
  },
  
  // --- KESO Security Systems (Based on p. 75) ---
  {
    title: "KESO / KESO F1 Security Systems",
    details: [
      { prefix: "81-", text: "Device provided with housings to accept Keso (83) & Keso F1 (F1-83-) removable cores. (Permanent Cores ordered separately)" }, //
      { prefix: "82-", text: "Device provided with SARGENT Keso Security Cylinder" }, //
      { prefix: "F1-82-", text: "Device provided with SARGENT Keso F1 Security Cylinder (Patented)" }, //
      { prefix: "83-", text: "Device provided with SARGENT Keso Security Removable Core cylinder" }, //
      { prefix: "F1-83-", text: "Device provided with SARGENT Keso F1 Security Removable Core cylinder (Patented)" }, //
      { prefix: "84-", text: "Device provided with SARGENT Keso Construction Cores (Permanent Cores ordered separately)" }, //
    ]
  },
];


function KeySystems() {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>SARGENT Cylinder Key Systems & Options</Header>
      <p style={{textAlign: 'center', margin: '-15px 0 20px', color: '#bdbdbd'}}>All prefix codes related to keying and cylinder preparation, compiled from the 80 Series Catalog.</p>

      {keySystemData.map((system, index) => (
        <SystemGroup key={index}>
          <SystemTitle>{system.title}</SystemTitle>
          
          <PrefixList>
            {system.details.map((detail, dIndex) => (
              <PrefixListItem key={dIndex}>
                <strong>{detail.prefix}</strong>
                <span>{detail.text}</span>
              </PrefixListItem>
            ))}
          </PrefixList>

        </SystemGroup>
      ))}
    </Container>
  );
}

export default KeySystems;