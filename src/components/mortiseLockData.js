// src/components/mortiseLockData.js
//import { Images } from "./images";

// Defines the available Mortise Lock series (columns in the table)
const mortiseLockSeries = [
  { code: '8200', name: '8200 Series', link: 'uploaded:7800 & 8200 Mortise Catalog.pdf#page=18' },
  { code: '7800', name: '7800 Series', link: 'uploaded:7800 & 8200 Mortise Catalog.pdf#page=18' },
  { code: '9200', name: '9200 Series', link: 'uploaded:9200 Mortise Catalog.pdf#page=9' },
];

// Defines the functions and their availability across the series
const mortiseLockFunctions = [
  // ====================================
  // == SINGLE CYLINDER LATCHBOLT FUNCTIONS ==
  // ====================================
  {
    code: '04 (ANSI F07)',
    description: 'Storeroom/Closet: Key outside retracts latchbolt. <strong>Trim outside is locked at all times</strong>. Trim inside always retracts latchbolt. Auxiliary deadlatch.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '05 (ANSI F04)',
    description: 'Office/Entry: Key outside retracts latchbolt, also locks & unlocks outside trim. <strong>Thumbturn inside locks & unlocks outside trim</strong>. Trim inside always retracts latchbolt. Auxiliary deadlatch.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '06',
    description: 'Storeroom/Service: No trim outside, cylinder only. Key outside retracts latchbolt. <strong>Trim inside always retracts latchbolt</strong>. Auxiliary deadlatch.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '15 (ANSI F01)',
    description: 'Passage/Closet: <strong>Trim from either side retracts latchbolt at all times</strong>.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '37 (ANSI F05)',
    description: 'Classroom: Key outside retracts latchbolt, also locks & unlocks outside trim. <strong>Trim inside always retracts latchbolt</strong>. Auxiliary deadlatch.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '17 (ANSI F30)',
    description: 'Asylum/Institutional: Key from either side retracts latchbolt. <strong>Trim on both sides are locked at all times</strong>. Auxiliary deadlatch. (Caution: Life Safety)',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == SINGLE CYLINDER W/ DEADBOLT FUNCTIONS ==
  // ====================================
  {
    code: '24 (ANSI F21)',
    description: 'Room Door: Key outside or thumbturn inside retracts and projects deadbolt. <strong>Trim either side retracts latchbolt</strong>. Latchbolt & deadbolt operate independently of each other.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '25 (ANSI F13)',
    description: 'Dormitory/Exit: Key outside or thumbturn inside retracts and projects deadbolt. Trim outside is locked when the deadbolt is projected. <strong>When deadbolt is projected, Trim inside retracts latchbolt and deadbolt simultaneously</strong>, unlocking outside trim.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '50 (ANSI F15)',
    description: 'Hotel Guest: Key outside retracts latchbolt. <strong>Trim inside retracts latchbolt & deadbolt simultaneously</strong>. Trim outside is always locked. Uses Hotel Cylinder (Standard key is Latch only, Emergency key is Latch & Deadbolt).',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == DOUBLE CYLINDER FUNCTIONS ==
  // ====================================
  {
    code: '26 (ANSI F14)',
    description: 'Store Door: Key from either side retracts & projects deadbolt. <strong>Trim from either side retracts latchbolt</strong>. Latchbolt and deadbolt are independent of each other. (Caution: Life Safety)',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '38 (ANSI F32)',
    description: 'Classroom Security Latchbolt: Key from either side locks & unlocks outside trim. Key from either side retracts latchbolt. Trim outside retracts latchbolt, except when locked. <strong>Trim inside always retracts latchbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '39 (ANSI F33)',
    description: 'Classroom Security Deadbolt: Key from either side retracts or projects deadbolt which also locks or unlocks outside trim. Trim outside retracts latchbolt, except when locked. <strong>Trim inside retracts both latchbolt and deadbolt simultaneously</strong>, and unlocks outside trim.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == NON-KEYED & PRIVACY FUNCTIONS ==
  // ====================================
  {
    code: '65 (ANSI F22)',
    description: 'Privacy Bath/Bedroom: Trim inside retracts latchbolt and unlocks outside trim. Emergency Release locks/unlocks trim outside. Thumbturn locks and unlocks trim outside. <strong>Closing the door will unlock outside trim</strong>.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '93 (Dummy)',
    description: 'Trim Dummy (Trim inside only): Trim on inside of door is always rigid. Trim only used as door pull. Lock case included.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  {
    code: '94 (Dummy)',
    description: 'Trim Dummy (Trim both sides): Trim on both sides are always rigid. Trim only used as door pull. Lock case included.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  
  // ====================================
  // == ELECTRIFIED FUNCTIONS (8200 & 9200 Only) ==
  // ====================================
  {
    code: '70',
    description: 'Electrical Fail Safe: Power ON, locks outside lever. Key outside retracts latchbolt. Lever outside retracts latchbolt, except when locked. <strong>Lever inside always retracts latchbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '71',
    description: 'Electrical Fail Secure: Power ON, unlocks outside lever. Key outside retracts latchbolt. Lever outside retracts latchbolt, except when locked. <strong>Lever inside always retracts latchbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '73',
    description: 'Electrical Fail Secure: Power ON, unlocks both levers. Key on either side retracts latchbolt. Lever from either side retracts latchbolt, except when levers are locked. <strong>Both Levers can only be locked & unlocked electronically</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  // ====================================
  // == NAC HIGH SECURITY (8200 Only) ==
  // ====================================
  {
    code: '270',
    description: 'Electrical Fail Safe: Power off, unlocks outside trim. <strong>Key override, no deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '271',
    description: 'Electrical Fail Secure: Power off, locks outside trim. <strong>Key override, no deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '274',
    description: 'Electrical Fail Safe: Power off, unlocks outside trim. <strong>No key override, no deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '275',
    description: 'Electrical Fail Secure: Power off, locks outside trim. <strong>No key override, no deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '280',
    description: 'Electrical Fail Safe: Power off, unlocks outside trim. <strong>Key override with deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '281',
    description: 'Electrical Fail Secure: Power off, locks outside trim. <strong>Key override with deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '284',
    description: 'Electrical Fail Safe: Power off, unlocks outside trim. <strong>No key override with deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
  {
    code: '285',
    description: 'Electrical Fail Secure: Power off, locks outside trim. <strong>No key override with deadbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
];

export { mortiseLockSeries, mortiseLockFunctions };