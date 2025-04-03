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
    // --- Example Ranges (Populate with actual data) ---
  
    // Range: 2-1/4" (Only this specific thickness)
    {
      min: 2.25,
      max: 2.25,
      parts: {
        spindles: ["SPINDLE_PN_FOR_2.25"],
        trimScrews: ["TRIM_SCREW_PN_FOR_2.25"],
        auxScrews: ["AUX_SCREW_PN_FOR_2.25"],
        rimCylinderScrews: ["RIM_CYL_SCREW_PN_FOR_2.25"],
        rimCylinderTailpiece: ["RIM_TAILPIECE_PN_FOR_2.25"]
      },
      // No sub-ranges needed for a single point
    },
  
    // Range: 2-5/16" to 3"
    {
      min: 2.3125, // 2-5/16"
      max: 3.0,    // 3"
      parts: {
        // These parts work for the whole 2-5/16" to 3" range
        trimScrews: ["TRIM_SCREW_PN_FOR_2.3125_TO_3.0"],
        auxScrews: ["AUX_SCREW_PN_FOR_2.3125_TO_3.0"],
        rimCylinderScrews: ["RIM_CYL_SCREW_PN_FOR_2.3125_TO_3.0"],
        rimCylinderTailpiece: ["RIM_TAILPIECE_PN_FOR_2.3125_TO_3.0"]
      },
      subRanges: [
        // Spindle specific to 2-5/16" up to 2-3/4"
        {
          min: 2.3125,
          max: 2.75,
          parts: {
            spindles: ["SPINDLE_PN_FOR_2.3125_TO_2.75"]
          }
        },
        // Spindle specific to > 2-3/4" up to 3"
        {
          min: 2.8125, // 2-13/16" (Just above 2-3/4")
          max: 3.0,
          parts: {
            spindles: ["SPINDLE_PN_FOR_2.8125_TO_3.0"]
          }
        }
      ]
    },
  
    // Range: 3-1/16" to 4"
     {
       min: 3.0625,
       max: 4.0,
       parts: {
         // Define parts applicable to this whole range
         trimScrews: ["TRIM_SCREW_PN_FOR_3.0625_TO_4.0"],
         auxScrews: ["AUX_SCREW_PN_FOR_3.0625_TO_4.0"],
         // ... other categories
       },
       subRanges: [
          // Example: Different rim cylinder parts for just 4"
          {
             min: 4.0,
             max: 4.0,
             parts: {
                  rimCylinderScrews: ["RIM_CYL_SCREW_PN_FOR_4.0_ONLY"],
                  rimCylinderTailpiece: ["RIM_TAILPIECE_PN_FOR_4.0_ONLY"]
             }
          },
           // Example: Different spindle for 3.5" to 4"
           {
              min: 3.5,
              max: 4.0,
              parts: {
                   spindles: ["SPINDLE_PN_FOR_3.5_TO_4.0"]
              }
           }
       ]
     },
  
    // Add more ranges as needed to cover up to 5"
  
    // --- End population ---
  ];
  
  export default thickDoorPartsDataRanges;