import { getHealthStatus } from '../../utils/healthStatus';
import { motion } from 'framer-motion';

const DataTable = ({ ndviData }) => {
  const getHealthBadge = (health) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1";
    const healthIcons = {
      'Healthy': '🟢',
      'Moderate': '🟡', 
      'Poor': '🔴',
      'Very Poor': '🔴'
    };
    
    return (
      <span className={`${baseClasses} ${health.color}`}>
        <span>{healthIcons[health.status] || '⚪'}</span>
        <span>{health.status}</span>
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-xl font-bold mb-6 text-gray-800 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="mr-3 text-2xl">📋</span>
        <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Detailed Data Analysis
        </span>
      </motion.h3>
      
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                📅 Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                🌿 NDVI
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                🌱 EVI
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                🏥 Health Status
              </th>
            </tr>
          </thead>
          <motion.tbody 
            className="bg-white divide-y divide-gray-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {ndviData.map((item, index) => {
              const health = getHealthStatus(item.NDVI || 0);
              return (
                <motion.tr 
                  key={index} 
                  className="hover:bg-gray-50/50 transition-colors duration-200"
                  variants={rowVariants}
                  whileHover={{ 
                    backgroundColor: "rgba(249, 250, 251, 0.8)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      {(item.NDVI || 0).toFixed(3)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {(item.EVI || 0).toFixed(3)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getHealthBadge(health)}
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
      
      <motion.div 
        className="mt-4 text-xs text-gray-500 flex justify-center space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center space-x-1">
          <span>🌿 NDVI:</span>
          <span>Normalized Difference Vegetation Index</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🌱 EVI:</span>
          <span>Enhanced Vegetation Index</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DataTable;
