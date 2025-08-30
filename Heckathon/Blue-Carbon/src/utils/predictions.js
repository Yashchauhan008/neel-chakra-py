import regression from "regression";

export const generatePredictions = (data) => {
  if (data.length < 2) return [];
  
  const ndviPoints = data.map((d, i) => [i, d.NDVI || 0]);
  const eviPoints = data.map((d, i) => [i, d.EVI || 0]);
  
  const ndviRegression = regression.linear(ndviPoints);
  const eviRegression = regression.linear(eviPoints);
  
  const predictions = [];
  const lastDate = new Date(data[data.length - 1]?.date || Date.now());
  
  for (let i = 1; i <= 12; i++) { // Predict next 12 months
    const futureDate = new Date(lastDate);
    futureDate.setMonth(futureDate.getMonth() + i);
    
    const ndviPred = ndviRegression.predict(data.length + i - 1)[1];
    const eviPred = eviRegression.predict(data.length + i - 1)[1];
    
    predictions.push({
      date: futureDate.toISOString().split('T')[0],
      NDVI: Math.max(0, Math.min(1, ndviPred)), // Clamp between 0-1
      EVI: Math.max(0, Math.min(1, eviPred)),
      isPrediction: true
    });
  }
  
  return predictions;
};
