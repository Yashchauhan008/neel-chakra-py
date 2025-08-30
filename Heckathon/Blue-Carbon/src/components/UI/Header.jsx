import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <motion.div 
          className="flex items-center justify-between flex-wrap"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-full p-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl">🌱</span>
            </motion.div>
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Blue Carbon Dashboard
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-blue-100 mt-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Real-time NDVI & EVI monitoring with predictive analytics
              </motion.p>
            </div>
          </div>

          <motion.div 
            className="flex items-center space-x-4 mt-4 md:mt-0"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Real-time Monitoring</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2 text-sm">
                <span>🛰️</span>
                <span>Multi-Satellite Data</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <span className="text-2xl filter drop-shadow-sm">📊</span>
              <div>
                <h3 className="font-semibold text-white text-shadow">NDVI/EVI Analysis</h3>
                <p className="text-sm text-blue-100">Vegetation health metrics</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <span className="text-2xl filter drop-shadow-sm">🌍</span>
              <div>
                <h3 className="font-semibold text-white text-shadow">Global Coverage</h3>
                <p className="text-sm text-blue-100">Worldwide mangrove monitoring</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="flex items-center space-x-3">
              <span className="text-2xl filter drop-shadow-sm">⚡</span>
              <div>
                <h3 className="font-semibold text-white text-shadow">Real-time Data</h3>
                <p className="text-sm text-blue-100">Live satellite feeds</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
