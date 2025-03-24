import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Functions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '20px' }}
    >
      <h1>Functions</h1>
      <p>These are the core functions our system provides:</p>
      <ol>
        <li>Data Retrieval</li>
        <li>System Configuration</li>
        <li>User Management</li>
        <li>Reporting</li>
      </ol>
      <p>Detailed explanations for each function will appear here.</p>
      <Link to="/">Back to Main Page</Link>
    </motion.div>
  );
}

export default Functions;