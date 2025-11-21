// src/components/boredLockData.js
import { Images } from "./images";

// Defines the available Bored Lock series (columns in the table)
const boredLockSeries = [
  { code: '11', name: '11 Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004620&page=8' },
  { code: '10', name: '10X Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1182289&page=11' },
  { code: '8', name: '8X Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1011588&page=4' },
  { code: '7', name: '7 Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004617&page=7' },
  { code: '65', name: '6500 Series', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004614&page=6' },
  { code: '6', name: '6 Line', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004611&page=6' },
  { code: 'DL', name: 'DL Series', link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1010102&page=3' },
];

const ulStyle = "padding-left: 20px; margin: 5px 0 0 0; text-align: left;";

// Defines the functions and their availability across the series
const boredLockFunctions = [
  // ====================================
  // == SINGLE CYLINDER FUNCTIONS (G-SERIES) ==
  // ====================================
  {
    code: 'G04 (ANSI F86)',
    description: `
      <strong>Storeroom/Closet</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li><strong>Outside lever is locked at all times</strong></li>
        <li>Inside lever always retracts latchbolt</li>
        <li>Deadlocking latch</li>
      </ul>`,
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true, '65': true, '6': true },
  },
  {
    code: 'G05 (ANSI F109)',
    description: `
      <strong>Entrance/Office</strong>
      <ul style="${ulStyle}">
        <li>Key outside retracts latchbolt</li>
        <li>Outside lever locked by push/turn button inside</li>
        <li>Outside lever unlocked by key outside or turning inside lever</li>
        <li>Turn button must be released manually</li>
        <li><strong>Inside lever always retracts latchbolt</strong></li>
      </ul>`,
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true, '65': true, '6': true },
  },
  {
    code: 'G07 (ANSI F112)',
    description: `
      <strong>Communicating Storeroom</strong>
      <ul style="${ulStyle}">
        <li>Half-set (Single lever, blank plate outside)</li>
        <li><strong>Lever is always locked</strong></li>
        <li>Latchbolt operated by key only</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G08 (ANSI F113)',
    description: `
      <strong>Communicating Classroom</strong>
      <ul style="${ulStyle}">
        <li>Half-set (Single lever, blank plate outside)</li>
        <li>Key locks and unlocks lever</li>
        <li>Lever retracts latchbolt when unlocked</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  
  // ====================================
  // == NON-CYLINDER FUNCTIONS (G & U-SERIES) ==
  // ====================================
  {
    code: 'G13 (ANSI F89)',
    description: `
      <strong>Exit Only</strong>
      <ul style="${ulStyle}">
        <li><strong>Outside lever is always locked</strong></li>
        <li>Inside lever always retracts latchbolt</li>
        <li>No key or cylinder outside</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G14 (ANSI F77A)',
    description: `
      <strong>Patio/Privacy</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by turning inside lever or closing door</li>
        <li><strong>No key/cylinder function</strong></li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U15 (ANSI F75)',
    description: `
      <strong>Passage</strong>
      <ul style="${ulStyle}">
        <li><strong>Neither lever ever locks</strong></li>
        <li>Latchbolt retracted by turning either lever</li>
      </ul>`,
    image: Images.placeholder,
    availability: { '11': true ,'10': true, '8': true, '7': true, '65': true, '6': true, 'DL': true },
  },
  {
    code: 'G15-3 (No ANSI)',
    description: `
      <strong>Exit/Communicating (Half-Set)</strong>
      <ul style="${ulStyle}">
        <li>Single lever with blank rose on opposite side</li>
        <li><strong>Opposite side is permanently locked/blank</strong></li>
        <li>Latch by lever inside</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true, '65': true, 'DL': true },
  },
    {
    code: 'U15-3 (No ANSI)',
    description: `
      <strong>Exit/Communicating (Half-Set)</strong>
      <ul style="${ulStyle}">
        <li>Single lever with blank rose on opposite side</li>
        <li><strong>Opposite side is permanently locked/blank</strong></li>
        <li>Latch by lever inside</li>
      </ul>`,
    image: null,
    availability: {'DL': true },
  },
  {
    code: 'G16 (ANSI F88)',
    description: `
      <strong>Classroom Security/Apartment</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked/unlocked by <strong>key in inside cylinder</strong></li>
        <li>Key outside retracts latchbolt when locked</li>
        <li><strong>Inside lever always retracts latchbolt</strong></li>
      </ul>`,
    image: null,
    availability: { '11': true, '10': true, '8': false, '7': false },
  },
  {
    code: 'G17 (ANSI F87)',
    description: `
      <strong>Utility/Institutional</strong>
      <ul style="${ulStyle}">
        <li>Double Cylinder</li>
        <li><strong>Both levers are always locked</strong></li>
        <li>Latch retracted only by key from either side</li>
        <li><em>Use only on rooms with more than one exit</em></li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': false },
  },
  {
    code: 'G24 (ANSI F82A)',
    description: `
      <strong>Entrance/Office (Non-Auto-Unlock)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by key outside or turning inside lever</li>
        <li><strong>Closing the door DOES NOT unlock the outside lever</strong></li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G26 (ANSI F91)',
    description: `
      <strong>Store/Storeroom</strong>
      <ul style="${ulStyle}">
        <li>Double Cylinder</li>
        <li>Key from either side locks & unlocks <strong>both</strong> levers</li>
        <li>Latchbolt operated by either lever when unlocked</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G30 (ANSI F80)',
    description: `
      <strong>Communicating</strong>
      <ul style="${ulStyle}">
        <li>Double Cylinder</li>
        <li>Key in each lever locks & unlocks <strong>only that lever</strong></li>
        <li><em>Use only on rooms with more than one exit</em></li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G37 (ANSI F84)',
    description: `
      <strong>Classroom</strong>
      <ul style="${ulStyle}">
        <li>Key outside locks & unlocks outside lever</li>
        <li>Key outside retracts latchbolt</li>
        <li><strong>Inside lever always retracts latchbolt</strong></li>
      </ul>`,
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true, '65': true, '6': true },
  },
  {
    code: 'G38 (ANSI F110)',
    description: `
      <strong>Classroom Security Intruder</strong>
      <ul style="${ulStyle}">
        <li>Key from <strong>either</strong> inside or outside locks & unlocks outside lever</li>
        <li>Key outside retracts latchbolt</li>
        <li><strong>Inside lever always retracts latchbolt</strong></li>
      </ul>`,
    image: null,
    availability: { '11': true ,'10': true, '8': false,'7': false },
  },
  {
    code: 'G44 (ANSI F92)',
    description: `
      <strong>Service Station</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by turning inside lever, closing door, or key outside</li>
        <li>Slotted push button allows "fixing" in locked position</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G50 (ANSI F93)',
    description: `
      <strong>Hotel/Dormitory</strong>
      <ul style="${ulStyle}">
        <li><strong>Outside lever is always locked</strong></li>
        <li>Inside push button projects indicator & shuts out all keys except Emergency Key</li>
        <li>Push button released by turning inside lever or closing door</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G53 (Mod F90)',
    description: `
      <strong>Corridor/Dormitory (Auto-Unlock)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside or key outside</li>
        <li>Unlocked by key, turning inside lever, or <strong>closing the door</strong></li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G54 (ANSI F90)',
    description: `
      <strong>Corridor/Dormitory (Keyed Override)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside or key outside</li>
        <li>Turning inside lever or closing door releases button, but lever <strong>remains locked</strong> if set by key</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G60 (Barrier Free)',
    description: `
      <strong>Storeroom/Restroom (Key Retained)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever always rigid</li>
        <li>Key outside unlocks lever and is <strong>retained</strong> while unlocked</li>
        <li>Removing key locks the outside lever again</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G64 (Time Out Lock)',
    description: `
      <strong>Time Out Lock</strong>
      <ul style="${ulStyle}">
        <li>Normally passage (unlocked)</li>
        <li>Outside lever becomes locked only while inside push button is <strong>held depressed</strong></li>
        <li>Returns to passage mode when button is released</li>
        <li>Both levers always free (from inside)</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U65 (ANSI F76A)',
    description: `
      <strong>Privacy/Bathroom (Coin Turn)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by turning inside lever, closing door, or <strong>emergency cointurn</strong> outside</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true, '65': true, '6': true, 'DL': true },
  },
  {
    code: 'U66 (ANSI F76A)',
    description: `
      <strong>Privacy/Bathroom (Tool Release)</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by turning inside lever, closing door, or <strong>emergency tool</strong> outside</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U68 (Hospital Privacy)',
    description: `
      <strong>Hospital Privacy</strong>
      <ul style="${ulStyle}">
        <li>Outside lever locked by push button inside</li>
        <li>Unlocked by turning inside lever, closing door, or rotating <strong>thumbturn</strong> outside</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G70 (Fail Safe)',
    description: `
      <strong>Electrified Lock (Fail Safe)</strong>
      <ul style="${ulStyle}">
        <li><strong>Power ON:</strong> Outside lever locked</li>
        <li><strong>Power OFF:</strong> Outside lever unlocked (Free egress)</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G71 (Fail Secure)',
    description: `
      <strong>Electrified Lock (Fail Secure)</strong>
      <ul style="${ulStyle}">
        <li><strong>Power ON:</strong> Outside lever unlocked</li>
        <li><strong>Power OFF:</strong> Outside lever locked (Secure)</li>
        <li>Inside lever always retracts latchbolt</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U93 (Single Lever Pull)',
    description: `
      <strong>Single Lever Pull</strong>
      <ul style="${ulStyle}">
        <li>Fixed/Rigid lever used only as a pull</li>
        <li><strong>No mechanical latch operation</strong></li>
        <li>Includes lock case/chassis</li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': true, '65': true, '6': true, 'DL': true },
  },
    {
    code: 'TB-U93 (Single Lever Pull)',
    description: `
      <strong>Single Lever Pull (Through-Bolted)</strong>
      <ul style="${ulStyle}">
        <li>Fixed/Rigid lever used only as a pull</li>
        <li>Through-bolted for extra strength</li>
        <li><strong>No mechanical latch operation</strong></li>
      </ul>`,
    image: null,
    availability: {'DL': true },
  },
  {
    code: 'U94 (Double Lever Pull)',
    description: `
      <strong>Double Lever Pull</strong>
      <ul style="${ulStyle}">
        <li>Fixed/Rigid levers on both sides used only as pulls</li>
        <li><strong>No mechanical latch operation</strong></li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true, '65': true, 'DL': true },
  },
  {
    code: 'U94-2 (Double Lever Pull)',
    description: `
      <strong>Double Lever Pull (Wood/Custom)</strong>
      <ul style="${ulStyle}">
        <li>Fixed/Rigid levers on both sides</li>
        <li>Uses standard door prep and dummy latch plate</li>
        <li><strong>No mechanical latch operation</strong></li>
      </ul>`,
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
];

export { boredLockSeries, boredLockFunctions };