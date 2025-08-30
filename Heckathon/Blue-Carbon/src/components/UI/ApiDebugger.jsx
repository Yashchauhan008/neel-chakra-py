import { useState } from 'react';
import { ApiService } from '../../utils/apiService';
import { config } from '../../utils/config';

const ApiDebugger = () => {
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const testApiConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      // Test basic connectivity
      const isConnected = await ApiService.testConnection();
      
      // Test the actual endpoint with minimal data
      const testPayload = {
        coords: [[[88.7, 21.5], [89.0, 21.5], [89.0, 22.0], [88.7, 22.0], [88.7, 21.5]]],
        start_date: '2023-01-01',
        end_date: '2023-01-31'
      };
      
      const result = await ApiService.fetchNDVIData(testPayload);
      
      setTestResult({
        success: true,
        connected: isConnected,
        data: result,
        message: 'API connection successful!'
      });
    } catch (error) {
      setTestResult({
        success: false,
        connected: false,
        error: error.message,
        message: 'API connection failed'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">🔧 API Debugger</h3>
      
      <div className="space-y-3">
        <div className="text-sm text-yellow-700">
          <strong>Current Configuration:</strong>
          <ul className="ml-4 mt-2 space-y-1">
            <li>• API URL: http://127.0.0.1:5000/get_ndvi_evi</li>
            <li>• Method: POST</li>
            <li>• Health Check: http://127.0.0.1:5000/health</li>
            <li>• Direct Connection (No Proxy)</li>
          </ul>
        </div>

        <button
          onClick={testApiConnection}
          disabled={testing}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-50"
        >
          {testing ? '🔄 Testing...' : '🧪 Test API Connection'}
        </button>

        {testResult && (
          <div className={`mt-4 p-3 rounded-lg ${testResult.success ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
            <h4 className={`font-semibold ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {testResult.message}
            </h4>
            
            <div className="mt-2 text-sm">
              {testResult.success ? (
                <div className="text-green-700">
                  <p>✅ Successfully fetched {Array.isArray(testResult.data) ? testResult.data.length : 1} data points</p>
                  {testResult.data && testResult.data.length > 0 && (
                    <pre className="mt-2 bg-green-50 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(testResult.data.slice(0, 2), null, 2)}
                      {testResult.data.length > 2 && '\n...'}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="text-red-700">
                  <p>❌ Error: {testResult.error}</p>
                  <div className="mt-2 text-xs">
                    <strong>Common Solutions:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Make sure your Flask server is running on {config.api.baseUrl}</li>
                      <li>• Check that Earth Engine is properly authenticated</li>
                      <li>• Verify the Flask route matches the endpoint</li>
                      <li>• Check Flask server logs for detailed error messages</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-yellow-600 mt-4">
          <strong>Troubleshooting Steps:</strong>
          <ol className="ml-4 mt-1 space-y-1">
            <li>1. Ensure your Flask server is running: <code className="bg-yellow-100 px-1 rounded">python your_flask_app.py</code></li>
            <li>2. Check server logs for 500 error details</li>
            <li>3. Verify Earth Engine authentication: <code className="bg-yellow-100 px-1 rounded">ee.Authenticate()</code></li>
            <li>4. Test with smaller date ranges to avoid timeout</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApiDebugger;
