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
    description: 'Storeroom/Closet: The <strong>outside lever is always locked</strong>. Access is gained only by turning the inside lever (egress) or using a key outside.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G05 (ANSI F109)',
    description: 'Entrance/Office: The <strong>outside lever is locked</strong> by pushing the button on the inside. It can be unlocked by using a key outside or by turning the inside lever.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G07 (ANSI F112)',
    description: 'Communicating Storeroom: This is a half-set (single lever, blank plate outside). The <strong>lever is always locked</strong>. The latch is operated only by key.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G08 (ANSI F113)',
    description: 'Communicating Classroom: This is a half-set (single lever, blank plate outside). The lever is normally unlocked. A key in the lever locks/unlocks it and retracts the latch.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  
  // ====================================
  // == NON-CYLINDER FUNCTIONS (G & U-SERIES) ==
  // ====================================
  {
    code: 'G13 (ANSI F89)',
    description: 'Exit: The <strong>outside lever is always locked</strong>. Egress is achieved only by turning the inside lever.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G14 (ANSI F77A)',
    description: 'Patio/Privacy: The <strong>outside lever is locked</strong> by pushing the button on the inside. It is released by turning the inside lever or simply by closing the door. (<strong>No key function</strong>).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G15-3 (No ANSI)',
    description: 'Exit/Communicating: This is a half-set (single lever, blank rose outside). The <strong>outside is permanently locked</strong>. Egress is achieved only by turning the inside lever.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G16 (ANSI F88)',
    description: 'Classroom Security/Apartment: The <strong>outside lever is locked</strong> by key use on the <strong>inside</strong> cylinder. A key outside retracts the latch when locked. The inside lever is always free for egress.',
    image: null,
    availability: { '11': true, '10': true, '8': false, '7': false },
  },
  {
    code: 'G17 (ANSI F87)',
    description: 'Utility/Institutional (Double Cylinder): <strong>Both levers are always locked</strong>. The latch is retracted only by key use on either side. (*Requires more than one exit*).',
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': false },
  },
  {
    code: 'U15 (ANSI F75)',
    description: 'Passage: <strong>Neither lever ever locks.</strong> The latch is retracted by turning either lever.',
    image: Images.placeholder,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G24 (ANSI F82A)',
    description: 'Entrance/Office (Non-Auto-Unlock): The <strong>outside lever is locked</strong> by pushing the button on the inside. It is unlocked by using a key outside or by turning the inside lever. <strong>Closing the door DOES NOT unlock the outside lever.</strong>',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G26 (ANSI F91)',
    description: 'Store/Storeroom (Double Cylinder): <strong>Key use on either side locks/unlocks BOTH levers.</strong> Inside lever always works for egress.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G30 (ANSI F80)',
    description: 'Communicating (Double Cylinder): <strong>Key use on one side locks/unlocks ONLY that side\'s lever.</strong> Inside lever always works for egress. (*Requires more than one exit*).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G37 (ANSI F84)',
    description: 'Classroom: The <strong>outside lever is locked/unlocked by key</strong> from the outside. The inside lever is always free for egress.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'G38 (ANSI F110)',
    description: 'Classroom Security Intruder: The <strong>outside lever is locked/unlocked by key</strong> from <strong>either</strong> the inside or the outside. The inside lever is always free for egress.',
    image: null,
    availability: { '11': true ,'10': true, '8': false,'7': false },
  },
  {
    code: 'G44 (ANSI F92)',
    description: 'Service Station: The <strong>outside lever is locked</strong> by pushing the button on the inside. It is released by turning the inside lever, closing the door, or using a key outside. (Can be fixed locked with a coin turn).',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G50 (ANSI F93)',
    description: 'Hotel/Dormitory: The <strong>outside lever is always locked</strong> (Dormitory/Apartment Mode). Inside push button locks out all keys except the emergency key. Push button is released by turning the inside lever or closing the door.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G53 (Mod F90)',
    description: 'Corridor/Dormitory (Auto-Unlock): The <strong>outside lever is locked</strong> by the key outside or push button inside. It is <strong>unlocked</strong> by key outside, turning the inside lever, or <strong>closing the door.</strong>',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G54 (ANSI F90)',
    description: 'Corridor/Dormitory (Keyed Override): The <strong>outside lever is locked</strong> by the key outside or push button inside. Turning the inside lever or closing the door releases the <strong>button only</strong>, but the lever remains locked if set by the key.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G60 (Barrier Free)',
    description: 'Storeroom/Restroom (Key Retained): Latch is operated by the inside lever. A key outside <strong>unlocks</strong> the outside lever and is <strong>retained</strong> in the cylinder while unlocked. The outside lever locks when the key is removed.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G64 (Time Out Lock)',
    description: 'Time Out Lock: Normally passage. The <strong>outside lever becomes rigid/locked</strong> when the inside push button is depressed and held by a caretaker. It returns to passage mode when the button is released.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U65 (ANSI F76A)',
    description: 'Privacy/Bathroom (Coin Turn): The <strong>outside lever is locked</strong> by the push button inside. It is released by turning the inside lever, closing the door, or using an <strong>emergency cointurn</strong> on the outside.',
    image: null,
    availability: { '11': true ,'10': true, '8': true, '7': true },
  },
  {
    code: 'U66 (ANSI F76A)',
    description: 'Privacy/Bathroom (Tool Release): The <strong>outside lever is locked</strong> by the push button inside. It is released by turning the inside lever, closing the door, or using an <strong>emergency release tool</strong> on the outside.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U68 (Hospital Privacy)',
    description: 'Hospital Privacy (Thumbturn Release): The <strong>outside lever is locked</strong> by the push button inside. It is released by turning the inside lever, closing the door, or rotating a <strong>thumbturn</strong> on the outside.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'G70 (Fail Safe)',
    description: 'Electrified Lock (Fail Safe): The <strong>outside lever locks when power is ON</strong>. It <strong>unlocks when power is OFF</strong> (Fail Safe). Inside lever is always free.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'G71 (Fail Secure)',
    description: 'Electrified Lock (Fail Secure): The <strong>outside lever locks when power is OFF</strong>. It <strong>unlocks when power is ON</strong> (Fail Secure). Inside lever is always free.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': false },
  },
  {
    code: 'U93 (Single Lever Pull)',
    description: 'Single Lever Pull: A fixed lever used only as a pull. <strong>No mechanical operation</strong> of the latch.',
    image: null,
    availability: { '11': false, '10': true, '8': true, '7': true },
  },
  {
    code: 'U94 (Double Lever Pull)',
    description: 'Double Lever Pull: Fixed levers on both sides used only as pulls. <strong>No mechanical operation</strong> of the latch.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
  {
    code: 'U94-2 (Double Lever Pull)',
    description: 'Double Lever Pull (Wood/Custom): Fixed levers on both sides used only as pulls. <strong>No mechanical operation</strong> of the latch. Uses standard door prep and a dummy latch plate.',
    image: null,
    availability: { '11': false, '10': true, '8': false, '7': true },
  },
];

export { boredLockSeries, boredLockFunctions };