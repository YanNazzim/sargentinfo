// src/components/mortiseLockData.js
import { Images } from "./images";

// Defines the available Mortise Lock series (columns in the table)
const mortiseLockSeries = [
  { code: '8200', name: '8200 Series', link: 'https://example.com/8200' },
  { code: '9200', name: '9200 Series', link: 'https://example.com/9200' },
  { code: '7800', name: '7800 Series', link: 'https://example.com/7800' },
];

// Defines the functions and their availability across the series
const mortiseLockFunctions = [
  {
    code: 'L01',
    description: 'Passage Function (Always unlocked)',
    image: Images.W8900, // Using W8900 as a mortise placeholder image
    availability: { '8200': true, '9200': true, '7800': true },
  },
  {
    code: 'L05',
    description: 'Storeroom Function (Always locked, key required)',
    image: null,
    availability: { '8200': true, '9200': false, '7800': true },
  },
  {
    code: 'L06',
    description: 'Classroom Function (Key locks/unlocks outside lever)',
    image: null,
    availability: { '8200': true, '9200': true, '7800': false },
  },
  {
    code: 'L15',
    description: 'Electrified Lock (Fail Secure - Power ON = Locked)',
    image: null,
    availability: { '8200': true, '9200': true, '7800': true },
  },
  {
    code: 'L17',
    description: 'Dummy Trim (Inactive trim only)',
    image: null,
    availability: { '8200': false, '9200': true, '7800': false },
  },
];

export { mortiseLockSeries, mortiseLockFunctions };