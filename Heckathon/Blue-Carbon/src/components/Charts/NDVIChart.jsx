import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const NDVIChart = ({ chartData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            📅 {new Date(label).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}: {entry.value.toFixed(3)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center items-center space-x-8 mb-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-4 h-0.5 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">{entry.value}</span>
          </div>
        ))}
        <div className="ml-6 text-xs text-gray-500 flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-0.5 bg-gray-400"></div>
            <span>Historical data</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-0.5 bg-gray-400" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 2px, #9ca3af 2px, #9ca3af 4px)' }}></div>
            <span>Predictions (next 12 months)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 mb-6"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="mr-3 text-3xl">🌱</span> 
        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          NDVI & EVI Trends with Predictions
        </span>
      </motion.h2>
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              domain={[0, 1]} 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Line 
              type="monotone" 
              dataKey="NDVI" 
              stroke="#22c55e" 
              strokeWidth={3}
              strokeDasharray={(entry) => entry?.isPrediction ? "8 4" : "0"}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 5, filter: "url(#glow)" }}
              activeDot={{ r: 7, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="EVI" 
              stroke="#3b82f6" 
              strokeWidth={3}
              strokeDasharray={(entry) => entry?.isPrediction ? "8 4" : "0"}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5, filter: "url(#glow)" }}
              activeDot={{ r: 7, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default NDVIChart;
