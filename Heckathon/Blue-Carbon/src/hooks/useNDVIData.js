import { useState, useEffect } from 'react';
import { generatePredictions } from '../utils/predictions';
import { checkAlerts } from '../utils/healthStatus';
import { ApiService } from '../utils/apiService';

export const useNDVIData = (customParams = {}) => {
  const [ndviData, setNdviData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data using the API service
        const data = await ApiService.fetchNDVIData(customParams);
        console.log('API Response:', data);
        
        // Process the data to ensure proper format
        const processedData = Array.isArray(data) ? data : [data];
        setNdviData(processedData);
        
        // Generate predictions
        const predictions = generatePredictions(processedData);
        setPrediction(predictions);
        
        // Check for alerts
        const newAlerts = checkAlerts(processedData);
        setAlerts(newAlerts);
        
      } catch (err) {
        console.error('Data Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(customParams)]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    // The useEffect will automatically re-run due to dependency changes
  };

  return {
    ndviData,
    loading,
    error,
    prediction,
    alerts,
    refetch
  };
};
