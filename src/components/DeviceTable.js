import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import functionDescriptions from "./functionDescriptions"; // Import descriptions

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
  position: absolute;
  background-color: #3a3a3a; // Dark background
  color: #e0e0e0; // Light text
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 10;
  font-size: 24px;
  max-width: 250px; // Limit width
  text-align: left;
  /* Basic positioning - will be adjusted by state */
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px); // Adjust initial position above button

  /* Chat bubble pointer */
  &::after {
    content: "";
    position: absolute;
    top: 100%; // Position arrow at the bottom
    left: 70%;
    margin-left: -8px; // Center the arrow
    border-width: 8px;
    border-style: solid;
    border-color: #3a3a3a transparent transparent transparent; // Arrow points down
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
    /* Set the data-label attribute for mobile */
    &:nth-of-type(1):before {
      content: "Device";
    }
    &:nth-of-type(2):before {
      content: "Functions Available";
    }
    &:nth-of-type(3):before {
      content: "Image";
    }
    &:nth-of-type(4):before {
      content: "Link";
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

function DeviceTable({ devices }) {
  const [popup, setPopup] = useState({
    visible: false,
    content: "",
    targetRef: null,
  });
  const popupRef = useRef(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const handleFunctionClick = (event, funcCode) => {
    const description =
      functionDescriptions[funcCode] || "Description not found.";
    setPopup({
      visible: true,
      content: description,
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

    const targetRect = popup.targetRef.getBoundingClientRect();
    const tableRect = popup.targetRef.closest("table")?.getBoundingClientRect();

    if (!tableRect) return { display: "none" };

    return {
      display: "block",
      bottom: `${window.innerHeight - targetRect.top - window.scrollY + 10}px`,
      left: `${targetRect.left + targetRect.width / 2 - tableRect.left}px`,
      transform: "translateX(-50%)",
    };
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImage("");
    document.body.style.overflow = 'auto';
  };

  const handleImageClickInLightbox = (event) => {
    event.stopPropagation();
  };

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
              <StyledTd data-label="Device">
                <span dangerouslySetInnerHTML={{ __html: device.name }} />
              </StyledTd>

              <StyledTd
                data-label="Functions Available"
                style={{ position: "relative" }}
              >
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
                      .filter((f) => f && /^\d+$/.test(f));

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
                        onClick={(e) => handleFunctionClick(e, funcCode)}
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

              <StyledTd data-label="Image">
                {device.image && (
                  <StyledImage
                    src={device.image}
                    alt={`Image of ${device.name.replace(/<[^>]*>?/gm, '')}`}
                    onClick={() => openLightbox(device.image)}
                  />
                )}
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

      {popup.visible && (
        <PopupBubble ref={popupRef} style={getPopupStyle()}>
          {popup.content}
        </PopupBubble>
      )}

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
