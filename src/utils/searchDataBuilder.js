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
        htmlDescription: null, // Exit devices usually don't have HTML desc in this data
        image: device.image,
        link: device.link,
        catalogs: [{ name: series.series, link: device.link }], 
        pageRoute: 'exit-devices', 
        keywords: [series.series, cleanText(device.name), ...funcCodes],
        combinedCodes: [] 
      });
    });
  });

  // --- 2. Process Mortise Locks ---
  mortiseLockFunctions.forEach((func) => {
    const activeCombinedCodes = [];
    const activeSeriesNames = [];
    const activeCatalogs = [];

    mortiseLockSeries.forEach((series) => {
      if (func.availability[series.code]) {
        const cleanFuncCode = func.code.split(' ')[0]; 
        activeCombinedCodes.push(`${series.code}${cleanFuncCode}`);
        activeSeriesNames.push(series.name);
        
        if (series.link) {
            activeCatalogs.push({ name: series.name, link: series.link });
        }
      }
    });

    searchIndex.push({
      id: `mort-${func.code}`,
      type: 'Mortise Function',
      title: `Function ${func.code}`,
      subtitle: `Available in: ${activeSeriesNames.join(', ')}`,
      description: cleanText(func.description), // Clean for search list
      htmlDescription: func.description, // RAW HTML for Modal
      image: func.image, 
      link: null,
      catalogs: activeCatalogs,
      pageRoute: 'mortise-locks', 
      keywords: ['Mortise', ...activeSeriesNames, func.code],
      combinedCodes: activeCombinedCodes 
    });
  });

  // --- 3. Process Bored Locks ---
  boredLockFunctions.forEach((func) => {
    const activeCombinedCodes = [];
    const activeSeriesNames = [];
    const activeCatalogs = [];

    boredLockSeries.forEach((series) => {
      if (func.availability[series.code]) {
        const cleanFuncCode = func.code.split(' ')[0]; 
        activeCombinedCodes.push(`${series.code}${cleanFuncCode}`);
        activeSeriesNames.push(series.name);

        if (series.link) {
            activeCatalogs.push({ name: series.name, link: series.link });
        }
      }
    });

    searchIndex.push({
      id: `bored-${func.code}`,
      type: 'Bored Lock Function',
      title: `Function ${func.code}`,
      subtitle: `Available in: ${activeSeriesNames.join(', ')}`,
      description: cleanText(func.description), // Clean for search list
      htmlDescription: func.description, // RAW HTML for Modal
      image: func.image,
      link: null,
      catalogs: activeCatalogs,
      pageRoute: 'bored-locks', 
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

    const desc = typeof prefix.description === 'object' ? prefix.description.default : prefix.description;

    searchIndex.push({
      id: `pre-${prefix.code}`,
      type: 'Prefix',
      title: `${prefix.code} - ${pName}`,
      subtitle: prefix.category,
      description: cleanText(desc),
      htmlDescription: desc, // Prefixes can also have HTML
      image: pImage,
      link: null,
      catalogs: [],
      pageRoute: 'prefixes', 
      keywords: ['Prefix', prefix.code, pName, ...(prefix.series || [])],
      combinedCodes: []
    });
  });

  return searchIndex;
};