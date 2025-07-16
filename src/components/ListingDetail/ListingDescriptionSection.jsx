import React from 'react';
import { motion } from 'framer-motion';

const ListingDescriptionSection = ({ description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {description || "Aucune description fournie."}
      </p>
    </motion.div>
  );
};

export default ListingDescriptionSection;