// prefixData.js

import { Images } from "./images"; // Ensure this path is correct

// --- Helper for default series ---
const defaultMechSeries = ['80', 'PE80', '90'];
// Assume cylinder options can potentially be used with trims on these series
const defaultCylinderSeries = ['80', 'PE80', '90', '7000'];

export const allPrefixes = [

  // ====================================
  // == Mechanical/Electrical Prefixes ==
  // ====================================
  {
    code: '12',
    name: 'Fire Rated',
    imagePath: Images.prefix12 || Images.placeholder,
    series: defaultCylinderSeries, // Applies broadly
    category: 'Mechanical/Electrical',
    description: 'UL Fire Label Exit hardware (Disables dogging).<br/>(Not available with 16- & 56-HK-)',
  },
  {
    code: 'HC',
    name: 'Hurricane Rated',
    imagePath: Images.prefixHC || Images.placeholder,
    series: ["80", "PE80", "7000"], // Applies 
    category: 'Mechanical/Electrical',
    description: 'UL Hurricane Label Exit hardware (Metal Doors Only)',
  },
  {
    code: 'WS',
    name: 'WindStorm Rated',
    imagePath: Images.prefixWS || Images.placeholder,
    series: ["80", "PE80", "7000"], // Applies 
    category: 'Mechanical/Electrical',
    description: 'UL WindStorm Label Exit hardware (Metal Doors Only)',
  },
  {
    code: 'FM',
    name: 'FEMA Rated',
    imagePath: Images.prefixFM || Images.placeholder,
    series: ["80", "PE80"], // Applies 
    category: 'Mechanical/Electrical',
    description: 'UL FEMA Label Exit hardware (Metal Doors Only)',
  },
  {
    code: '14',
    name: 'SVR Sliding Bolt',
    imagePath: Images.prefix14 || Images.placeholder,
    series: ['80', 'PE80'], // Specific to 8700 SVR devices within these series
    category: 'Mechanical/Electrical',
    description: 'Sliding bolt bottom case for 8700 devices.',
  },
  {
    code: '16',
    name: 'Cylinder Dogging',
    imagePath: Images.prefix16 || Images.placeholder,
    series: defaultMechSeries, // Applies broadly where dogging is possible
    category: 'Mechanical/Electrical',
    description: 'Allows device dogging via #41 Cylinder & #97 Ring.<br/>(Not available with 12-, 59-, or AL- Option)',
  },
  {
    code: 'LD',
    name: 'Less Dogging',
    imagePath: Images.prefixLD || Images.placeholder,
    series: defaultMechSeries, // Applies broadly
    category: 'Mechanical/Electrical',
    description: 'Removes standard dogging feature for non-fire rated devices.',
  },
  {
    code: '19',
    name: 'Less Touch Pad',
    imagePath: Images.prefix19 || Images.placeholder,
    series: defaultMechSeries, // Applies broadly
    category: 'Mechanical/Electrical',
    description: 'Push bar supplied without the standard black Lexan touchpad.',
  },
  {
    code: '23',
    name: 'ANSI Strike (8300/8900)',
    imagePath: Images.prefix23 || Images.placeholder,
    series: ['80', 'PE80'], // Specific to 8300/8900 Mortise devices within these series
    category: 'Mechanical/Electrical',
    description: '4-7/8" (124mm) ANSI flat lip strike for 8300 & 8900 Series Mortise Exit Devices.',
  },
  {
    code: '31',
    name: 'Thick Doors / Panels',
    imagePath: Images.prefix31 || Images.placeholder,
    series: defaultCylinderSeries, // Applies broadly, check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'For doors over 1-3/4" and/or panels. Specify details.<br/>(Not available for HC8700, FM8700). Extended lip strike supplied for 8300 & 8900.',
  },
  {
    code: '36',
    name: 'Security Screws (Torx)',
    imagePath: Images.prefix36 || Images.placeholder,
    series: defaultCylinderSeries, // Applies broadly
    category: 'Mechanical/Electrical',
    description: 'Six lobe security head screws.',
  },
  {
    code: '37',
    name: 'Security Screws (Spanner)',
    imagePath: Images.prefix37 || Images.placeholder,
    series: defaultCylinderSeries, // Applies broadly
    category: 'Mechanical/Electrical',
    description: 'Spanner head security screws.',
  },
  {
    code: '43',
    name: 'Flush End Cap',
    imagePath: Images.prefix43 || Images.placeholder,
    series: ['80', 'PE80', '90'], // Check PDF notes for exceptions (LP/LR/LS)
    category: 'Mechanical/Electrical',
    description: 'Flush end cap for device rail.<br/>(Not available with LP, LR & LS Devices)',
  },
  {
    code: '49',
    name: 'Indicator (8816/8866)',
    imagePath: Images.prefix49 || Images.placeholder,
    series: ['80', 'PE80'], // Specific to 8800 devices within these series
    category: 'Mechanical/Electrical',
    description: 'Visual indicator for lock status.<br/>(Available on 8816 and 8866 functions only)<br/> Must Order as Less Dogging (12 or LD)',
  },
  {
    code: '53',
    name: 'Latchbolt Monitoring',
    imagePath: Images.prefix53 || Images.placeholder,
    series: defaultMechSeries, // Applies broadly, check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Latchbolt monitoring switch.<br/>(Not available with 49-, 59-, GL-, HC-, WS- or on FM8700, certain 8600 models like LP/LR/LS)',
  },
  {
    code: '54',
    name: 'Lever Monitor (Outside ET)',
    imagePath: Images.prefix54 || Images.placeholder,
    series: defaultCylinderSeries, // Applies where ET Trims are used
    category: 'Mechanical/Electrical',
    description: 'Monitors ET Lever movement with internal micro switch in ET Control.',
  },
  {
    code: '55',
    name: { // Series-specific names
      '7000': 'Inside Lever Monitor',
      'default': 'Request To Exit (REX/RX)'
    },
    imagePath: Images.prefix55 || Images.placeholder,
    series: defaultCylinderSeries, // Applies broadly, but meaning changes
    category: 'Mechanical/Electrical',
    description: { // Series-specific descriptions
      '7000': 'Switch monitors the status of the inside lever (7000 Series Only).',
      'default': 'Request-to-Exit signal switch in rail activates when push bar is depressed.<br/>(Not available with 59- & FM8700)'
    }
  },
  {
    code: '56',
    name: 'Electric Latch Retraction (ELR)',
    imagePath: Images.prefix56 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Allows remote latch retraction.<br/>(Not available with 58-, 59-, AL-, BT-, or FM8700 Option)',
  },
  {
    code: '56-HK',
    name: 'ELR w/ Hex Key Dogging',
    imagePath: Images.prefix56 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Remote Latch Retraction combined with manual Hex Key dogging override.<br/>(Not available with 12-, 58-, 59-, AL- or BT- Option)',
  },
  {
    code: '58',
    name: 'Electric Rail Dogging',
    imagePath: Images.prefix58 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Allows remote dogging (holding latch retracted) electrically.<br/>(Not available with 56- & 59-)',
  },
  {
    code: '59',
    name: 'Delayed Egress (Electroguard)',
    imagePath: Images.prefix59 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Self-contained delayed egress device.<br/>(N/A With 16, 53, 55, 56, 58, AL, GL, HC, WS, LP/LR 8600) - (NB & 54 are available upon request (QSPAR/SPAR))',
  },
  {
    code: 'AL',
    name: 'Alarmed Exit',
    imagePath: Images.prefixAL || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Built-in alarm sounds upon exit.<br/>(Min door width 36").<br/>(Not available with 16-, 56-, 59-, BT-, GL-, HC-, HC4- & WS-)',
  },
  {
    code: 'BC-59',
    name: 'Delayed Egress (Boca Code)',
    imagePath: Images.prefix59 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Self-contained delayed egress device Configured to comply with Boca Code.<br/>(N/A With 16, 53, 55, 56, 58, AL, GL, HC, WS, LP/LR 8600) - (NB & 54 are available upon request (QSPAR/SPAR))',
  },
  {
    code: '76',
    name: 'Tactile Warning (Milled Lever)',
    imagePath: Images.prefix76 || Images.placeholder,
    series: defaultCylinderSeries, // Where levers are used
    category: 'Mechanical/Electrical',
    description: 'Outside lever has milled texture for warning.<br/> Lets blind people know that stairs are coming up<br/>(Not available with Studio, Coastal, or A levers)',
  },
  {
    code: '85',
    name: 'Tactile Warning (Abrasive Rail)',
    imagePath: Images.prefix85 || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Abrasive strip (Sandpaper-like tape) applied to push rail.<br/>(Not available with PL-)',
  },
  {
    code: '86',
    name: 'Tactile Warning (Abrasive Lever)',
    imagePath: Images.prefix85 || Images.placeholder,
    series: defaultCylinderSeries, // Where levers are used
    category: 'Mechanical/Electrical',
    description: 'Abrasive coating (Sandpaper-like tape) applied to outside lever.',
  },
  {
    code: '87',
    name: 'Tactile Warning (Rail & Lever)',
    imagePath: Images.prefix85 || Images.placeholder,
    series: defaultMechSeries, // Applies where both can exist
    category: 'Mechanical/Electrical',
    description: 'Combines abrasive strip (Sandpaper-like tape) on push rail and abrasive coating on outside lever.<br/>(Not available with PL-)',
  },
  {
    code: 'CPC',
    name: 'Clear Powder Coat',
    imagePath: Images.prefixCPC || Images.placeholder,
    series: defaultMechSeries, // Primarily for specific finishes
    category: 'Mechanical/Electrical',
    description: 'Clear protective powder coat.<br/>(Available for 32 & 32D Finishes)',
  },
  {
    code: 'SG',
    name: 'MicroShield Coating',
    imagePath: Images.prefixCPC || Images.placeholder,
    series: defaultMechSeries, // Primarily for specific finishes
    category: 'Mechanical/Electrical',
    description: 'MicroShield® antimicrobial clear powder coat.<br/>(Only available with 15, 26D, and 32D finishes)',
  },
  {
    code: 'NB',
    name: 'Less Bottom Rod (LBR)',
    imagePath: Images.prefixNB || Images.placeholder,
    series: ['80', 'PE80'], // Applies to SVR/CVR devices
    category: 'Mechanical/Electrical',
    description: 'Top Rod Only configuration for SVR & CVR Devices.',
  },
  {
    code: 'GL',
    name: 'Guarded Latch',
    imagePath: Images.prefixGL || Images.placeholder,
    series: ['80', 'PE80'], // Applies to Rim devices
    category: 'Mechanical/Electrical',
    description: 'Provides extra latch protection for Rim Exit Devices.<br/><br/>See part# 9 in picture <br/><br/>(Not available with 53-, 59-, AL-, HC- & WS-)',
  },
  {
    code: 'PL',
    name: 'SARGuide™ Photoluminescent Rail',
    imagePath: Images.prefixPL || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for exceptions
    category: 'Mechanical/Electrical',
    description: 'Photoluminescent coated push rail (touchpad eliminated).<br/>(Not available with 85-, 87-)',
  },
  {
    code: 'TB',
    name: 'Through Bolts',
    imagePath: Images.prefixTB || Images.placeholder,
    series: defaultMechSeries, // Check PDF notes for specific device applicability
    category: 'Mechanical/Electrical',
    description: 'Through-bolts for device mounting (see PDF for applicable devices).',
  },
  {
    code: '5CH',
    name: '5lb Pressure Release',
    imagePath: Images.prefix5CH || Images.placeholder,
    series: ['80', 'PE80'], // Specific devices listed in PDF
    category: 'Mechanical/Electrical',
    description: 'Device requires only 5lbs pressure to release.<br/><br/>(8800, 8500, 8600 & 8400 devices only).<br/><br/>(Check PDF for incompatibilities)',
  },
  {
    code: 'WH',
    name: 'Weep Holes',
    imagePath: Images.prefixWH || Images.placeholder,
    series: ['80', 'PE80'], // Specific devices listed in PDF
    category: 'Mechanical/Electrical',
    description: 'Weather resistant weep holes for drainage.<br/>(8500 and 8800 devices only).<br/><br/>(Only available with 03, 04, 09, 10, 10BL, 20D, 10BE, BSP, WSP, 32DCP Finishes)<br/><br/>(N/A with AL-, 56-, 58-, 59-, HC-, WS-, BC-, HC4-, TL- & PL- Prefixes)',
  },


  // ======================
  // == Cylinder Prefixes ==
  // ======================
  // Note: Series applicability for cylinder options is broad, depends on function/trim.
  {
    code: 'DG1',
    name: 'Degree Lvl 1 Key System',
    imagePath: Images.prefixDG1 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'SARGENT Degree Key System Level 1 (bump resistant, patented keys).',
  },
  {
    code: 'DG2',
    name: 'Degree Lvl 2 Key System',
    imagePath: Images.prefixDG1 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'SARGENT Degree Key System Level 2 (geographically exclusive, bump/pick resistant).',
  },
  {
    code: 'DG3',
    name: 'Degree Lvl 3 Key System',
    imagePath: Images.prefixDG1 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'SARGENT Degree Key System Level 3 (UL437 certified, geo. exclusive, bump/pick resistant).',
  },
  {
    code: '10',
    name: 'Signature Key System',
    imagePath: Images.prefix10 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'SARGENT Signature Key System.',
  },
  {
    code: '11',
    name: 'XC Key System',
    imagePath: Images.prefix11 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'SARGENT XC Key System.',
  },
  {
    code: '21',
    name: 'Lost Ball Construction Keying',
    imagePath: Images.prefix21 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Lost Ball Construction Keying (Conv, XC, Signature).<br/>(N/A with 63- or 73-)',
  },
  {
    code: '51',
    name: 'Removable Core (Old Style)',
    imagePath: Images.prefix51 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Supplied with old style Removable Core cylinder (Existing Systems Only).',
  },
  {
    code: '52',
    name: 'Prep for Removable Core (Old Style)',
    imagePath: Images.prefix52 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Supplied with old style Removable Construction Core (Permanent core ordered separately, Existing Systems Only).',
  },
  {
    code: '60',
    name: 'Prep for LFIC (Plastic Core)',
    imagePath: Images.prefix60 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device prepped to accept SARGENT Permanent Large Format IC, supplied with disposable plastic core.',
  },
  {
    code: '63',
    name: 'LFIC Cylinder Supplied',
    imagePath: Images.prefix63 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with Large Format Interchangeable Core Cylinder (Includes masterkeying).',
  },
  {
    code: '64',
    name: 'Prep for LFIC (Construction Core)',
    imagePath: Images.prefix64 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with Keyed Construction Core to accept Permanent LFIC (ordered separately).',
  },
  {
    code: '65',
    name: 'LFIC Core (Uncombinated)',
    imagePath: Images.prefix65 || Images.placeholder, // Usually combined with another prefix
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied to accept Unassembled/Uncombined LFIC Core (Packed Loose). Used with DG1/DG2/DG3.',
  },
  {
    code: '70',
    name: 'Prep for SFIC (Plastic Core)',
    imagePath: Images.prefix70 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device prepped to accept 6 or 7-Pin SFIC, supplied with disposable plastic core.',
  },
  {
    code: '72',
    name: 'Prep for SFIC (Construction Core)',
    imagePath: Images.prefix72 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device prepped to accept 6 or 7-Pin SFIC, supplied with 6-Pin Keyed Construction Core.',
  },
  {
    code: '73',
    name: 'SFIC Cylinder Supplied (6-Pin)',
    imagePath: Images.prefix73 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with 6-Pin Small Format IC (Includes masterkeying).',
  },
  {
    code: '73-7P',
    name: 'SFIC Cylinder Supplied (7-Pin)',
    imagePath: Images.prefix73 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with 7-Pin Small Format IC (Includes masterkeying).',
  },
  {
    code: '65-73',
    name: 'Prep for SFIC (Uncombinated 6-Pin)',
    imagePath: Images.prefix6573 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device prepped to accept Uncombinated 6-Pin SFIC Core (Packed Loose).',
  },
  {
    code: '65-73-7P',
    name: 'Prep for SFIC (Uncombinated 7-Pin)',
    imagePath: Images.prefix6573 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device prepped to accept Uncombinated 7-Pin SFIC Core (Packed Loose).',
  },
  {
    code: '81',
    name: 'Prep for Keso/Keso F1 Core',
    imagePath: Images.prefix81 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with housings to accept Keso (83) & Keso F1 (F1-83) removable cores (Cores ordered separately).',
  },
  {
    code: '82',
    name: 'Keso Cylinder Supplied',
    imagePath: Images.prefix82 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with SARGENT Keso Security Cylinder.',
  },
  {
    code: 'F1-82',
    name: 'Keso F1 Cylinder Supplied',
    imagePath: Images.prefix82 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with SARGENT Keso F1 Security Cylinder (Patented).',
  },
  {
    code: '83',
    name: 'Keso Removable Core Supplied',
    imagePath: Images.prefix81 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with SARGENT Keso Security Removable Core cylinder.',
  },
  {
    code: 'F1-83',
    name: 'Keso F1 Removable Core Supplied',
    imagePath: Images.prefix81 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with SARGENT Keso F1 Security Removable Core cylinder (Patented).',
  },
  {
    code: '84',
    name: 'Prep for Keso Core (Construction Core)',
    imagePath: Images.prefix84 || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with SARGENT Keso Construction Cores (Permanent Cores ordered separately).',
  },
  {
    code: 'BR',
    name: 'Bump Resistant Cylinder',
    imagePath: Images.prefixBR || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Bump Resistant Cylinder modification.<br/>(Available with Conventional & Conventional XC Cylinders Only)',
  },
  {
    code: 'LC',
    name: 'Less Cylinder',
    imagePath: Images.prefixLC || Images.placeholder,
    series: defaultCylinderSeries,
    category: 'Cylinder',
    description: 'Device supplied with no cylinders at all',
  },
  {
    code: 'SC',
    name: 'Schlage C Keyway (0-Bitted)',
    imagePath: Images.prefixSC || Images.placeholder,
    series: defaultCylinderSeries, // Check PDF for specific function incompatibilities
    category: 'Cylinder',
    description: 'Schlage C keyway conventional cylinder, 0 bitted.<br/>(Check PDF for specific function incompatibilities)',
  },
  {
    code: 'SE',
    name: 'Schlage E Keyway (0-Bitted)',
    imagePath: Images.prefixSE || Images.placeholder,
    series: defaultCylinderSeries, // Check PDF for specific function incompatibilities
    category: 'Cylinder',
    description: 'Schlage E keyway conventional cylinder, 0 bitted.<br/>(Check PDF for specific function incompatibilities)',
  },
  {
    code: 'SF',
    name: 'Prep for Schlage LFIC (L Lever)',
    imagePath: Images.prefixSF || Images.placeholder,
    series: defaultCylinderSeries, // Where L Levers are used
    category: 'Cylinder',
    description: 'L Lever prepared to accept Schlage® large format interchangeable core (Supplied less core, tailpiece included).',
  },


];

// prefixSeries calculation remains the same
export const prefixSeries = [
  ...new Set(allPrefixes.flatMap(p => p.series))
].sort()
 .map(series => ({ value: series, label: `${series} Series` }));