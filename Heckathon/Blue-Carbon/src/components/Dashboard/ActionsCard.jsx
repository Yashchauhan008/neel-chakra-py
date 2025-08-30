import { motion } from 'framer-motion';
import { exportToCSV } from '../../utils/export';

const ActionsCard = ({ ndviData, prediction }) => {
  const handleExportCSV = () => {
    exportToCSV(ndviData, prediction);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      whileHover={{ y: -5, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2 icon-shadow">⚡</span> Actions
      </h3>
      <div className="space-y-3">
        <motion.button 
          onClick={handleExportCSV}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="icon-shadow">📊</span>
          <span>Export CSV</span>
        </motion.button>
        <motion.button 
          onClick={() => window.print()}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="icon-shadow">🖨️</span>
          <span>Print Report</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActionsCard;
