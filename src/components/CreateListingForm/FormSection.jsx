import React from 'react';
import { motion } from 'framer-motion';

const FormSection = ({ children, title, grid = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {title && <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h3>}
      {grid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default FormSection;