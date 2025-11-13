// src/components/boredLockData.js
import { Images } from "./images";

// Defines the available Bored Lock series (columns in the table)
const boredLockSeries = [
  { code: '10', name: '10 Line', link: 'https://example.com/10line' },
  { code: '7', name: '7 Line', link: 'https://example.com/7line' },
];

// Defines the functions and their availability across the series
const boredLockFunctions = [
  {
    code: 'F01',
    description: 'Entrance/Office (Push/turn button inside)',
    image: Images.placeholder, // Using generic placeholder for bored lock image
    availability: { '10': true, '7': false },
  },
  {
    code: 'F07',
    description: 'Classroom (Key locks/unlocks outside)',
    image: null,
    availability: { '10': true, '7': true },
  },
  {
    code: 'F08',
    description: 'Storeroom (Always locked, key required)',
    image: null,
    availability: { '10': true, '7': true },
  },
  {
    code: 'F09',
    description: 'Passage (Always unlocked)',
    image: null,
    availability: { '10': true, '7': true },
  },
  {
    code: 'F20',
    description: 'Privacy (Push button locks inside)',
    image: null,
    availability: { '10': true, '7': false },
  },
];

export { boredLockSeries, boredLockFunctions };