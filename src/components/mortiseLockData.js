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
    description: 'Storeroom/Closet: The <strong>outside trim is always locked (rigid)</strong>. Access gained by key outside or inside trim (egress).',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '05 (ANSI F04)',
    description: 'Office/Entry: The <strong>outside trim is locked/unlocked</strong> by a key outside or by a thumbturn inside. Key retracts latchbolt when locked.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '06',
    description: 'Storeroom/Service: No outside trim or lever. Key outside or inside trim retracts latchbolt. <strong>Inside trim always retracts latchbolt</strong>.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '15 (ANSI F01)',
    description: 'Passage/Closet: Trim from either side <strong>always retracts the latchbolt</strong>. Never locked.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '37 (ANSI F05)',
    description: 'Classroom: The <strong>outside trim is locked/unlocked only by key from the outside</strong>. Inside trim always retracts latchbolt.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '17 (ANSI F30)',
    description: 'Asylum/Institutional: <strong>Trim on both sides are always locked (rigid)</strong>. Latchbolt retracted only by key from either side. (Caution: Life Safety)',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == SINGLE CYLINDER W/ DEADBOLT FUNCTIONS ==
  // ====================================
  {
    code: '24 (ANSI F21)',
    description: 'Storeroom/Room Door (Independent Deadbolt): Key or thumbturn project/retracts deadbolt. <strong>Latchbolt and deadbolt are independent</strong>. (Caution: Life Safety)',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '25 (ANSI F13)',
    description: 'Dormitory/Exit: When deadbolt is projected, outside trim is locked. <strong>Inside trim retracts both latchbolt and deadbolt simultaneously</strong>, unlocking the outside trim.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '50 (ANSI F15)',
    description: 'Hotel Guest: Thumbturn projects/retracts deadbolt. Uses <strong>Hotel Cylinder</strong> (Standard key is Latch only, Emergency key is Latch & Deadbolt).',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == DOUBLE CYLINDER FUNCTIONS ==
  // ====================================
  {
    code: '26 (ANSI F14)',
    description: 'Store Door (Deadbolt/Latch Indep.): Key from either side projects/retracts deadbolt. Trim from either side retracts latchbolt. <strong>Latchbolt and deadbolt are independent</strong>. (Caution: Life Safety)',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '38 (ANSI F32)',
    description: 'Classroom Security Latchbolt: <strong>Key from either side locks/unlocks the outside trim</strong>. Key from either side retracts latchbolt.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '39 (ANSI F33)',
    description: 'Classroom Security Deadbolt: Key either side projects/retracts deadbolt, which also <strong>locks/unlocks outside trim</strong>. Inside retracts Latch/Deadbolt simultaneously.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  
  // ====================================
  // == NON-KEYED & PRIVACY FUNCTIONS ==
  // ====================================
  {
    code: '65 (ANSI F22)',
    description: 'Privacy Bath/Bedroom: Thumbturn locks/unlocks outside trim. Emergency release outside. <strong>Closing the door will unlock the outside trim</strong>.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': true },
  },
  {
    code: '93 (Dummy)',
    description: 'Trim Dummy (Trim inside only): Trim on inside only is always rigid and acts as a pull. Lock case included.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  {
    code: '94 (Dummy)',
    description: 'Trim Dummy (Trim both sides): Trim on both sides is always rigid and acts as a pull. Lock case included.',
    image: null,
    availability: { '8200': true, '7800': true, '9200': false },
  },
  
  // ====================================
  // == ELECTRIFIED FUNCTIONS (8200 & 9200 Only) ==
  // ====================================
  {
    code: '70',
    description: 'Electrical Fail Safe: <strong>Power ON = Locked</strong> (Outside Lever). Key outside retracts latchbolt. Inside lever always retracts latchbolt.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '71',
    description: 'Electrical Fail Secure: <strong>Power ON = Unlocked</strong> (Outside Lever). Key outside retracts latchbolt. Inside lever always retracts latchbolt.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
  {
    code: '73',
    description: 'Electrical Fail Secure: <strong>Power ON = Unlocked (Both Levers)</strong>. Key from either side retracts latchbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': true },
  },
          {
    code: '270',
    description: 'Electrical Fail safe: <strong>Power ON = Unlocked (Both Levers)</strong>. Key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
        {
    code: '271',
    description: 'Electrical Fail secure: <strong>Power ON = Unlocked (Both Levers)</strong>. Key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
    {
    code: '274',
    description: 'Electrical Fail safe: <strong>Power ON = Unlocked (Both Levers)</strong>. No key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
      {
    code: '275',
    description: 'Electrical Fail secure: <strong>Power ON = Unlocked (Both Levers)</strong>. No key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
            {
    code: '280',
    description: 'Electrical Fail safe: <strong>Power ON = Unlocked (Both Levers)</strong>. Key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
        {
    code: '281',
    description: 'Electrical Fail secure: <strong>Power ON = Unlocked (Both Levers)</strong>. Key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
    {
    code: '284',
    description: 'Electrical Fail safe: <strong>Power ON = Unlocked (Both Levers)</strong>. No key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
      {
    code: '285',
    description: 'Electrical Fail secure: <strong>Power ON = Unlocked (Both Levers)</strong>. No key override, no deadbolt. Both levers locked/unlocked electronically.',
    image: null,
    availability: { '8200': true, '7800': false, '9200': false },
  },
];

export { mortiseLockSeries, mortiseLockFunctions };