// components/thickdoorData.js

/*
  Data structure to manage parts needed for thick doors (NC-E05 Special Order)
  using thickness ranges.

  Structure:
  [
    {
      min: number, // Minimum thickness for this range (inclusive)
      max: number, // Maximum thickness for this range (inclusive)
      parts: { // Parts applicable to the *entire* min-max range
        category1: ["PART_NUM", ...],
        category2: ["PART_NUM", ...]
      },
      subRanges: [ // Optional: More specific ranges within the main range
        {
          min: number,
          max: number,
          parts: { // Parts *only* for this sub-range
             category3: ["PART_NUM", ...]
          }
        },
        // ... more sub-ranges
      ]
    },
    // ... more range objects
  ]

  IMPORTANT: Ensure ranges and sub-ranges are defined logically and cover
             all necessary thicknesses without unintended overlaps in part *categories*.
             A specific thickness might match multiple ranges/sub-ranges, and
             the logic will combine parts from all matches.
*/

const thickDoorPartsDataRanges = [
  // Main ranges for thick doors
  {
      min: 2.25, // 2-1/4"
      max: 5.0,    // 5"
      parts: {
      },
      subRanges: [
        {
          min: 2.25, // 2-1/4"
          max: 2.375,   // 2-3/8"
          parts: {
            auxScrews: ['10-24 x 2-1/2"'],

          }
        },
        {
          min: 2.3125,
          max: 2.375,
          parts: {
            auxScrews: ['10-24 x 2-5/8"'],
          }
        },
        {
          min: 2.4375, // 2-7/16" (2.4375")
          max: 2.5,   // 2-1/2" (2.5")
          parts: {
            
            auxScrews: ['10-24 x 2-3/4"'],
          }
        },
        {
          min: 2.5125, // 2-9/16" (2.5125")
          max: 2.75,   // 2-3/4" (2.75")
          parts: {
            
            auxScrews: ['10-24 x 3"'],
          }
        },
        {
          min: 2.8125, // 2-13/16" (2.8125")
          max: 3,   // 3"
          parts: {
            auxScrews: ['10-24 x 3-1/4"'],
          }
        },
        {
          min: 3.125, // 3-1/8" (3.125")
          max: 3.25,   // 3 1/4" (3.25")
          parts: {
            auxScrews: ['10-24 x 3-1/2"'],

          }
        },
        {
          min: 3.3125, // 3-5/16" (3.3125")
          max: 3.5,   // 3 1/2" (3.5")
          parts: {
            auxScrews: ['10-24 x 3.75"'],
          }
        },
      ]
    },

  ];
  
  export default thickDoorPartsDataRanges;