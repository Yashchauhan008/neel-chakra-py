import { motion } from 'framer-motion';

const StatisticsCard = ({ ndviData }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      whileHover={{ y: -5, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2 icon-shadow">📈</span> Statistics
      </h3>
      <div className="space-y-3">
        <motion.div 
          className="bg-green-50 p-3 rounded-lg border border-green-200"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-green-700 font-medium">Avg NDVI:</span>
          <span className="ml-2 font-bold text-green-800 text-lg">
            {(ndviData.reduce((sum, d) => sum + (d.NDVI || 0), 0) / ndviData.length).toFixed(3)}
          </span>
        </motion.div>
        <motion.div 
          className="bg-blue-50 p-3 rounded-lg border border-blue-200"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-blue-700 font-medium">Avg EVI:</span>
          <span className="ml-2 font-bold text-blue-800 text-lg">
            {(ndviData.reduce((sum, d) => sum + (d.EVI || 0), 0) / ndviData.length).toFixed(3)}
          </span>
        </motion.div>
        <motion.div 
          className="bg-purple-50 p-3 rounded-lg border border-purple-200"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-purple-700 font-medium">Data Points:</span>
          <span className="ml-2 font-bold text-purple-800 text-lg">{ndviData.length}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatisticsCard;
