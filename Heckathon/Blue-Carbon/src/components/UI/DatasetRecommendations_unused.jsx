import { motion } from 'framer-motion';
import { datasets } from '../../utils/config';

const DatasetRecommendations = ({ onDatasetSelect, currentDataset }) => {
  const recommendations = [
    {
      scenario: "🎯 Blue Carbon Monitoring",
      description: "Standard ecosystem health monitoring and trend analysis",
      recommended: 'MODIS/006/MOD13Q1',
      reason: "Perfect balance of 250m resolution and 25+ year time series for Blue Carbon studies",
      icon: "🌊",
      color: "blue"
    },
    {
      scenario: "� High-Resolution Mapping", 
      description: "Detailed analysis of small blue carbon areas and precise boundary mapping",
      recommended: 'COPERNICUS/S2_SR_HARMONIZED',
      reason: "10-20m resolution provides finest detail for precise monitoring and change detection",
      icon: "�️",
      color: "green"
    },
    {
      scenario: "� Medium-Resolution Studies",
      description: "Balanced approach for regional monitoring with good spatial detail",
      recommended: 'LANDSAT/LC08/C02/T1_L2',
      reason: "30m resolution with consistent 16-day cycle, good for regional assessments",
      icon: "📊",
      color: "purple"
    },
    {
      scenario: "⚡ Rapid Change Detection",
      description: "Monitoring ecosystem response to events, storms, or interventions",
      recommended: 'COPERNICUS/S2_SR_HARMONIZED',
      reason: "5-day revisit time captures rapid changes better than other datasets",
      icon: "⚡",
      color: "yellow"
    },
    {
      scenario: "🕰️ Long-term Climate Trends",
      description: "Multi-decade ecosystem analysis and climate change impact studies",
      recommended: 'MODIS/006/MOD13Q1',
      reason: "25+ years of consistent data (2000-present) ideal for long-term trend analysis",
      icon: "�",
      color: "teal"
    },
    {
      scenario: "🌍 Regional Scale Assessment",
      description: "Large area monitoring with consistent methodology",
      recommended: 'MODIS/006/MOD13Q1',
      reason: "250m resolution provides good coverage for regional ecosystem monitoring",
      icon: "�️",
      color: "indigo"
    }
  ];

  const colorVariants = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
    green: "from-green-50 to-green-100 border-green-200 text-green-800", 
    yellow: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
    teal: "from-teal-50 to-teal-100 border-teal-200 text-teal-800",
    indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800"
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 mb-6"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-2xl font-bold mb-6 text-gray-800 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="mr-3 text-3xl">🎯</span> 
        <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Dataset Recommendations
        </span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => {
          const dataset = datasets[rec.recommended];
          const isSelected = currentDataset === rec.recommended;
          
          return (
            <motion.div
              key={index}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : `bg-gradient-to-br ${colorVariants[rec.color]} hover:shadow-md hover:scale-102`
              }`}
              onClick={() => onDatasetSelect(rec.recommended)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{rec.icon}</span>
                {isSelected && (
                  <motion.div
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </div>

              <h4 className="font-bold text-sm mb-2">{rec.scenario}</h4>
              <p className="text-xs text-gray-600 mb-3">{rec.description}</p>
              
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-800 mb-1">Recommended Dataset:</p>
                <p className="text-xs font-bold">{dataset?.name || 'Unknown'}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p className="font-medium mb-1">Why this dataset:</p>
                <p className="italic">{rec.reason}</p>
              </div>

              {dataset && (
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/60">
                    {dataset.spatial_resolution}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/60">
                    {dataset.temporal_resolution}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h6 className="font-semibold text-gray-800 mb-3 text-center">📊 Quick Dataset Comparison</h6>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 font-semibold text-gray-700">Dataset</th>
                <th className="text-center py-2 font-semibold text-gray-700">Resolution</th>
                <th className="text-center py-2 font-semibold text-gray-700">Revisit</th>
                <th className="text-center py-2 font-semibold text-gray-700">Time Range</th>
                <th className="text-center py-2 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-200">
                <td className="py-2 font-medium">🛰️ MODIS MOD13Q1</td>
                <td className="text-center py-2">250m</td>
                <td className="text-center py-2">16 days</td>
                <td className="text-center py-2">2000-Present</td>
                <td className="text-center py-2">🎯 Standard Blue Carbon</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 font-medium">�️ Sentinel-2</td>
                <td className="text-center py-2">10-20m</td>
                <td className="text-center py-2">5 days</td>
                <td className="text-center py-2">2015-Present</td>
                <td className="text-center py-2">🔍 High-detail mapping</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">🛰️ Landsat-8/9</td>
                <td className="text-center py-2">30m</td>
                <td className="text-center py-2">16 days</td>
                <td className="text-center py-2">2013-Present</td>
                <td className="text-center py-2">⚖️ Balanced approach</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          <span className="font-semibold">💡 Recommendation:</span> Start with MODIS MOD13Q1 for most Blue Carbon studies, 
          then use Sentinel-2 for detailed analysis of specific areas of interest.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DatasetRecommendations;
