import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config, datasets } from '../../utils/config';
import DatasetRecommendations from './DatasetRecommendations';

const RegionSelector = ({ onRegionChange, currentParams }) => {
  const [customRegion, setCustomRegion] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [bounds, setBounds] = useState({
    lonMin: currentParams?.lonMin || config.defaults.lonMin,
    latMin: currentParams?.latMin || config.defaults.latMin,
    lonMax: currentParams?.lonMax || config.defaults.lonMax,
    latMax: currentParams?.latMax || config.defaults.latMax,
    dataset: currentParams?.dataset || config.defaults.dataset,
  });

  const [dateRange, setDateRange] = useState({
    start: currentParams?.startDate || config.defaults.startDate,
    end: currentParams?.endDate || config.defaults.endDate,
  });

  const presetRegions = {
    'Bangladesh Sundarbans': {
      lonMin: 88.7,
      latMin: 21.5,
      lonMax: 89.0,
      latMax: 22.0,
      name: 'Bangladesh Sundarbans'
    },
    'Full Sundarbans': {
      lonMin: 88.0,
      latMin: 21.3,
      lonMax: 90.0,
      latMax: 22.5,
      name: 'Full Sundarbans Region'
    },
    'Coastal Bangladesh': {
      lonMin: 88.0,
      latMin: 20.5,
      lonMax: 92.7,
      latMax: 23.0,
      name: 'Coastal Bangladesh'
    }
  };

  const handlePresetSelect = (preset) => {
    const region = presetRegions[preset];
    setBounds(prev => ({ ...prev, ...region }));
    setCustomRegion(false);
    onRegionChange({ 
      ...bounds, 
      ...region,
      startDate: dateRange.start,
      endDate: dateRange.end
    });
  };

  const handleCustomChange = (field, value) => {
    const updatedBounds = { ...bounds, [field]: parseFloat(value) || value };
    setBounds(updatedBounds);
  };

  const handleDatasetChange = (dataset) => {
    const updatedBounds = { ...bounds, dataset };
    setBounds(updatedBounds);
  };

  const handleRefresh = () => {
    onRegionChange({
      ...bounds,
      startDate: dateRange.start,
      endDate: dateRange.end
    });
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 mb-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-2xl font-bold mb-6 text-gray-800 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="mr-2 icon-shadow">🌍</span> Region Selection
      </motion.h3>
      
      {/* Dataset Information - Single Dataset */}
      <motion.div 
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-3 icon-shadow">🛰️</span> Dataset Information
        </h4>
        
        {Object.entries(datasets).map(([key, dataset]) => (
          <motion.div
            key={key}
            className="relative rounded-xl border-2 border-blue-500 bg-blue-50 shadow-lg p-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {/* Active Indicator */}
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
              <motion.div 
                className="w-2 h-2 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Dataset Header */}
            <div className="mb-3 pr-8">
              <h5 className="font-bold text-gray-800 mb-1 text-sm leading-tight">
                {dataset.name}
              </h5>
              <p className="text-xs text-gray-600 mb-2">
                {dataset.description}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  📏 {dataset.spatial_resolution}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ⏱️ {dataset.temporal_resolution}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  📅 {dataset.date_range}
                </span>
              </div>
            </div>

            {/* Dataset Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium text-gray-800">{dataset.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Type:</span>
                <span className="font-medium text-gray-800">{dataset.data_type}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">Use Case:</span>
                <p className="font-medium text-gray-800 mt-1">{dataset.use_case}</p>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div>
                <h6 className="text-xs font-semibold text-green-700 mb-1 flex items-center">
                  <span className="mr-1">✅</span> Advantages
                </h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {dataset.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-green-500 text-xs">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-xs font-semibold text-orange-700 mb-1 flex items-center">
                  <span className="mr-1">⚠️</span> Considerations
                </h6>
                <ul className="text-xs text-gray-600 space-y-1">
                  {dataset.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-orange-500 text-xs">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    📅 {dataset.date_range}
                  </span>
                </div>

                {/* Provider and Data Type */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">
                    🏢 {dataset.provider}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {dataset.data_type}
                  </span>
                </div>
              </div>

              {/* Use Case */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 italic">
                  💡 {dataset.use_case}
                </p>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-medium text-green-700 mb-1">✅ Pros:</p>
                  <ul className="space-y-0.5">
                    {dataset.pros.slice(0, 2).map((pro, i) => (
                      <li key={i} className="text-green-600">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700 mb-1">⚠️ Cons:</p>
                  <ul className="space-y-0.5">
                    {dataset.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="text-red-600">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Special Indicators */}
              {key.includes('MODIS') && (
                <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  🎯 Recommended for Blue Carbon (25+ years data)
                </div>
              )}
              {key.includes('S2') && (
                <div className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  🔬 Requires computation (NDVI = (B8-B4)/(B8+B4))
                </div>
              )}
              {key.includes('LANDSAT') && (
                <div className="mt-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  ⚖️ Balanced resolution and coverage
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dataset Selection Helper */}
        <motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h6 className="font-semibold text-blue-800 flex items-center">
              <span className="mr-2">🎯</span> Show Dataset Recommendations
            </h6>
            <motion.button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showRecommendations ? '🔼 Hide' : '🔽 Show'} Detailed Recommendations
            </motion.button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-blue-700">
            <div>
              <p className="font-medium mb-1">🎯 Standard Monitoring:</p>
              <p>Use MODIS MOD13Q1 (250m) for most Blue Carbon studies</p>
            </div>
            <div>
              <p className="font-medium mb-1">� High Detail Mapping:</p>
              <p>Use Sentinel-2 (10-20m) for detailed analysis of specific areas</p>
            </div>
            <div>
              <p className="font-medium mb-1">⚖️ Balanced Approach:</p>
              <p>Use Landsat-8/9 (30m) for medium-resolution regional studies</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Dataset Recommendations */}
        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 overflow-hidden"
            >
              <DatasetRecommendations 
                onDatasetSelect={(dataset) => {
                  handleDatasetChange(dataset);
                  setShowRecommendations(false);
                }}
                currentDataset={bounds.dataset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Preset Regions */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2 icon-shadow">📍</span> Quick Select Regions:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.keys(presetRegions).map((preset, index) => (
            <motion.button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
            >
              {preset}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom Region Toggle */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <label className="flex items-center cursor-pointer bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={customRegion}
            onChange={(e) => setCustomRegion(e.target.checked)}
            className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-lg font-medium text-gray-800 flex items-center">
            <span className="mr-2 icon-shadow">🗺️</span> Custom Region
          </span>
        </label>
      </motion.div>

      {/* Custom Coordinates */}
      <AnimatePresence>
        {customRegion && (
          <motion.div 
            className="mb-6 bg-blue-50 p-6 rounded-xl border border-blue-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">🎯</span> Custom Coordinates
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Longitude Min
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bounds.lonMin}
                  onChange={(e) => handleCustomChange('lonMin', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="88.7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Latitude Min
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bounds.latMin}
                  onChange={(e) => handleCustomChange('latMin', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="21.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Longitude Max
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bounds.lonMax}
                  onChange={(e) => handleCustomChange('lonMax', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="89.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Latitude Max
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bounds.latMax}
                  onChange={(e) => handleCustomChange('latMax', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                  placeholder="22.0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date Range */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2 icon-shadow">📅</span> Date Range
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <label className="block text-sm font-medium text-green-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white text-gray-900 transition-all duration-200"
              max={dateRange.end}
            />
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <label className="block text-sm font-medium text-red-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white text-gray-900 transition-all duration-200"
              min={dateRange.start}
            />
          </div>
        </div>
      </motion.div>

      {/* Refresh Button */}
      <motion.div 
        className="flex justify-end"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.button
          onClick={handleRefresh}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-2 button-pulse"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🔄
          </motion.span>
          <span>Fetch Data</span>
        </motion.button>
      </motion.div>

      {/* Current Selection Info */}
      <motion.div 
        className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 text-sm text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <strong className="text-gray-800">Current Selection:</strong> 
        <br />Dataset: {datasets[bounds.dataset]?.name || bounds.dataset}
        <br />Region: [{bounds.lonMin}, {bounds.latMin}] to [{bounds.lonMax}, {bounds.latMax}]
        <br />Period: {bounds.startDate} to {bounds.endDate}
      </motion.div>
    </motion.div>
  );
};

export default RegionSelector;
