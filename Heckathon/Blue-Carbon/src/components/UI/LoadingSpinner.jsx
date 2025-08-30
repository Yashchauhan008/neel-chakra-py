import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  const spinnerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const circleVariants = {
    start: {
      y: "0%"
    },
    end: {
      y: "100%"
    }
  };

  const circleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Spinner */}
      <motion.div
        className="flex space-x-2 mb-6"
        variants={spinnerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
            variants={circleVariants}
            transition={{
              ...circleTransition,
              delay: index * 0.1
            }}
          />
        ))}
      </motion.div>

      {/* Satellite Animation */}
      <motion.div
        className="mb-4"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <span className="text-4xl">🛰️</span>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-center relative z-10"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Fetching Satellite Data...
        </h3>
        <p className="text-gray-600 mb-4">
          Processing NDVI/EVI from Earth Engine
        </p>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-4 text-sm">
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Connecting to API</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Processing Images</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Calculating Indices</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-green-200/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
            "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
            "linear-gradient(315deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;
