import { useState } from 'react';
import { motion } from 'framer-motion';
import { config, datasets } from '../../utils/config';

const RegionSelector = ({ onRegionChange, currentParams }) => {
  const [customRegion, setCustomRegion] = useState(false);
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

  const handleBoundsChange = (field, value) => {
    const updatedBounds = { ...bounds, [field]: parseFloat(value) || 0 };
    setBounds(updatedBounds);
  };

  const handleRefresh = () => {
    onRegionChange({
      ...bounds,
      startDate: dateRange.start,
      endDate: dateRange.end
    });
  };

  // Get the single dataset
  const singleDataset = Object.entries(datasets)[0];
  const [datasetKey, dataset] = singleDataset;

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 mb-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
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
        
        <motion.div
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
      </motion.div>

      {/* Region Selection */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-3 icon-shadow">📍</span> Choose Region
        </h4>
        
        {/* Preset Regions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {Object.keys(presetRegions).map((preset, index) => (
            <motion.button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
            >
              {preset}
            </motion.button>
          ))}
        </div>

        {/* Custom Region Toggle */}
        <motion.div 
          className="flex items-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={() => setCustomRegion(!customRegion)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <span className="mr-2">{customRegion ? '📐' : '🎯'}</span>
            {customRegion ? 'Use Preset Regions' : 'Custom Coordinates'}
          </button>
        </motion.div>

        {/* Custom Region Inputs */}
        {customRegion && (
          <motion.div 
            className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Longitude
              </label>
              <input
                type="number"
                step="0.001"
                value={bounds.lonMin}
                onChange={(e) => handleBoundsChange('lonMin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Longitude
              </label>
              <input
                type="number"
                step="0.001"
                value={bounds.lonMax}
                onChange={(e) => handleBoundsChange('lonMax', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Latitude
              </label>
              <input
                type="number"
                step="0.001"
                value={bounds.latMin}
                onChange={(e) => handleBoundsChange('latMin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Latitude
              </label>
              <input
                type="number"
                step="0.001"
                value={bounds.latMax}
                onChange={(e) => handleBoundsChange('latMax', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Date Range Selection */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-3 icon-shadow">📅</span> Date Range
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div 
        className="flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={handleRefresh}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">🚀</span>
          Fetch NDVI/EVI Data
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RegionSelector;
