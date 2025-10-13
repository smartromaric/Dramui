'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Save, Copy, Share, Trash2, X } from 'lucide-react';

interface ActionButton {
  id: string;
  label: string;
  icon: React.ReactElement;
  color: string;
  onClick: () => void;
}

const InlineOverflow = () => {
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

  // Animation variants - Plus besoin de changer la largeur du conteneur
  const containerVariants = {
    collapsed: {
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };



  return (
    <div className=' min-w-1/3 '>
    <div className="flex  cursor-pointer rounded-full">
      <motion.div
        className="flex items-center gap-2"
        variants={containerVariants}
        initial="collapsed"
        onClick={() => setIsExpanded(!isExpanded)}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        {/* Always Visible Buttons (Left) */}
        <motion.div 
          className="flex items-center gap-2"
          animate={{
            x: isExpanded ? -30 : 0, // Glisse plus vers la gauche à l'ouverture
            transition: { 
              type: "spring" as const, 
              stiffness: 300, // Plus élastique
              damping: 20,   // Moins d'amortissement pour plus de rebond
              delay: isExpanded ? 0 : 0.2
            }
          }}
        >
          {actionButtons.slice(0, 2).map((button) => (
            <motion.button
              key={button.id}
              className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 flex items-center gap-2 text-gray-700 font-medium hover:shadow-md transition-shadow duration-200"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { type: "spring" as const, stiffness: 400, damping: 10 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { type: "spring" as const, stiffness: 400, damping: 10 }
              }}
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
          animate={{
            scale: isExpanded ? 1.15 : 1, // Plus d'agrandissement
            x: 0, // Suppression du décalage pour éviter le décalage global
            transition: { 
              type: "spring" as const, 
              stiffness: 300, // Plus élastique
              damping: 20,   // Plus de rebond
              delay: isExpanded ? 0 : 0.2 // Synchronisation avec les boutons de gauche
            }
          }}
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

        {/* Expandable Panel (Right) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 0, scale: 0.8 }} // Commence plus loin à gauche
              animate={{ 
                opacity: 1, 
                x: 30, // Glisse vers la droite pour s'écarter du centre
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                x: 30,
                scale: 0.8,
                transition: {
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 25,
                  delay: 0.1
                }
              }}
              transition={{ 
                type: "spring" as const, 
                stiffness: 300, // Plus élastique
                damping: 20,   // Plus de rebond
                staggerChildren: 0.1
              }}
            >
              {actionButtons.slice(2).map((button, index) => (
                <motion.button
                  key={button.id}
                  className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 flex items-center gap-2 text-gray-700 font-medium hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity: 0, scale: 0.8, x: -30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    x: -30
                  }}
                  transition={{ 
                    type: "spring" as const, 
                    stiffness: 300, // Plus élastique
                    damping: 20,   // Plus de rebond
                    delay: index * 0.05
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                  }}
                  onClick={button.onClick}
                >
                  {button.icon}
                  <span className="whitespace-nowrap">{button.label}</span>
                </motion.button>
              ))}
              
              {/* Close Button */}
              <motion.button
                className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, scale: 0.8, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: -30
                }}
                transition={{ 
                  type: "spring" as const, 
                  stiffness: 300, // Plus élastique
                  damping: 20,   // Plus de rebond
                  delay: 0.3
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 90,
                  transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                }}
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </div>
  );
};

export default InlineOverflow;