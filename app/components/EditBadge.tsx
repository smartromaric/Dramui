'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface BadgeData {
  text: string;
  iconId: string;
  color: string;
}

interface IconOption {
  id: string;
  icon: React.ReactElement;
  name: string;
}

interface ColorOption {
  id: string;
  color: string;
  name: string;
}

const EditBadge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconOptions: IconOption[] = [
    { 
      id: 'loading', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2" fill="#6B7280"/>
          <circle cx="12" cy="2" r="2" fill="#9CA3AF"/>
          <circle cx="17.66" cy="6.34" r="2" fill="#9CA3AF"/>
          <circle cx="22" cy="12" r="2" fill="#9CA3AF"/>
          <circle cx="17.66" cy="17.66" r="2" fill="#9CA3AF"/>
          <circle cx="12" cy="22" r="2" fill="#9CA3AF"/>
          <circle cx="6.34" cy="17.66" r="2" fill="#9CA3AF"/>
          <circle cx="2" cy="12" r="2" fill="#9CA3AF"/>
          <circle cx="6.34" cy="6.34" r="2" fill="#9CA3AF"/>
        </svg>
      ), 
      name: 'Loading' 
    },
    { 
      id: 'clock', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ), 
      name: 'Clock' 
    },
    { 
      id: 'timer', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" fill="#6B7280"/>
        </svg>
      ), 
      name: 'Timer' 
    },
    { 
      id: 'check', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#6B7280"/>
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ), 
      name: 'Check' 
    },
    { 
      id: 'minus', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#374151"/>
          <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ), 
      name: 'Minus' 
    }
  ];

  const [badgeData, setBadgeData] = useState<BadgeData>({
    text: 'Pending',
    iconId: 'timer', // Timer icon par défaut
    color: '#F59E0B'
  });

  const colorOptions: ColorOption[] = [
    { id: 'blue', color: '#3B82F6', name: 'Blue' },
    { id: 'yellow', color: '#EAB308', name: 'Yellow' },
    { id: 'orange', color: '#F59E0B', name: 'Orange' },
    { id: 'green', color: '#10B981', name: 'Green' },
    { id: 'red', color: '#EF4444', name: 'Red' },
    { id: 'cyan', color: '#06B6D4', name: 'Cyan' }
  ];

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: 15,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: -20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const iconVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      rotate: -180
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      rotate: -5
    }
  };

  const colorVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.3,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.8
    }
  };

  const handleUpdateBadge = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3 p-8">
      {/* Badge Display */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border"
        style={{ 
          backgroundColor: `${badgeData.color}20`,
          borderColor: `${badgeData.color}40`,
          color: badgeData.color
        }}
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <motion.span
          className="text-lg grayscale"
          variants={iconVariants}
        >
          {iconOptions.find(icon => icon.id === badgeData.iconId)?.icon}
        </motion.span>
        <span className="font-semibold">{badgeData.text}</span>
      </motion.div>

      {/* Edit Button */}
      <motion.button
        className="w-10 h-10 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ 
          scale: 1.1,
          rotate: 5
        }}
        whileTap={{ 
          scale: 0.9,
          rotate: -5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Edit2 className="w-4 h-4 text-gray-500" />
       
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-white bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Edit Badge</h2>
                  <motion.button
                    className="w-8 h-8 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-full flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                    whileHover={{ 
                      scale: 1.1,
                    //   rotate: 90
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    X
                  </motion.button>
                </div>

                {/* Text Input */}
                <div className="mb-6 text-gray-900 text-lg font-bold">
                  <motion.input
                    type="text"
                    value={badgeData.text}
                    onChange={(e) => setBadgeData({...badgeData, text: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    placeholder="Badge text"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

                {/* Icon Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Choose Icon</h3>
                  <div className="flex gap-3 grayscale">
                    {iconOptions.map((icon) => (
                      <motion.button
                        key={icon.id}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-200 ${
                          badgeData.iconId === icon.id 
                            ? 'ring-2 ring-gray-800 bg-gray-100' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setBadgeData({...badgeData, iconId: icon.id})}
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                      >
                        {icon.icon}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Choose Color</h3>
                  <div className="flex gap-3">
                    {colorOptions.map((color) => (
                      <motion.button
                        key={color.id}
                        className={`w-10 h-10 rounded-full relative ${
                          badgeData.color === color.color 
                            ? 'ring-2 ring-gray-800 ring-offset-2' 
                            : ''
                        }`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => setBadgeData({...badgeData, color: color.color})}
                        variants={colorVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        {badgeData.color === color.color && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" stroke="white" />
      </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Update Button */}
                <motion.button
                  className="w-full text-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-full transition-colors"
                  onClick={handleUpdateBadge}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: 0
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Update Badge
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditBadge;