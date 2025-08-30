export const getHealthStatus = (ndvi) => {
  if (ndvi > 0.6) return { status: "Healthy", color: "text-green-600", icon: "🌳" };
  if (ndvi > 0.3) return { status: "Moderate", color: "text-yellow-600", icon: "🌿" };
  return { status: "Degraded", color: "text-red-600", icon: "⚠️" };
};

export const checkAlerts = (data) => {
  const newAlerts = [];
  if (data.length === 0) return newAlerts;
  
  const latest = data[data.length - 1];
  if (latest.NDVI < 0.3) {
    newAlerts.push("⚠️ Ecosystem degradation detected! NDVI below critical threshold.");
  }
  
  if (data.length > 1) {
    const previous = data[data.length - 2];
    const ndviChange = latest.NDVI - previous.NDVI;
    if (ndviChange < -0.1) {
      newAlerts.push("📉 Rapid NDVI decline detected! Consider immediate intervention.");
    }
  }
  
  return newAlerts;
};
