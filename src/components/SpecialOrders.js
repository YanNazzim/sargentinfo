import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SpecialOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '20px' }}
    >
      <h1>Special Orders</h1>
      <p>Information about special orders and requests:</p>
      <p>To place a special order, please contact our support team.</p>
      <p>Examples of special orders include:</p>
      <ul>
        <li>Custom device configurations</li>
        <li>Advanced function requests</li>
        <li>Specific data reports</li>
      </ul>
          <Link to="/">Back to Main Page</Link>
    </motion.div>
  );
}

export default SpecialOrders;