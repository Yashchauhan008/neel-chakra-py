export class ApiService {
  static async fetchNDVIData(params = {}) {
    try {
      // Extract parameters and convert to API format
      const { lonMin, latMin, lonMax, latMax, startDate, endDate, dataset = 'MODIS/006/MOD13Q1' } = params;
      
      // Build the request payload for POST - using the format the backend expects
      const payload = {
        min_lon: lonMin,
        max_lon: lonMax,
        min_lat: latMin,
        max_lat: latMax,
        start_date: startDate,
        end_date: endDate,
        dataset
      };

      const url = 'http://127.0.0.1:5000/get_ndvi_evi';
      
      console.log('🔄 Making API request to:', url);
      console.log('📦 Request payload:', JSON.stringify(payload, null, 2));
      
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        let errorText = '';
        try {
          // Try to get JSON error response first
          const errorData = await response.json();
          errorText = errorData.error || errorData.message || JSON.stringify(errorData);
        } catch (jsonError) {
          // If JSON parsing fails, get text response
          try {
            errorText = await response.text();
          } catch (textError) {
            errorText = `Unknown error (Status: ${response.status})`;
          }
        }
        
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Success Response:', data);
      return data;
      
    } catch (error) {
      console.error('❌ API Service Error:', error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error(`Failed to connect to Flask API at http://127.0.0.1:5000. Make sure your Flask server is running.`);
      }
      
      // Check for specific Earth Engine errors
      if (error.message.includes('Earth Engine')) {
        throw new Error(`Earth Engine Error: ${error.message}. Check your GEE authentication and quota.`);
      }
      
      if (error.message.includes('500')) {
        throw new Error(`Server Error: Your Flask backend encountered an internal error. Check the Flask server logs for details: ${error.message}`);
      }
      
      throw new Error(`Failed to fetch NDVI data: ${error.message}`);
    }
  }

  // Method to test API connectivity
  static async testConnection() {
    try {
      const response = await fetch('http://127.0.0.1:5000/health', {
        method: 'GET'
      });
      return response.ok;
    } catch (error) {
      console.error('❌ API Connection Test Failed:', error);
      return false;
    }
  }
}
