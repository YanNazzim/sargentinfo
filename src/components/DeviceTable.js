import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import functionDescriptions from "./functionDescriptions"; // Import descriptions

// --- Styled Components (Updated for new look) ---

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85); /* Darker overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
  max-width: 80vw;
  max-height: 80vh;
  cursor: default;
  transform: scale(0.8);
  opacity: 0;
  animation: scaleUp 0.3s 0.1s forwards;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  }

  @keyframes scaleUp {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ExternalLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  color: white; /* Text color is now white */
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 4px;
  text-decoration: none;

  /* --- Vibrant Gradient Style (Matching Navbar) --- */
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); 

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    color: white; 
  }
`;

const FunctionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  /* --- Vibrant Gradient Style (Inverted for differentiation) --- */
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;

const PopupBubble = styled.div`
  position: fixed;
  background-color: #3a3a3a; /* Dark background */
  color: #e0e0e0; /* Light text */
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  font-size: 1rem;
  max-width: 350px; 
  text-align: left;
  border: 1px solid #ffeb3b; /* Accent border */
  line-height: 1.4;

  strong {
    color: #FFEB3B; /* Accent color for the combined code/prefix */
    display: block;
    margin-top: 5px;
    font-size: 1.1em;
  }
  
  /* Chat bubble pointer (pointing up) */
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: calc(50% + var(--arrow-offset, 0px));
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: #3a3a3a transparent transparent transparent;
    z-index: 1002;
  }
`;

// StyledTable is changed to separate rows for better styling
const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate; 
  border-spacing: 0 10px; /* Space between rows */
  margin-top: 20px;
  background-color: transparent; 
  box-shadow: none; 
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
    thead { display: none; }
    tbody { display: block; }
  }
`;

const StyledTh = styled.th`
  background: #1e1e1e; /* Match header bar */
  padding: 15px;
  font-weight: 600;
  color: #FFEB3B; /* Vibrant accent color for headers */
  text-align: Center;
  font-size: 1.1em;
  border-bottom: 2px solid #444; 
  text-transform: uppercase;
`;

const StyledTd = styled.td`
  white-space: pre-line;
  padding: 15px 10px; 
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 1.05em;
  line-height: 1.5;
  border-bottom: none;
  vertical-align: middle;

  /* Apply rounded corners to the first/last TD to match TR */
  &:first-child {
    border-radius: 10px 0 0 10px;
    padding-left: 20px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
    padding-right: 20px;
  }

  @media (max-width: 768px) {
    display: block;
    text-align: left;
    padding: 10px 15px; 
    padding-left: 50%; 
    font-size: 1em;

    /* Remove border radius from all TD's on mobile since TR handles it */
    &:first-child, &:last-child {
      border-radius: 0;
      padding-left: 50%; 
      padding-right: 15px;
    }

    &:before {
      content: attr(data-label);
      position: absolute;
      left: 15px; /* Adjusted from 6px */
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
      color: #bdbdbd;
      width: 40%;
      text-align: left;
      /* Specific override for functions label to prevent overlap */
      &[data-label="Functions Available"] {
          top: 10px;
          transform: translateY(0);
      }
    }
  }
`;

const StyledImage = styled.img`
  max-width: 120px;
  max-height: 120px;
  display: block;
  margin: 5px auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  background-color: #3a3a3a; /* Dark background for transparent images */
  transition: transform 0.2s ease-in-out;
  cursor: pointer; 

  &:hover {
    transform: scale(1.08);
  }
`;

const StyledTableRow = styled.tr`
  /* Set background and shadow on the row block */
  background-color: #2a2a2a; 
  border-radius: 10px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  /* Ensure inner cells inherit the border radius visually */
  & > td:first-child {
      border-radius: 10px 0 0 10px;
  }
  & > td:last-child {
      border-radius: 0 10px 10px 0;
  }

  &:hover {
    background-color: #333;
    transform: translateY(-3px); 
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
`;
// --- End of Styled Components ---

function DeviceTable({ devices, seriesName }) {
  const [popup, setPopup] = useState({
    visible: false,
    content: "",
    targetRef: null,
  });
  const popupRef = useRef(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const handleFunctionClick = (event, funcCode, deviceName) => {
    const baseDescription =
      functionDescriptions[funcCode] || "Description not found.";
    let popupContent = baseDescription;

    if (seriesName !== "20 Series" && seriesName !== "30 Series" && seriesName !== "7000 Series") {
      const match = deviceName.match(
        /^(PE\d{2}|MD\d{2}|AD\d{2}|WD\d{2}|\d{4}|\d{2})/
      );
      let devicePrefix = match ? match[1] : "";

      if (devicePrefix.length === 4 && !/^(PE|MD|AD|WD)/.test(devicePrefix)) {
        devicePrefix = devicePrefix.substring(0, 2);
      }

      const combinedCode = devicePrefix ? devicePrefix + funcCode : "";
      if (combinedCode) {
        // Use <strong> tags for accent color inside the popup
        popupContent = `${baseDescription}<br/><br/><strong>(Combined Order Code: ${combinedCode})</strong>`;
      }
    }

    setPopup({
      visible: true,
      content: popupContent,
      targetRef: event.currentTarget,
    });
  };

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
    const verticalGap = 8;

    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth <= mobileBreakpoint;

    let style = {
      display: "block",
      position: "fixed",
      top: `${buttonRect.top - verticalGap}px`,
      transform: "translateY(-100%)",
      width: "max-content",
      maxWidth: "90vw",
      "--arrow-offset": "0px",
    };

    if (isMobile) {
      // Center the bubble horizontally on the screen
      style.left = "50%";
      style.transform = "translateX(-50%) translateY(-100%)";

      // Calculate the arrow's offset needed relative to the centered bubble
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const screenCenterX = window.innerWidth / 2;
      const arrowOffset = buttonCenterX - screenCenterX;
      style["--arrow-offset"] = `${arrowOffset}px`;
    } else {
      // Desktop Logic
      style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      style.transform = "translateX(-50%) translateY(-100%)";
      style.maxWidth = "350px";
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

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Image</StyledTh>
            <StyledTh>Device</StyledTh>
            <StyledTh>Functions Available</StyledTh>
            <StyledTh>Catalog Link</StyledTh>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <StyledTableRow key={index}>
              <StyledTd data-label="Image">
                {device.image && (
                  <StyledImage
                    src={device.image}
                    alt={`Image of ${device.name.replace(/<[^>]*>?/gm, "")}`}
                    onClick={() => openLightbox(device.image)}
                  />
                )}
              </StyledTd>
              <StyledTd data-label="Device">
                <span dangerouslySetInnerHTML={{ __html: device.name }} />
              </StyledTd>

              <StyledTd data-label="Functions Available">
                {(() => {
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
                      .filter((f) => f);

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

                  if (codesToMap.length > 0) {
                    return codesToMap.map((funcCode, funcIndex) => (
                      <FunctionButton
                        key={funcIndex}
                        onClick={(e) =>
                          handleFunctionClick(e, funcCode, device.name)
                        }
                      >
                        {funcCode}
                      </FunctionButton>
                    ));
                  } else if (descriptionHtml) {
                    return (
                      <span
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                      />
                    );
                  } else {
                    return null;
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
          <span dangerouslySetInnerHTML={{ __html: popup.content }} />
        </PopupBubble>
      )}

      {/* Lightbox Rendering */}
      {isLightboxOpen && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxImageContainer onClick={handleImageClickInLightbox}>
            <img src={lightboxImage} alt="Enlarged device view" />
          </LightboxImageContainer>
        </LightboxOverlay>
      )}
    </>
  );
}

export default DeviceTable;