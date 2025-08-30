import { motion } from 'framer-motion';
import { getHealthStatus } from '../../utils/healthStatus';

const CurrentStatusCard = ({ ndviData }) => {
  const currentHealth = ndviData.length > 0 ? getHealthStatus(ndviData[ndviData.length - 1]?.NDVI || 0) : null;

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      whileHover={{ y: -5, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2 icon-shadow">📊</span> Current Status
      </h3>
      {currentHealth && (
        <motion.div 
          className={`text-2xl font-bold ${currentHealth.color} mb-2 flex items-center`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="mr-2 icon-shadow">{currentHealth.icon}</span>
          {currentHealth.status}
        </motion.div>
      )}
      <div className="space-y-3">
        <motion.div 
          className="bg-green-50 p-3 rounded-lg border border-green-200"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-green-700 font-medium">NDVI:</span>
          <span className="ml-2 font-bold text-green-800 text-lg">
            {(ndviData[ndviData.length - 1]?.NDVI || 0).toFixed(3)}
          </span>
        </motion.div>
        <motion.div 
          className="bg-blue-50 p-3 rounded-lg border border-blue-200"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-blue-700 font-medium">EVI:</span>
          <span className="ml-2 font-bold text-blue-800 text-lg">
            {(ndviData[ndviData.length - 1]?.EVI || 0).toFixed(3)}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrentStatusCard;
