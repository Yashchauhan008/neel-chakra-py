import { motion } from 'framer-motion';
import CurrentStatusCard from './CurrentStatusCard';
import StatisticsCard from './StatisticsCard';
import ActionsCard from './ActionsCard';
import { datasets } from '../../utils/config';

const DashboardCards = ({ ndviData, prediction, currentDataset }) => {
  if (ndviData.length === 0) return null;

  const datasetInfo = datasets[currentDataset] || datasets['MODIS/006/MOD13Q1'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dataset Information Banner */}
      <motion.div 
        className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 mb-8 shadow-xl"
        variants={itemVariants}
      >
        <div className="flex items-start justify-between flex-wrap">
          <div className="flex items-start space-x-4 flex-1">
            <motion.span 
              className="text-3xl icon-shadow"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🛰️
            </motion.span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{datasetInfo.name}</h3>
              <p className="text-gray-700 mb-3">{datasetInfo.description}</p>
              
              {/* Enhanced Dataset Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  <span className="text-blue-600 block text-xs uppercase tracking-wide font-medium">📏 Resolution</span>
                  <span className="font-bold text-blue-900 text-sm">{datasetInfo.spatial_resolution}</span>
                </div>
                <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <span className="text-green-600 block text-xs uppercase tracking-wide font-medium">⏱️ Revisit</span>
                  <span className="font-bold text-green-900 text-sm">{datasetInfo.temporal_resolution}</span>
                </div>
                <div className="bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                  <span className="text-purple-600 block text-xs uppercase tracking-wide font-medium">📅 Period</span>
                  <span className="font-bold text-purple-900 text-sm">{datasetInfo.date_range}</span>
                </div>
                <div className="bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                  <span className="text-orange-600 block text-xs uppercase tracking-wide font-medium">🏢 Provider</span>
                  <span className="font-bold text-orange-900 text-sm">{datasetInfo.provider}</span>
                </div>
              </div>

              {/* Use Case and Data Type */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  💡 {datasetInfo.use_case}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  📊 {datasetInfo.data_type}
                </span>
              </div>

              {/* Quick Pros/Cons Summary */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-green-700 font-medium">✅ Key Advantages:</span>
                  <ul className="text-green-600 mt-1 space-y-0.5">
                    {datasetInfo.pros.slice(0, 2).map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-red-700 font-medium">⚠️ Limitations:</span>
                  <ul className="text-red-600 mt-1 space-y-0.5">
                    {datasetInfo.cons.slice(0, 2).map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Quality Indicator */}
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center mb-2 shadow-lg">
                <span className="text-white font-bold text-lg">
                  {datasetInfo.spatial_resolution === '10-20m' ? 'A+' : 
                   datasetInfo.spatial_resolution === '250m' ? 'A' : 
                   datasetInfo.spatial_resolution === '30m' ? 'A-' : 'B'}
                </span>
              </div>
              <span className="text-xs text-gray-600 font-medium">Quality Grade</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Cards */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <CurrentStatusCard ndviData={ndviData} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatisticsCard ndviData={ndviData} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActionsCard ndviData={ndviData} prediction={prediction} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardCards;
