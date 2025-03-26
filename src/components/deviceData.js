//80 Series Pics
import N8300 from "../images/8300.png";
import N8400 from "../images/8400.png";
import N8500 from "../images/8500.png";
import W8600 from "../images/8600.png";
import W8700 from "../images/8700.png";
import W8800 from "../images/8800.png";
import W8900 from "../images/8900.png";

//PE80 Series Pics
import PEN8300 from "../images/PE8300.png";
import PEN8400 from "../images/PE8400.png";
import PEN8500 from "../images/PE8500.png";
import PEW8600 from "../images/PE8600.png";
import PEW8700 from "../images/PE8700.png";
import PEW8800 from "../images/PE8800.png";
import PEW8900 from "../images/PE8900.png";

// This file contains the data for the devices, including their names, functions, images, and links to their respective PDFs.


const deviceData = [
  {
    series: "80 Series",
    devices: [
      {
        name: "8300 - Narrow Stile Mortise Exit",
        functions: "04, 10, 13, 15, 28, 40, 43, 44, 63, 73, 74, ,75, 76",
        image: N8300,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=28",
      },
      {
        name: "MD8400 - Narrow Stile Concealed Vertical Rod Exit <br /><br /> (Hollow Metal Doors Only - Usually Iron)",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: N8400,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=30",
      },
      {
        name: "AD8400 - Narrow Stile Concealed Vertical Rod Exit <br /><br /> (Aluminum Doors only)",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: N8400,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=32",
      },
      {
        name: "8500 - Narrow Stile Rim Exit (Latch is in chassis)",
        functions: "04, 06, 10, 13, 15, 40, 43, 44, 73, 74",
        image: N8500,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=24",
      },
      {
        name: "WD8600 - Wide Stile Concealed Vertical Rod Exit <br/><br/> Wood Door Only",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: W8600,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=22",
      },
      {
        name: "MD8600 - Wide Stile Concealed Vertical Rod Exit <br/><br/> (Hollow Metal Door Only - Usually Iron)",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: W8600,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=18",
      },
      {
        name: "AD8600 - Wide Stile Concealed Vertical Rod Exit <br/><br/> (Hollow Metal Door Only - Usually Iron)",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: W8600,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=20",
      },
      {
        name: "8700 - Wide Stile Surface Vertical Rod Exit <br/><br/> Rods are visible from the outside face of door",
        functions: "06, 10, 13, 15, 28, 40, 43, 46, 62, 63,  73, 74",
        image: W8700,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=14",
      },
      {
        name: "8800 - Wide Stile Rim Exit (Latch is in chassis)",
        functions: "04, 06, 10, 13, 15, 28, 40, 43, 44, 46, 63, 66, 73, 74, 75, 76",
        image: W8800,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=10",
      },
      {
        name: "8900 - Wide Stile Mortise Exit (Has a Mortise Lockbody in the side of door)",
        functions: "04, 06, 10, 13, 15, 28, 40, 43, 44, 46, 63, 66, 73, 74, 75, 76",
        image: W8900,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=12",
      },
    ],
  },
  {
    series: "PE80 Series",
    devices: [
      {
        name: "PE8300 - Narrow Stile Mortise Exit",
        functions: "04, 10, 13, 15, 28, 40, 43, 44, 63, 73, 74, ,75, 76",
        image: PEN8300,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=61",
      },
      {
        name: "PE8400 - Narrow Stile Concealed Vertical Rod Exit <br /><br /> (Hollow Metal Doors Only - Usually Iron)",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: PEN8400,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=61",
      },
      {
        name: "PE8500 - Narrow Stile Rim Exit (Latch is in chassis)",
        functions: "04, 06, 10, 13, 15, 40, 43, 44, 73, 74",
        image: PEN8500,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=10",
      },
      {
        name: "PE8600 - Wide Stile Concealed Vertical Rod Exit <br/><br/> Wood Door Only",
        functions: "06, 10, 13, 15, 40, 43, 46, 73, 74",
        image: PEW8600,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=67",
      },

      {
        name: "PE8700 - Wide Stile Surface Vertical Rod Exit <br/><br/> Rods are visible from the outside face of door",
        functions: "06, 10, 13, 15, 28, 40, 43, 46, 62, 63,  73, 74",
        image: PEW8700,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=32",
      },
      {
        name: "PE8800 - Wide Stile Rim Exit (Latch is in chassis)",
        functions: "04, 06, 10, 13, 15, 28, 40, 43, 44, 46, 63, 66, 73, 74, 75, 76",
        image: PEW8800,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=15",
      },
      {
        name: "PE8900 - Wide Stile Mortise Exit (Has a Mortise Lockbody in the side of door)",
        functions: "04, 06, 10, 13, 15, 28, 40, 43, 44, 46, 63, 66, 73, 74, 75, 76",
        image: PEW8900,
        link: "https://www.sargentlock.com/en/view-pdf?id=AADSS1234160&page=27",
      },
    ],
  },
];

export default deviceData;