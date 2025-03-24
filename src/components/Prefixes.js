import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Prefixes() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '20px' }}
    >
      <h1>Prefixes</h1>
      <p>Here's a list of common prefixes used in our system:</p>
      <table>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DEV-</td>
            <td>Device-related information</td>
          </tr>
          <tr>
            <td>FUNC-</td>
            <td>Function-related data</td>
          </tr>
          <tr>
            <td>USER-</td>
            <td>User-specific data</td>
          </tr>
        </tbody>
      </table>
      <p>More detailed prefix information will be available here.</p>
          <Link to="/">Back to Main Page</Link>
    </motion.div>
  );
}

export default Prefixes;