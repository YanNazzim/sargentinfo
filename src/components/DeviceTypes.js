import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Import styled components
import '../DeviceTypes.css'; // Import CSS
import N8300 from '../images/8300.png'
import N8400 from '../images/8400.png'

// Styled Link component
const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '←';
    margin-right: 10px;
    font-size: 18px;
  }
`;

function DeviceTypes() {
  const deviceTypes = [
    {
      name: '8300 - Narrow Stile Mortise Exit',
      image: N8300,
      link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=28',
    },
    {
      name: 'MD8400 - Narrow Stile Concealed Vertical Rod Exit <br /><br /> (Hollow Metal Doors Only - usually Iron)',
      image: N8400,
      link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=31',
    },
    {
      name: 'AD8400 - Narrow Stile Concealed Vertical Rod Exit <br /><br /> (Aluminum Doors only)',
      image: N8400,
      link: 'https://www.sargentlock.com/en/view-pdf?id=AADSS1004788&page=31',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="device-types-container"
    >
      <StyledLink to="/">Back to Home Page</StyledLink>
      <h1>Device Types</h1>
      <p>Here's a list of device types we support:</p>
      <table className="device-table">
        <thead>
          <tr>
            <th>Device</th>
            <th>Image</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {deviceTypes.map((device, index) => (
            <tr key={index}>
              <td>
                <span dangerouslySetInnerHTML={{ __html: device.name }} />
              </td>              <td>
                <img src={device.image} alt={device.name} className="device-image" />
              </td>
              <td>
                {device.link && (
                  <a href={device.link} target="_blank" rel="noopener noreferrer">
                    Catalog Link
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>More details about each type will be added here.</p>
    </motion.div>
  );
}

export default DeviceTypes;