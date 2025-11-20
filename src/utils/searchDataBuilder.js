// src/utils/searchDataBuilder.js
import deviceData from '../components/deviceData';
import { mortiseLockSeries, mortiseLockFunctions } from '../components/mortiseLockData';
import { boredLockSeries, boredLockFunctions } from '../components/boredLockData';
import { allPrefixes } from '../components/prefixData';

// Helper to strip HTML and decode entities (e.g., &amp; -> &)
const cleanText = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export const buildSearchIndex = () => {
  let searchIndex = [];

  // --- 1. Process Exit Devices ---
  deviceData.forEach((series) => {
    series.devices.forEach((device) => {
      const funcCodes = typeof device.functions === 'string' 
        ? device.functions.split(',').map(s => s.trim()) 
        : [];

      searchIndex.push({
        id: `dev-${device.name}`,
        type: 'Exit Device',
        title: cleanText(device.name),
        subtitle: series.series, 
        description: `Functions: ${device.functions}`,
        image: device.image,
        link: device.link,
        pageRoute: 'exit-devices', // Route Key for App.js
        keywords: [series.series, cleanText(device.name), ...funcCodes],
        combinedCodes: [] 
      });
    });
  });

  // --- 2. Process Mortise Locks ---
  mortiseLockFunctions.forEach((func) => {
    const activeCombinedCodes = [];
    const activeSeriesNames = [];

    mortiseLockSeries.forEach((series) => {
      if (func.availability[series.code]) {
        const cleanFuncCode = func.code.split(' ')[0]; 
        activeCombinedCodes.push(`${series.code}${cleanFuncCode}`); // e.g. 8204
        activeSeriesNames.push(series.name);
      }
    });

    searchIndex.push({
      id: `mort-${func.code}`,
      type: 'Mortise Function',
      title: `Function ${func.code}`,
      subtitle: `Available in: ${activeSeriesNames.join(', ')}`,
      description: cleanText(func.description),
      image: func.image, 
      link: null,
      pageRoute: 'mortise-locks', // Route Key for App.js
      keywords: ['Mortise', ...activeSeriesNames, func.code],
      combinedCodes: activeCombinedCodes 
    });
  });

  // --- 3. Process Bored Locks ---
  boredLockFunctions.forEach((func) => {
    const activeCombinedCodes = [];
    const activeSeriesNames = [];

    boredLockSeries.forEach((series) => {
      if (func.availability[series.code]) {
        const cleanFuncCode = func.code.split(' ')[0]; 
        activeCombinedCodes.push(`${series.code}${cleanFuncCode}`); // e.g. 10G04
        activeSeriesNames.push(series.name);
      }
    });

    searchIndex.push({
      id: `bored-${func.code}`,
      type: 'Bored Lock Function',
      title: `Function ${func.code}`,
      subtitle: `Available in: ${activeSeriesNames.join(', ')}`,
      description: cleanText(func.description),
      image: func.image,
      link: null,
      pageRoute: 'bored-locks', // Route Key for App.js
      keywords: ['Bored Lock', 'Cylindrical', ...activeSeriesNames, func.code],
      combinedCodes: activeCombinedCodes
    });
  });

  // --- 4. Process Prefixes ---
  allPrefixes.forEach((prefix) => {
    let pName = prefix.name;
    if (typeof prefix.name === 'object') {
        pName = prefix.name.default || Object.values(prefix.name)[0];
    }

    let pImage = prefix.imagePath;
    if (typeof prefix.imagePath === 'object' && prefix.imagePath.default) {
        pImage = prefix.imagePath.default;
    }

    searchIndex.push({
      id: `pre-${prefix.code}`,
      type: 'Prefix',
      title: `${prefix.code} - ${pName}`,
      subtitle: prefix.category,
      description: cleanText(typeof prefix.description === 'object' ? prefix.description.default : prefix.description),
      image: pImage,
      link: null,
      pageRoute: 'prefixes', // Route Key for App.js
      keywords: ['Prefix', prefix.code, pName, ...(prefix.series || [])],
      combinedCodes: []
    });
  });

  return searchIndex;
};