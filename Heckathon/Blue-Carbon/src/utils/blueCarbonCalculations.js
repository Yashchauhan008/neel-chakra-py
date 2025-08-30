// Biomass and Carbon Storage Calculations for Blue Carbon Ecosystems

/**
 * Calculate biomass from NDVI and EVI values
 * Using simplified allometric relationships for blue carbon ecosystems
 * @param {number} ndvi - Normalized Difference Vegetation Index (0-1)
 * @param {number} evi - Enhanced Vegetation Index (0-1)
 * @returns {number} biomass in tons per hectare
 */
export const calculateBiomass = (ndvi, evi) => {
  if (!ndvi || !evi || ndvi < 0 || evi < 0) return 0;
  
  // Placeholder relation optimized for blue carbon ecosystems
  // Based on research showing stronger correlation in wetland environments
  const biomass = 30 * ndvi + 20 * evi;
  
  // Ensure realistic biomass values for mangroves/salt marshes (0-300 t/ha)
  return Math.max(0, Math.min(300, biomass));
};

/**
 * Calculate carbon storage from biomass
 * @param {number} biomass - Biomass in tons per hectare
 * @returns {number} carbon storage in tons C per hectare
 */
export const calculateCarbonStorage = (biomass) => {
  if (!biomass || biomass < 0) return 0;
  
  // 47% of biomass is carbon (IPCC standard)
  return biomass * 0.47;
};

/**
 * Convert carbon storage to CO2 equivalent
 * @param {number} carbonStorage - Carbon storage in tons C per hectare
 * @returns {number} CO2 equivalent in tons CO2 per hectare
 */
export const calculateCO2Equivalent = (carbonStorage) => {
  if (!carbonStorage || carbonStorage < 0) return 0;
  
  // Convert C → CO2 (molecular weight ratio: 44/12 = 3.67)
  return carbonStorage * 3.67;
};

/**
 * Process NDVI/EVI data to include biomass and carbon calculations
 * @param {Array} ndviData - Array of NDVI/EVI data points
 * @returns {Array} Enhanced data with biomass, carbon, and CO2 calculations
 */
export const processBlucCarbonData = (ndviData) => {
  return ndviData.map(dataPoint => {
    const { NDVI, EVI, date, isPrediction } = dataPoint;
    
    const biomass = calculateBiomass(NDVI, EVI);
    const carbonStorage = calculateCarbonStorage(biomass);
    const co2Equivalent = calculateCO2Equivalent(carbonStorage);
    
    return {
      ...dataPoint,
      biomass,
      carbonStorage,
      co2Equivalent,
      // Additional metrics for blue carbon assessment
      carbonDensity: carbonStorage, // tons C/ha
      co2SequestrationPotential: co2Equivalent,
      ecosystemHealth: getEcosystemHealth(NDVI, EVI, biomass)
    };
  });
};

/**
 * Assess ecosystem health based on vegetation indices and biomass
 * @param {number} ndvi - NDVI value
 * @param {number} evi - EVI value  
 * @param {number} biomass - Biomass value
 * @returns {Object} Health assessment with status, score, and indicators
 */
export const getEcosystemHealth = (ndvi, evi, biomass) => {
  const ndviScore = ndvi * 100;
  const eviScore = evi * 100;
  const biomassScore = Math.min(100, (biomass / 200) * 100); // Normalize to 0-100
  
  const overallScore = (ndviScore + eviScore + biomassScore) / 3;
  
  let status, color, icon, recommendations;
  
  if (overallScore >= 75) {
    status = "Excellent";
    color = "text-green-600";
    icon = "🌳";
    recommendations = ["Maintain current conservation practices", "Monitor for climate impacts"];
  } else if (overallScore >= 60) {
    status = "Good";
    color = "text-blue-600";
    icon = "🌿";
    recommendations = ["Continue protection efforts", "Consider restoration enhancement"];
  } else if (overallScore >= 40) {
    status = "Moderate";
    color = "text-yellow-600";
    icon = "⚠️";
    recommendations = ["Implement restoration activities", "Reduce human pressures"];
  } else if (overallScore >= 25) {
    status = "Poor";
    color = "text-orange-600";
    icon = "🚨";
    recommendations = ["Urgent restoration needed", "Address major threats"];
  } else {
    status = "Critical";
    color = "text-red-600";
    icon = "💀";
    recommendations = ["Emergency intervention required", "Comprehensive restoration plan"];
  }
  
  return {
    status,
    color,
    icon,
    score: Math.round(overallScore),
    ndviScore: Math.round(ndviScore),
    eviScore: Math.round(eviScore),
    biomassScore: Math.round(biomassScore),
    recommendations
  };
};

/**
 * Calculate carbon sequestration rate based on temporal data
 * @param {Array} timeSeriesData - Time series data with carbon storage
 * @returns {Object} Sequestration rate analysis
 */
export const calculateSequestrationRate = (timeSeriesData) => {
  if (!timeSeriesData || timeSeriesData.length < 2) {
    return { rate: 0, trend: 'insufficient-data', confidence: 'low' };
  }
  
  // Sort by date
  const sortedData = timeSeriesData
    .filter(d => d.carbonStorage && d.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (sortedData.length < 2) {
    return { rate: 0, trend: 'insufficient-data', confidence: 'low' };
  }
  
  const firstPoint = sortedData[0];
  const lastPoint = sortedData[sortedData.length - 1];
  
  const timeSpanYears = (new Date(lastPoint.date) - new Date(firstPoint.date)) / (365.25 * 24 * 60 * 60 * 1000);
  const carbonChange = lastPoint.carbonStorage - firstPoint.carbonStorage;
  
  const annualRate = timeSpanYears > 0 ? carbonChange / timeSpanYears : 0;
  
  let trend, confidence;
  if (annualRate > 1) {
    trend = 'increasing';
    confidence = timeSpanYears > 2 ? 'high' : 'medium';
  } else if (annualRate < -1) {
    trend = 'decreasing';
    confidence = timeSpanYears > 2 ? 'high' : 'medium';
  } else {
    trend = 'stable';
    confidence = timeSpanYears > 1 ? 'medium' : 'low';
  }
  
  return {
    rate: annualRate, // tons C/ha/year
    trend,
    confidence,
    timeSpanYears,
    totalChange: carbonChange,
    projectedAnnualCO2: annualRate * 3.67 // CO2 equivalent per year
  };
};

/**
 * Calculate ecosystem service values
 * @param {number} carbonStorage - Carbon storage in tons C/ha
 * @param {number} area - Area in hectares
 * @returns {Object} Economic valuation of ecosystem services
 */
export const calculateEcosystemServices = (carbonStorage, area = 1) => {
  // Carbon pricing ($/tonne CO2) - using conservative estimate
  const carbonPrice = 50; // USD per tonne CO2
  const co2Equivalent = carbonStorage * 3.67;
  const carbonValue = co2Equivalent * carbonPrice * area;
  
  // Additional blue carbon ecosystem services (estimated values)
  const coastalProtection = area * 2000; // $2000/ha/year for coastal protection
  const fisherySupport = area * 500; // $500/ha/year for fishery habitat
  const waterPurification = area * 300; // $300/ha/year for water filtration
  const biodiversityValue = area * 1000; // $1000/ha/year for biodiversity conservation
  
  const totalValue = carbonValue + coastalProtection + fisherySupport + waterPurification + biodiversityValue;
  
  return {
    carbonValue,
    coastalProtection,
    fisherySupport,
    waterPurification,
    biodiversityValue,
    totalValue,
    carbonPrice,
    area
  };
};

export default {
  calculateBiomass,
  calculateCarbonStorage,
  calculateCO2Equivalent,
  processBlucCarbonData,
  getEcosystemHealth,
  calculateSequestrationRate,
  calculateEcosystemServices
};
