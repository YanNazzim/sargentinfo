// src/components/mortiseLockData.js
import { Images } from "./images";

// Defines the available Mortise Lock series (columns in the table)
const mortiseLockSeries = [
  { code: '8200', name: '8200 Series', link: 'https://storage.googleapis.com/aa-americas/dam/AADSS1004639' },
  { code: '7800', name: '7800 Series', link: 'https://storage.googleapis.com/aa-americas/dam/AADSS1004639' },
  { code: '9200', name: '9200 Series', link: 'https://storage.googleapis.com/aa-americas/dam/AADSS1004645' },
];

const ulStyle = "padding-left: 20px; margin: 5px 0 0 0; text-align: left;";

// Defines the functions and their availability across the series
const mortiseLockFunctions = [
  // ====================================
  // == SINGLE CYLINDER LATCHBOLT FUNCTIONS ==
  // ====================================
  {
    code: '04 (ANSI F07)',
    description: `
      <strong>Storeroom/Closet</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li>Trim outside is locked at all times</li>
        <li>Trim inside always retracts latchbolt</li>
        <li>Auxiliary deadlatch</li>
      </ul>`,
    image: Images.M04,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '05 (ANSI F04)',
    description: `
      <strong>Office/Entry</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li>Key also locks & unlocks outside trim</li>
        <li>Thumbturn inside locks & unlocks outside trim</li>
        <li>Trim inside always retracts latchbolt</li>
        <li>Auxiliary deadlatch</li>
      </ul>`,
    image: Images.M05,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '06',
    description: `
      <strong>Storeroom/Service</strong>
      <ul style="${ulStyle}">
        <li>No trim outside, cylinder only</li>
        <li>Key outside retracts latchbolt</li>
        <li>Trim inside always retracts latchbolt</li>
        <li>Auxiliary deadlatch</li>
      </ul>`,
    image: Images.M06,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '15 (ANSI F01)',
    description: `
      <strong>Passage/Closet</strong>
      <ul style="${ulStyle}">
        <li>Trim from either side retracts latchbolt at all times</li>
      </ul>`,
    image: Images.M15,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '37 (ANSI F05)',
    description: `
      <strong>Classroom</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li>Key also locks & unlocks outside trim</li>
        <li>Trim inside always retracts latchbolt</li>
        <li>Auxiliary deadlatch</li>
      </ul>`,
    image: Images.M37,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '17 (ANSI F30)',
    description: `
      <strong>Asylum/Institutional</strong>
      <ul style="${ulStyle}">
        <li>Key from either side retracts latchbolt</li>
        <li>Trim on both sides are locked at all times</li>
        <li>Auxiliary deadlatch</li>
        <li><em>Caution: Life Safety</em></li>
      </ul>`,
    image: Images.M17,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == SINGLE CYLINDER W/ DEADBOLT FUNCTIONS ==
  // ====================================
  {
    code: '24 (ANSI F21)',
    description: `
      <strong>Room Door</strong>
      <ul style="${ulStyle}">
        <li>Key outside or thumbturn inside retracts and projects deadbolt</li>
        <li>Trim either side retracts latchbolt</li>
        <li>Latchbolt & deadbolt operate independently of each other</li>
      </ul>`,
    image: Images.M24,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '25 (ANSI F13)',
    description: `
      <strong>Dormitory/Exit</strong>
      <ul style="${ulStyle}">
        <li>Key outside or thumbturn inside retracts and projects deadbolt</li>
        <li>Trim outside is locked when the deadbolt is projected</li>
        <li>When deadbolt is projected, Trim inside retracts latchbolt and deadbolt simultaneously (unlocks outside trim)</li>
      </ul>`,
    image: Images.M25,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '50 (ANSI F15)',
    description: `
      <strong>Hotel Guest</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li>Trim outside is always locked</li>
        <li>Trim inside retracts latchbolt & deadbolt simultaneously</li>
        <li>Uses Hotel Cylinder (Standard key is Latch only, Emergency key is Latch & Deadbolt)</li>
      </ul>`,
    image: Images.M50,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == DOUBLE CYLINDER FUNCTIONS ==
  // ====================================
  {
    code: '26 (ANSI F14)',
    description: `
      <strong>Store Door</strong>
      <ul style="${ulStyle}">
        <li>Key from either side retracts & projects deadbolt</li>
        <li>Trim from either side retracts latchbolt</li>
        <li>Latchbolt and deadbolt are independent of each other</li>
        <li><em>Caution: Life Safety</em></li>
      </ul>`,
    image: Images.M26,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '38 (ANSI F32)',
    description: `
      <strong>Classroom Security Latchbolt</strong>
      <ul style="${ulStyle}">
        <li>Key from either side locks & unlocks outside trim</li>
        <li>Key from either side retracts latchbolt</li>
        <li>Trim outside retracts latchbolt, except when locked</li>
        <li>Trim inside always retracts latchbolt</li>
      </ul>`,
    image: Images.M38,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '39 (ANSI F33)',
    description: `
      <strong>Classroom Security Deadbolt</strong>
      <ul style="${ulStyle}">
        <li>Key from either side retracts or projects deadbolt (also locks/unlocks outside trim)</li>
        <li>Trim outside retracts latchbolt, except when locked</li>
        <li>Trim inside retracts both latchbolt and deadbolt simultaneously (unlocks outside trim)</li>
      </ul>`,
    image: Images.M39,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == NON-KEYED & PRIVACY FUNCTIONS ==
  // ====================================
  {
    code: '65 (ANSI F22)',
    description: `
      <strong>Privacy Bath/Bedroom</strong>
      <ul style="${ulStyle}">
        <li>Trim inside retracts latchbolt and unlocks outside trim</li>
        <li>Emergency Release locks/unlocks trim outside</li>
        <li>Thumbturn locks and unlocks trim outside</li>
        <li>Closing the door will unlock outside trim</li>
      </ul>`,
    image: Images.M65,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '93 (Dummy)',
    description: `
      <strong>Trim Dummy (Trim inside only)</strong>
      <ul style="${ulStyle}">
        <li>Trim on inside of door is always rigid</li>
        <li>Trim only used as door pull</li>
        <li>Lock case included</li>
      </ul>`,
    image: Images.M93,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  {
    code: '94 (Dummy)',
    description: `
      <strong>Trim Dummy (Trim both sides)</strong>
      <ul style="${ulStyle}">
        <li>Trim on both sides are always rigid</li>
        <li>Trim only used as door pull</li>
        <li>Lock case included</li>
      </ul>`,
    image: Images.M94,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  
  // ====================================
  // == ELECTRIFIED FUNCTIONS (8200 & 9200 Only) ==
  // ====================================
  {
    code: '70',
    description: `
      <strong>Electrical Fail Safe</strong>
      <ul style="${ulStyle}">
        <li>Power ON: locks outside lever</li>
        <li>Key outside retracts latchbolt</li>
        <li>Lever outside retracts latchbolt, except when locked</li>
        <li>Lever inside always retracts latchbolt</li>
      </ul>`,
    image: Images.M70,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '71',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power ON: unlocks outside lever</li>
        <li>Key outside retracts latchbolt</li>
        <li>Lever outside retracts latchbolt, except when locked</li>
        <li>Lever inside always retracts latchbolt</li>
      </ul>`,
    image: null, // Image M71 not found in provided list
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '73',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power ON: unlocks both levers</li>
        <li>Key on either side retracts latchbolt</li>
        <li>Lever from either side retracts latchbolt, except when levers are locked</li>
        <li>Both Levers can only be locked & unlocked electronically</li>
      </ul>`,
    image: null, // Image M73 not found in provided list
    availability: { '8200': true, '7800': false, '9200': true },
  },
  // ====================================
  // == NAC HIGH SECURITY (8200 Only) ==
  // ====================================
  {
    code: '270',
    description: `
      <strong>Electrical Fail Safe</strong>
      <ul style="${ulStyle}">
        <li>Power off: unlocks outside trim</li>
        <li>Key override, no deadbolt</li>
      </ul>`,
    image: Images.M270,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '271',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power off: locks outside trim</li>
        <li>Key override, no deadbolt</li>
      </ul>`,
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '274',
    description: `
      <strong>Electrical Fail Safe</strong>
      <ul style="${ulStyle}">
        <li>Power off: unlocks outside trim</li>
        <li>No key override, no deadbolt</li>
      </ul>`,
    image: Images.M274,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '275',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power off: locks outside trim</li>
        <li>No key override, no deadbolt</li>
      </ul>`,
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '280',
    description: `
      <strong>Electrical Fail Safe</strong>
      <ul style="${ulStyle}">
        <li>Power off: unlocks outside trim</li>
        <li>Key override with deadbolt</li>
      </ul>`,
    image: Images.M280,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '281',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power off: locks outside trim</li>
        <li>Key override with deadbolt</li>
      </ul>`,
    image: Images.M281,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '284',
    description: `
      <strong>Electrical Fail Safe</strong>
      <ul style="${ulStyle}">
        <li>Power off: unlocks outside trim</li>
        <li>No key override with deadbolt</li>
      </ul>`,
    image: Images.M284,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '285',
    description: `
      <strong>Electrical Fail Secure</strong>
      <ul style="${ulStyle}">
        <li>Power off: locks outside trim</li>
        <li>No key override with deadbolt</li>
      </ul>`,
    image: Images.M285,
    availability: { '8200': true, '7800': false, '9200': false },
  },
];

export { mortiseLockSeries, mortiseLockFunctions };