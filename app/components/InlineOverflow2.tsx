'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Save, Copy, Share, Trash2, X } from 'lucide-react';

interface ActionButton {
  id: string;
  label: string;
  icon: React.ReactElement;
  color: string;
  onClick: () => void;
}

const InlineOverflow2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actionButtons: ActionButton[] = [
    {
      id: 'save',
      label: 'Save',
      icon: <Save className="w-4 h-4" />,
      color: '#6B7280',
      onClick: () => console.log('Save clicked')
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <Copy className="w-4 h-4" />,
      color: '#6B7280',
      onClick: () => console.log('Copy clicked')
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share className="w-4 h-4" />,
      color: '#6B7280',
      onClick: () => console.log('Share clicked')
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      color: '#6B7280',
      onClick: () => console.log('Delete clicked')
    }
  ];

  // Animation variants
  const containerVariants = {
    collapsed: {
      width: 60,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    expanded: {
      width: 320,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const leftPanelVariants = {
    collapsed: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    expanded: {
      x: -130,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        delay: 0.1
      }
    }
  };

  const rightPanelVariants = {
    collapsed: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    expanded: {
      x: 130,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        delay: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: 0
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
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="flex items-center justify-center  cursor-pointer rounded-full  ">
      <motion.div
        className="relative flex items-center justify-center"
        variants={containerVariants}
        initial="collapsed"
        onClick={() => setIsExpanded(!isExpanded)}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        {/* Left Panel */}
        <motion.div
          className="absolute left-0 flex items-center gap-2"
          variants={leftPanelVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          {actionButtons.slice(0, 2).map((button) => (
            <motion.button
              key={button.id}
              className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 flex items-center gap-2 text-gray-700 font-medium hover:shadow-md transition-shadow duration-200"
              variants={buttonVariants}
              initial="hidden"
              animate={isExpanded ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
              onClick={button.onClick}
            >
              {button.icon}
              <span className="whitespace-nowrap">{button.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Center Trigger Button */}
        <motion.button
          className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:shadow-md transition-shadow duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
          }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
          >
            {isExpanded ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="flex flex-row gap-1">
                
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </motion.div>
        </motion.button>

        {/* Right Panel */}
        <motion.div
          className="absolute right-0 flex items-center gap-2"
          variants={rightPanelVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          {actionButtons.slice(2).map((button) => (
            <motion.button
              key={button.id}
              className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 flex items-center gap-2 text-gray-700 font-medium hover:shadow-md transition-shadow duration-200"
              variants={buttonVariants}
              initial="hidden"
              animate={isExpanded ? "visible" : "hidden"}
              whileHover="hover"
              whileTap="tap"
              onClick={button.onClick}
            >
              {button.icon}
              <span className="whitespace-nowrap">{button.label}</span>
            </motion.button>
          ))}
          
          {/* Close Button */}
          <motion.button
            className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:shadow-md transition-shadow duration-200"
            variants={closeButtonVariants}
            initial="hidden"
            animate={isExpanded ? "visible" : "hidden"}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InlineOverflow2;