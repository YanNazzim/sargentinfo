// src/components/boredLockData.js
import { Images } from "./images";

// Defines the available Bored Lock series (columns in the table)
const boredLockSeries = [
  // Link updated to point to the functions section (Page 11) of the 10X catalog
  { code: '11', name: '11 Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004620&page=8' },
  { code: '10', name: '10X Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1182289&page=11' },
  { code: '8', name: '8X Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1011588&page=4' },
  { code: '7', name: '7 Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004617&page=7' }, // Kept as placeholder
];

// Defines the functions and their availability across the series, using standardized codes
const boredLockFunctions = [
  // ====================================
  // == SINGLE CYLINDER FUNCTIONS (G-SERIES) ==
  // ====================================
  {
    code: 'G04 (ANSI F86)',
    description: 'Storeroom or Closet: Outside lever locked at all times. Latch by lever inside or key outside.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G05 (ANSI F109)',
    description: 'Entrance or Office: Outside lever locked by push/turn button inside. Released by key outside or lever inside. (Push button released by key or lever. Turn button released manually).',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G07 (ANSI F112)',
    description: 'Communicating Storeroom: Latch by key. Lever on one side; blank plate on other side. Lever locked at all times.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G08 (ANSI F113)',
    description: 'Communicating Classroom: Latch by lever unless lever is locked by key. Key in lever locks or unlocks lever and retracts latch. Lever on one side; blank plate on other side.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  
  // ====================================
  // == NON-CYLINDER FUNCTIONS (G & U-SERIES) ==
  // ====================================
  {
    code: 'G13 (ANSI F89)',
    description: 'Exit: Outside lever locked at all times. Latch by inside lever.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G14 (ANSI F77A)',
    description: 'Patio or Privacy: Outside lever locked by push button in inside lever. Turning inside lever or closing door releases button.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G15-3 (No ANSI)',
    description: 'Exit or Communicating: Deadlocking latch. Blank rose outside. Latch by lever inside.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G16 (ANSI F88)',
    description: 'Classroom Security/Apartment: Outside lever locked by key in inside lever. Key in outside lever retracts latch when locked. Inside lever always operative.',
    image: null,
    availability: { '11': true, '10': true, '8': false, '7': false },
  },
  {
    code: 'G17 (ANSI F87)',
    description: 'Utility/Asylum/Institutional: Both levers locked at all times. Latch by key either side. (Use only on rooms with more than one exit).',
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': false },
  },
  {
    code: 'U15 (ANSI F75)',
    description: 'Passage: Latch by either lever (never locked).',
    image: Images.placeholder,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G24 (ANSI F82A)',
    description: 'Entrance or Office: Outside lever locked by push button inside. Released by key or turning inside lever. Closing door does not unlock.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G26 (ANSI F91)',
    description: 'Store or Storeroom: Key in either lever locks or unlocks both levers.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G30 (ANSI F80)',
    description: 'Communicating: Key in either lever locks or unlocks its own lever only. (Use only on rooms with more than one exit).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G37 (ANSI F84)',
    description: 'Classroom: Outside lever locked/unlocked by key. Inside lever always operative.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G38 (ANSI F110)',
    description: 'Classroom Security Intruder: Outside lever locked by key in either lever. Inside lever always operable.',
    image: null,
    availability: { '11': true ,'10': true, '8': false,'7': false },
  },
  {
    code: 'G44 (ANSI F92)',
    description: 'Service Station: Outside lever locked by push button in inside lever. Push button released by turning inside lever, closing door, or key in outside lever (unless coin slot is used).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G50 (ANSI F93)',
    description: 'Hotel/Dormitory/Apartment: Outside lever always locked. Latch by key outside or lever inside. Push button inside locks all keys except emergency key.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G53 (Mod F90)',
    description: 'Corridor/Dormitory: Outside lever locked by push button inside or key outside. When locked, released by key, turning inside lever, or closing door.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G54 (ANSI F90)',
    description: 'Corridor/Dormitory: Outside lever locked by push button inside or key outside. Rotating inside lever or closing door releases inside button only, does not unlock if locked by key.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G60 (Barrier Free)',
    description: 'Storeroom/Public Restroom: Latch by lever inside. Key in outside lever unlocks outside lever to retract latch (key retained). When key removed, outside lever is locked.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G64 (Time Out Lock)',
    description: 'Time Out Lock: Latch by either lever (passage) unless push button depressed and held by caretaker (detention side becomes rigid).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U65 (ANSI F76A)',
    description: 'Privacy/Bathroom: Outside lever locked by push button inside. Released by turning inside lever, closing door, or Emergency cointurn outside.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'U66 (ANSI F76A)',
    description: 'Privacy/Bathroom: Outside lever locked by push button inside. Released by turning inside lever, closing door, or Emergency release tool outside.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U68 (Hospital Privacy)',
    description: 'Hospital Privacy: Outside lever locked by push button inside. Released by turning inside lever, closing door, or rotating thumbturn outside.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G70 (Fail Safe)',
    description: 'Electrified Lock (Fail Safe): Power ON locks outside lever. Power OFF unlocks outside lever. Key retracts latch when locked electrically.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G71 (Fail Secure)',
    description: 'Electrified Lock (Fail Secure): Power OFF locks outside lever. Power ON unlocks outside lever. Key retracts latch when power is OFF.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U93 (Single Lever Pull)',
    description: 'Single Lever Pull: Lever acts as a pull only (rigid). Requires special door preparation.',
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': true },
  },
  {
    code: 'U94 (Double Lever Pull)',
    description: 'Double Lever Pull: Levers acts as pulls only (rigid). Requires special door preparation.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'U94-2 (Double Lever Pull)',
    description: 'Double Lever Pull (Wood/Custom Metal Doors): Levers acts as pulls only. Uses standard door prep template.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
];

export { boredLockSeries, boredLockFunctions };