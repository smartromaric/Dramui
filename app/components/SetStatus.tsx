'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';


interface StatusOption {
  id: string;
  icon: string;
  label: string;
  color: string;
}

const SetStatus = () => {   
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statusOptions: StatusOption[] = [
    { id: 'vacation', icon: '🏖️', label: 'Vacation', color: '#10B981' },
    { id: 'sick', icon: '🤒', label: 'Sick', color: '#F59E0B' },
    { id: 'meeting', icon: '📅', label: 'In a Meeting', color: '#EF4444' },
    { id: 'workout', icon: '👟', label: 'Working Out', color: '#6366F1' },
    { id: 'commute', icon: '🚌', label: 'Commuting', color: '#8B5CF6' },
    { id: 'more', icon: '⋯', label: 'More', color: '#6B7280' }
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const handleStatusSelect = (statusId: string) => {
    // Sélection unique : un seul statut à la fois
    setSelectedStatus(statusId);
    setIsOpen(false);
  };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Container relatif pour positionner le panel */}
      <div className="relative flex flex-col items-center">
        {/* Status Options Panel - Positionné en absolu au-dessus du bouton */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute -top-30 bg-gray-50/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 p-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Status Options in Line */}
              <div className="flex justify-center gap-6">
                {statusOptions.map((option) => (
                  <div key={option.id} className="relative group">
                    <motion.button
                      className="w-14 h-14 rounded-full text-gray-500 bg-gray-100 shadow-sm border border-gray-100 flex items-center justify-center text-2xl hover:shadow-lg transition-all duration-200"
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleStatusSelect(option.id)}
                    >
                      <motion.span
                        whileHover={{ 
                          scale: 1.2,
                        //   rotate: option.id === 'more' ? 90 : 0
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {option.icon}
                      </motion.span>
                    </motion.button>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 pointer-events-none whitespace-nowrap z-10 group-hover:opacity-100 transition-opacity duration-200">
                      {option.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Set Status Button - Reste toujours à la même position */}
        <motion.button
          className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(!isOpen)}
        >
        {/* Selected Status Icon or Settings Icon */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-5 h-5 flex items-center justify-center"
            key={selectedStatus}
            initial={{ scale: 0.8, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {selectedStatus ? (
              <span className="text-lg grayscale text-gray-500">
                {statusOptions.find(s => s.id === selectedStatus)?.icon}
              </span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="2"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#6B7280" strokeWidth="2"/>
              </svg>
            )}
          </motion.div>

         
        </div>
        
        <motion.span 
          className="text-gray-700 font-medium"
          key={selectedStatus}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {selectedStatus ? statusOptions.find(s => s.id === selectedStatus)?.label : 'Set Status'}
        </motion.span>
         {/* Close button for selected status */}
         {selectedStatus && (
            <motion.button
              className="w-4 h-4 flex items-center bg-gray-200 justify-center hover:bg-gray-300 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStatus(null);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SetStatus;