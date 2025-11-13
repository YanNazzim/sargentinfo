import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Images } from "./images";

// --- Styled Components ---

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

const SystemSection = styled.section`
  background-color: #1e1e1e;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  &:nth-child(even) {
      background-color: #2a2a2a;
  }
`;

const SystemTitle = styled.h2`
  color: #FFEB3B; /* Accent Color */
  font-size: 1.8em;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 15px;
`;

const SystemContent = styled.div`
    display: flex;
    gap: 30px;
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const SystemImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  min-width: 150px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  background-color: #333;
  object-fit: contain;

  @media (max-width: 768px) {
      margin-bottom: 15px;
  }
`;

const SystemDetails = styled.div`
  flex-grow: 1;
  p {
    line-height: 1.6;
    margin-bottom: 15px;
  }
  ul {
    padding-left: 20px;
  }
  li {
    margin-bottom: 5px;
    color: #ccc;
    text-align: left;
  }
  strong {
      color: #fff;
  }
`;


// --- Data Structure for Systems (Using existing prefix info) ---

const keySystemData = [
  {
    title: "KESO / KESO F1 Security Systems",
    image: Images.prefix82 || Images.placeholder,
    description: "KESO is a high-security key system offering maximum protection against picking, drilling, and unauthorized duplication. KESO F1 is the patented, next-generation version.",
    details: [
      { prefix: "81", label: "Prep for Keso/Keso F1 Core:", text: "Device supplied with housings to accept Keso (83) & Keso F1 (F1-83) removable cores (Cores ordered separately)." },
      { prefix: "82", label: "Keso Cylinder Supplied:", text: "Device supplied with SARGENT Keso Security Cylinder (Conventional)." },
      { prefix: "F1-82", label: "Keso F1 Cylinder Supplied:", text: "Device supplied with SARGENT Keso F1 Security Cylinder (Patented)." },
      { prefix: "83", label: "Keso Removable Core Supplied:", text: "Device supplied with SARGENT Keso Security Removable Core cylinder." },
      { prefix: "F1-83", label: "Keso F1 Removable Core Supplied:", text: "Device supplied with SARGENT Keso F1 Security Removable Core cylinder (Patented)." },
      { prefix: "84", label: "Keso Construction Core:", text: "Device supplied with Keso Construction Cores (Permanent Cores ordered separately)." },
    ]
  },
  {
    title: "SARGENT Degree® Key System",
    image: Images.prefixDG1 || Images.placeholder,
    description: "Degree is a patented key system designed for multiple layers of control and security, ensuring bump and pick resistance across three distinct security levels.",
    details: [
      { prefix: "DG1", label: "Degree Level 1:", text: "Bump resistant, patented keys (not geographically exclusive)." },
      { prefix: "DG2", label: "Degree Level 2:", text: "Geographically exclusive, bump/pick resistant for heightened security." },
      { prefix: "DG3", label: "Degree Level 3:", text: "UL437 certified, geographically exclusive, bump/pick resistant (highest level)." },
    ]
  },
  {
    title: "SARGENT XC® Key System",
    image: Images.prefix11 || Images.placeholder,
    description: "The XC Key System is an advanced conventional system known for its superior key control and resistance to unauthorized duplication, offering a step up from standard conventional keyways.",
    details: [
      { prefix: "11", label: "XC Key System:", text: "Device supplied with XC Key System conventional cylinders." },
    ]
  },
  {
    title: "SARGENT Signature® Key System",
    image: Images.prefix10 || Images.placeholder,
    description: "The Signature system provides patented key control and is specifically designed to work within existing SARGENT hardware, making it a reliable choice for new and retrofit applications.",
    details: [
      { prefix: "10", label: "Signature Key System:", text: "Device supplied with Signature Key System conventional cylinders." },
    ]
  },
  {
    title: "Large Format Interchangeable Core (LFIC)",
    image: Images.prefix63 || Images.placeholder,
    description: "LFIC cylinders allow the core to be easily removed and replaced using a special control key, making re-keying fast and simple without disassembling the lock hardware.",
    details: [
      { prefix: "60", label: "Prep for LFIC (Plastic Core):", text: "Device prepped for LFIC, supplied with disposable plastic core for construction phase." },
      { prefix: "63", label: "LFIC Cylinder Supplied:", text: "Device supplied with a permanent, keyed LFIC cylinder (includes masterkeying)." },
      { prefix: "64", label: "Prep for LFIC (Construction Core):", text: "Device supplied with a keyed construction core; permanent LFIC is ordered separately." },
      { prefix: "65", label: "LFIC Core (Uncombinated):", text: "Device supplied with an unassembled core for field rekeying (used with DG1/DG2/DG3)." },
    ]
  },
  {
    title: "Small Format Interchangeable Core (SFIC)",
    image: Images.prefix73 || Images.placeholder,
    description: "SFIC cylinders (6-pin or 7-pin) are highly popular in commercial applications for their ease of core replacement and standardization. They are generally compatible with other manufacturer's SFIC hardware.",
    details: [
      { prefix: "70", label: "Prep for SFIC (Plastic Core):", text: "Device prepped for SFIC, supplied with disposable plastic core for construction phase." },
      { prefix: "72", label: "Prep for SFIC (Construction Core):", text: "Device supplied with 6-Pin keyed construction core; permanent SFIC is ordered separately." },
      { prefix: "73/73-7P", label: "SFIC Cylinder Supplied:", text: "Device supplied with a permanent, keyed 6-Pin (73) or 7-Pin (73-7P) SFIC cylinder (includes masterkeying)." },
      { prefix: "65-73/65-73-7P", label: "Prep for SFIC (Uncombinated):", text: "Device prepped to accept Uncombinated 6-Pin or 7-Pin SFIC Core (Packed Loose)." },
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
      <Header>SARGENT Cylinder Key Systems</Header>

      {keySystemData.map((system, index) => (
        <SystemSection key={index}>
          <SystemTitle>{system.title}</SystemTitle>
          <SystemContent>
            <SystemImage 
                src={system.image} 
                alt={`${system.title} Cylinder Image`} 
                onError={(e) => { e.target.src = Images.placeholder; }}
            />
            <SystemDetails>
              <p><strong>Overview:</strong> {system.description}</p>
              
              <ul>
                {system.details.map((detail, dIndex) => (
                  <li key={dIndex}>
                    <strong>{detail.prefix}</strong>: {detail.label} {detail.text}
                  </li>
                ))}
              </ul>
              
            </SystemDetails>
          </SystemContent>
        </SystemSection>
      ))}
    </Container>
  );
}

export default KeySystems;