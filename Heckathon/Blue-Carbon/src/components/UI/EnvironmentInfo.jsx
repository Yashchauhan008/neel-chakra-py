import { config } from '../../utils/config';

const EnvironmentInfo = ({ showDetails = false }) => {
  if (!showDetails) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-blue-800 mb-2">🔧 Environment Configuration</h3>
      <div className="text-xs text-blue-700 space-y-1">
        <div><strong>API Base URL:</strong> {config.api.baseUrl}</div>
        <div><strong>API Endpoint:</strong> {config.api.endpoint} (POST)</div>
        <div><strong>Proxy Mode:</strong> {config.api.useProxy ? 'Enabled' : 'Disabled'}</div>
        <div><strong>Default Region:</strong> [{config.defaults.lonMin}, {config.defaults.latMin}] to [{config.defaults.lonMax}, {config.defaults.latMax}]</div>
        <div><strong>Date Range:</strong> {config.defaults.startDate} to {config.defaults.endDate}</div>
        <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
          <strong>New API Format:</strong> POST request with polygon coordinates and MODIS data
        </div>
      </div>
    </div>
  );
};

export default EnvironmentInfo;
