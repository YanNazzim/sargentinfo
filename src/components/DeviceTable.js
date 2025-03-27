import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import functionDescriptions from "./functionDescriptions"; // Import descriptions

// --- Styled Components (Keep all existing styled components as they are) ---

const LightboxOverlay = styled.div`
  position: fixed; /* Cover the entire viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Dark semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top */
  cursor: pointer; /* Indicate it's clickable to close */
  backdrop-filter: blur(5px); /* Optional: Add a blur effect */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  /* Add fade-in animation */
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const LightboxImageContainer = styled.div`
  position: relative;
  max-width: 80vw; /* Limit image width */
  max-height: 80vh; /* Limit image height */
  cursor: default; /* Override overlay cursor */
  /* Add scale-up animation */
  transform: scale(0.8);
  opacity: 0;
  animation: scaleUp 0.3s 0.1s forwards; /* Delay start slightly */

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 8px; /* Optional: rounded corners */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  @keyframes scaleUp {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ExternalLinkButton = styled.a`
  /* Copy base styles from FunctionButton */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  color: black;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 4px;
  text-decoration: none; // Remove underline from link

  /* --- Contrasting Style --- */
  background: linear-gradient(
    135deg,
    #ff8c00 0%,
    #ffc837 100%
  ); /* Example: Orange gradient */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: white; // Ensure hover text color is still white
  }
`;

const FunctionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px; // Slightly smaller padding for table use
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 6px; // Slightly smaller radius
  font-size: 24px; // Slightly smaller font
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 4px; // Add spacing between buttons

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const PopupBubble = styled.div`
  position: fixed;
  background-color: #f8f9fa;
  color: #212529;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  font-size: 24px;
  max-width: 300px; /* You might want to adjust this for mobile, e.g., 90vw */
  text-align: left;
  // top, left, transform, and --arrow-offset will be set by inline style

  /* Chat bubble pointer (pointing DOWN) */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    // highlight-start
    // Use CSS variable for horizontal offset, fallback to 0px
    left: calc(50% + var(--arrow-offset, 0px));
    // highlight-end
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: #f8f9fa transparent transparent transparent;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    /* Stacked layout for mobile */
    display: block;

    thead {
      display: none; /* Hide the table header */
    }

    tbody {
      display: block;

      tr {
        display: block;
        margin-bottom: 10px; /* Spacing between "rows" */
        border-bottom: 1px solid #333;
      }

      td {
        display: block;
        text-align: left;
        padding: 8px;
        border: none;
        position: relative;
        padding-left: 50%; /* Make space for the data-label */
        white-space: normal;
        word-wrap: break-word;

        &:before {
          /* Add a data-label */
          content: attr(data-label);
          position: absolute;
          left: 6px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
`;

const StyledTd = styled.td`
  // ... (keep existing styles outside media queries) ...
  white-space: pre-line;
  padding: 12px;
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 1.5em;
  line-height: 1.4;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    text-align: left;
    padding: 8px;
    border: none;
    position: relative;
    padding-left: 50%; // Make space for the data-label
    white-space: normal;
    word-wrap: break-word;

    &:before {
      content: attr(data-label); // Default content using data-label
      position: absolute;
      left: 6px;
      top: 8px; // Adjust vertical alignment if needed
      font-weight: bold;
      color: #fff;
      width: 45%; // Adjust width allocated to the label
      padding-right: 10px; // Space between label and content
      white-space: pre-wrap; // Allow wrapping and preserve whitespace/newlines
      text-align: left; // Align label text left
    }

    &:nth-of-type(1):before {
      content: "Device";
    }
    /* --- MODIFICATION HERE --- */
    &:nth-of-type(2):before {
      content: "Functions Available";
    }
    &:nth-of-type(3):before {
      content: "Image";
    }
    &:nth-of-type(4):before {
      content: "Link";
    }

    /* Optional: Adjust font-size for general mobile readability */
    font-size: 1em;
  }

  /* You can keep or remove the 480px media query based on previous changes */
  @media (max-width: 480px) {
    /* Styles for very small screens, potentially adjusting label/button sizes further */
    &[data-label="Functions Available"] {
      // ... previous 480px styles if needed ...
    }
    &:before {
      /* Adjust label styles specifically for < 480px if needed */
      /* e.g., font-size: 0.8em; */
    }
  }
`;

const StyledTh = styled.th`
  background: linear-gradient(to bottom, #333, #2a2a2a);
  padding: 15px;
  font-weight: 600;
  border-bottom: 2px solid #444;
  color: white;
  text-align: Center;
  font-size: 1.1em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  display: block;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
  cursor: pointer; /* Add pointer cursor to indicate it's clickable */

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    transition: background-color 0.2s ease-in-out;
  }
`;
// --- End of Styled Components ---

function DeviceTable({ devices, seriesName }) {
  // Add seriesName here
  const [popup, setPopup] = useState({
    visible: false,
    content: "",
    targetRef: null,
  });
  const popupRef = useRef(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  // *** MODIFIED handleFunctionClick ***
  const handleFunctionClick = (event, funcCode, deviceName) => {
    const baseDescription =
      functionDescriptions[funcCode] || "Description not found."; // [cite: uploaded:components/functionDescriptions.js]
    let popupContent = baseDescription; // Default to just the description

    // Check if the series is NOT "20 Series" or "30 Series"
    if (seriesName !== "20 Series" && seriesName !== "30 Series") {
      // Capture potential prefix (PE, MD, AD, WD, 4-digits, or 2-digits)
      const match = deviceName.match(
        /^(PE\d{2}|MD\d{2}|AD\d{2}|WD\d{2}|\d{4}|\d{2})/
      );
      let devicePrefix = match ? match[1] : ""; // Get the matched prefix

      // --- Add this logic to shorten the prefix if needed ---
      // If the captured prefix is 4 digits long AND does NOT start with PE/MD/AD/WD...
      if (devicePrefix.length === 4 && !/^(PE|MD|AD|WD)/.test(devicePrefix)) {
        // ...then take only the first 2 digits.
        devicePrefix = devicePrefix.substring(0, 2);
      }
      // --- End of added logic ---

      const combinedCode = devicePrefix ? devicePrefix + funcCode : "";
      if (combinedCode) {
        // Ensure backticks are used here
        popupContent = `${baseDescription} (${combinedCode})`;
      }
    }
    // If it IS 20 or 30 Series, popupContent remains just the baseDescription

    // Keep the setPopup call as is
    setPopup({
      visible: true,
      content: popupContent, // Use the conditionally determined content
      targetRef: event.currentTarget,
    });
  };

  // --- useEffect, Popup Style, Lightbox logic (Keep as is) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popup.visible &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        popup.targetRef &&
        !popup.targetRef.contains(event.target)
      ) {
        setPopup({ visible: false, content: "", targetRef: null });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popup]);

  const getPopupStyle = () => {
    if (!popup.visible || !popup.targetRef) return { display: "none" };

    const targetButton = popup.targetRef;
    const buttonRect = targetButton.getBoundingClientRect();
    const verticalGap = 8; // Gap above button

    // Define mobile breakpoint (adjust if your CSS uses a different one)
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth <= mobileBreakpoint;

    let style = {
      display: "block",
      position: "fixed",
      top: `${buttonRect.top - verticalGap}px`,
      // Base transform to place bottom edge correctly
      transform: "translateY(-100%)",
      width: "max-content", // Allow bubble to size naturally
      maxWidth: "90vw", // Limit width, especially on mobile
      "--arrow-offset": "0px", // Default arrow offset
    };

    if (isMobile) {
      // --- Mobile Logic ---
      // Center the bubble horizontally on the screen
      style.left = "50%";
      // Adjust transform to account for horizontal centering
      style.transform = "translateX(-50%) translateY(-100%)";

      // Calculate the arrow's offset needed relative to the centered bubble
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const screenCenterX = window.innerWidth / 2;
      const arrowOffset = buttonCenterX - screenCenterX;
      style["--arrow-offset"] = `${arrowOffset}px`; // Set the CSS variable
    } else {
      // --- Desktop Logic (Original) ---
      // Position bubble relative to the button
      style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      // Adjust transform for horizontal centering relative to button
      style.transform = "translateX(-50%) translateY(-100%)";
      // Ensure maxWidth is appropriate for desktop too
      style.maxWidth = "300px";
    }

    return style;
  };
  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage("");
    document.body.style.overflow = "auto";
  };

  const handleImageClickInLightbox = (event) => {
    event.stopPropagation();
  };
  // --- End of useEffect, Popup Style, Lightbox logic ---

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Device</StyledTh>
            <StyledTh>Functions Available</StyledTh>
            <StyledTh>Image</StyledTh>
            <StyledTh>Link</StyledTh>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <StyledTableRow key={index}>
              <StyledTd data-label="Image">
                {device.image && (
                  <StyledImage
                    src={device.image}
                    // Clean device name for alt text
                    alt={`Image of ${device.name.replace(/<[^>]*>?/gm, "")}`}
                    onClick={() => openLightbox(device.image)}
                  />
                )}
              </StyledTd>
              <StyledTd data-label="Device">
                {/* Use dangerouslySetInnerHTML to render potential HTML in names */}
                <span dangerouslySetInnerHTML={{ __html: device.name }} />
              </StyledTd>

              <StyledTd data-label="Functions Available">
                {(() => {
                  // --- Parsing logic (Keep as is) ---
                  const functionsData = device.functions;
                  let codesToMap = [];
                  let descriptionHtml = null;

                  if (Array.isArray(functionsData)) {
                    codesToMap = functionsData
                      .map((f) => String(f).trim())
                      .filter((f) => f);
                  } else if (typeof functionsData === "string") {
                    const trimmedString = functionsData.trim();
                    const potentialCodes = trimmedString
                      .split(",")
                      .map((f) => f.trim())
                      // highlight-start
                      .filter((f) => f); // Allow any non-empty string after trimming                    // highlight-end

                    if (
                      potentialCodes.length > 0 &&
                      !trimmedString.includes("<br") &&
                      trimmedString.length < 200
                    ) {
                      codesToMap = potentialCodes;
                    } else {
                      descriptionHtml = trimmedString;
                    }
                  }
                  // --- End function parsing ---

                  if (codesToMap.length > 0) {
                    return codesToMap.map((funcCode, funcIndex) => (
                      <FunctionButton
                        key={funcIndex}
                        // Pass device.name to the handler (no change here)
                        onClick={(e) =>
                          handleFunctionClick(e, funcCode, device.name)
                        }
                      >
                        {funcCode}
                      </FunctionButton>
                    ));
                  } else if (descriptionHtml) {
                    // Render non-button descriptions if applicable
                    return (
                      <span
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                      />
                    );
                  } else {
                    return null; // No functions or description
                  }
                })()}
              </StyledTd>


              <StyledTd data-label="Link">
                {device.link && (
                  <ExternalLinkButton
                    href={device.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Catalog Link
                  </ExternalLinkButton>
                )}
              </StyledTd>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>

      {/* Popup Rendering */}
      {popup.visible && (
        <PopupBubble ref={popupRef} style={getPopupStyle()}>
          {popup.content}
        </PopupBubble>
      )}

      {/* Lightbox Rendering */}
      {isLightboxOpen && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxImageContainer onClick={handleImageClickInLightbox}>
            <img src={lightboxImage} alt="Enlarged device view" />
          </LightboxImageContainer>
        </LightboxOverlay> // <-- Corrected closing tag
      )}
    </>
  );
}

export default DeviceTable;
