'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FeatureStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

interface FeatureTourProps {
  onClose?: () => void;
}

const FeatureTour = ({ onClose }: FeatureTourProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: FeatureStep[] = [
    {
      icon: (
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 48 48" fill="none">
            <path
              d="M8 12C8 8.68629 10.6863 6 14 6H34C37.3137 6 40 8.68629 40 12V36C40 39.3137 37.3137 42 34 42H14C10.6863 42 8 39.3137 8 36V12Z"
              fill="#E5E7EB"
            />
            <path
              d="M14 14H34V18H14V14Z"
              fill="#9CA3AF"
            />
            <path
              d="M14 22H28V26H14V22Z"
              fill="#9CA3AF"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Offline Access",
      description: "Access and edit your files without an internet connection.",
      buttonText: "Learn More"
    },
    {
      icon: (
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L30.09 15.26L42 16.27L33 24.74L35.18 36.02L24 30.77L12.82 36.02L15 24.74L6 16.27L17.91 15.26L24 4Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
      ),
      title: "Smart Sync",
      description: "Automatically sync your files across all your devices.",
      buttonText: "Learn More"
    },
    {
      icon: (
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z"
              fill="#9CA3AF"
            />
            <path
              d="M24 16V24L30 28"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time.",
      buttonText: "Learn More"
    },
    {
      icon: (
        <div className="relative">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M8 8H40V40H8V8Z"
              fill="#9CA3AF"
              rx="4"
            />
            <path
              d="M16 16H32V20H16V16Z"
              fill="white"
            />
            <path
              d="M16 24H28V28H16V24Z"
              fill="white"
            />
          </svg>
        </div>
      ),
      title: "Advanced Security",
      description: "Your data is protected with enterprise-grade security.",
      buttonText: "Learn More"
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (step: number) => {
    if (step !== currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 relative"
        initial={{ 
          scale: 0.5, 
          opacity: 0,
          rotateX: -90,
          rotateY: 45
        }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateX: 0,
          rotateY: 0
        }}
        exit={{ 
          scale: 0.5, 
          opacity: 0,
          rotateX: 90,
          rotateY: -45
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.8
        }}
      >
        {/* Close Button */}
        <motion.button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>

        {/* Icon */}
        <motion.div 
          className="flex justify-center mb-6"
          key={`icon-${currentStep}`}
          initial={{ 
            scale: 0.9, 
            opacity: 0,
            rotate: -180,
            y: 200,
            x:-200,
          }}
          animate={{ 
            scale: 1.2, 
            opacity: 1,
            rotate: 0,
            y: 0,
            x:0
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.8,
            delay: 0.2
          }}
          whileHover={{ 
            scale: 1.4,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.6 }
          }}
        >
          {currentStepData.icon}
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          key={`title-${currentStep}`}
          initial={{ 
            y: 30, 
            opacity: 0,
            scale: 0.8
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
            delay: 0.4
          }}
        >
          {currentStepData.title}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-gray-600 text-center text-lg mb-8 leading-relaxed"
          key={`description-${currentStep}`}
          initial={{ 
            y: 20, 
            opacity: 0,
            scale: 0.9
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
            delay: 0.6
          }}
        >
          {currentStepData.description}
        </motion.p>

        {/* Learn More Button */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
            delay: 0.8
          }}
        >
          <motion.button 
            onClick={nextStep}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium"
            whileHover={{ 
              scale: 1.15,
              backgroundColor: "#D1D5DB",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ 
              scale: 0,
              rotate: -180,
              opacity: 0 
            }}
            animate={{ 
              scale: 1,
              rotate: 0,
              opacity: 1 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17, 
              duration: 0.8,
              delay: 0.8 
            }}
          >
            {currentStepData.buttonText}
          </motion.button>
        </motion.div>

        {/* Pagination Dots */}
        <motion.div 
          className="flex justify-center space-x-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
            delay: 1.0
          }}
        >
          {steps.map((step, index) => (
            <motion.button
              key={`step-${index + 1}`}
              onClick={() => goToStep(index + 1)}
              className={`w-3 h-3 rounded-full ${
                index + 1 === currentStep ? 'bg-gray-600' : 'bg-gray-300'
              }`}
              whileHover={{ 
                scale: 1.5,
                backgroundColor: index + 1 === currentStep ? "#374151" : "#9CA3AF"
              }}
              whileTap={{ scale: 0.8 }}
              animate={{ 
                scale: index + 1 === currentStep ? 1.3 : 1,
                backgroundColor: index + 1 === currentStep ? "#374151" : "#D1D5DB"
              }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureTour;