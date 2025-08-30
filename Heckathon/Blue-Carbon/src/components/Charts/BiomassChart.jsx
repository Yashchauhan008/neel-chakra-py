import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const BiomassChart = ({ data, title = "Biomass & Carbon Storage Analysis" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No biomass data available
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">
            Date: {new Date(label).toLocaleDateString()}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm mb-1">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}: {entry.value?.toFixed(2)} {getUnit(entry.dataKey)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getUnit = (dataKey) => {
    switch (dataKey) {
      case 'biomass': return 't/ha';
      case 'carbonStorage': return 'tC/ha';
      case 'co2Equivalent': return 'tCO₂/ha';
      default: return '';
    }
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
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6 mb-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="mr-3 text-3xl">🌱</span> 
        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>

      {/* Biomass & Carbon Storage Time Series */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">📈</span> Biomass & Carbon Storage Trends
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="biomassGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
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
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Area 
              type="monotone" 
              dataKey="biomass" 
              stroke="#22c55e" 
              fillOpacity={1}
              fill="url(#biomassGradient)"
              strokeWidth={3}
              name="Biomass (t/ha)"
            />
            <Area 
              type="monotone" 
              dataKey="carbonStorage" 
              stroke="#3b82f6" 
              fillOpacity={1}
              fill="url(#carbonGradient)"
              strokeWidth={3}
              name="Carbon Storage (tC/ha)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* CO2 Equivalent Chart */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🌍</span> CO₂ Sequestration Potential
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
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
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="co2Equivalent" 
              stroke="#8b5cf6" 
              fill="url(#co2Gradient)"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#7c3aed', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Ecosystem Health Assessment */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🏥</span> Ecosystem Health Scores
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length && payload[0].payload.ecosystemHealth) {
                  const health = payload[0].payload.ecosystemHealth;
                  return (
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-2">
                        {new Date(label).toLocaleDateString()}
                      </p>
                      <p className={`font-medium mb-2 ${health.color}`}>
                        {health.icon} {health.status} ({health.score}/100)
                      </p>
                      <div className="text-sm space-y-1">
                        <p>NDVI Score: {health.ndviScore}/100</p>
                        <p>EVI Score: {health.eviScore}/100</p>
                        <p>Biomass Score: {health.biomassScore}/100</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="ecosystemHealth.score" 
              fill="#06b6d4"
              radius={[4, 4, 0, 0]}
              name="Health Score"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default BiomassChart;
