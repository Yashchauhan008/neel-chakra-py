import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNDVIData } from './hooks/useNDVIData';
import { config } from './utils/config';
import Header from './components/UI/Header';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';
import AlertBanner from './components/UI/AlertBanner';
import ApiDebugger from './components/UI/ApiDebugger';
import RegionSelector from './components/UI/RegionSelector';
import DashboardCards from './components/Dashboard/DashboardCards';
import NDVIChart from './components/Charts/NDVIChart';
import DataTable from './components/Dashboard/DataTable';
import './App.css';

function App() {
  const [regionParams, setRegionParams] = useState({
    lonMin: config.defaults.lonMin,
    latMin: config.defaults.latMin,
    lonMax: config.defaults.lonMax,
    latMax: config.defaults.latMax,
    startDate: config.defaults.startDate,
    endDate: config.defaults.endDate,
    dataset: config.defaults.dataset,
  });
  const { ndviData, loading, error, prediction, alerts } = useNDVIData(regionParams);

  // Combine actual data with predictions for chart
  const chartData = [...ndviData, ...prediction];

  const handleRegionChange = (newParams) => {
    setRegionParams(newParams);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <motion.div 
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ApiDebugger />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants}>
          <RegionSelector 
            onRegionChange={handleRegionChange}
            currentParams={regionParams}
          />
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ErrorMessage error={error} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <AlertBanner alerts={alerts} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ndviData.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <DashboardCards 
                ndviData={ndviData} 
                prediction={prediction} 
                currentDataset={regionParams.dataset}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {chartData.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <NDVIChart chartData={chartData} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ndviData.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mb-8"
            >
              <DataTable ndviData={ndviData} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-gray-500 text-sm py-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-4">
            <span>🌍 Blue Carbon Ecosystem Monitor</span>
            <span>•</span>
            <span>Powered by Google Earth Engine</span>
            <span>•</span>
            <span>© 2025</span>
          </div>
        </motion.footer>
      </motion.div>

      {/* Floating Action Button for Quick Refresh */}
      <AnimatePresence>
        {ndviData.length > 0 && (
          <motion.button
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll to top"
          >
            <span className="text-xl">⬆️</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App
