const AlertBanner = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
      <h3 className="font-bold mb-2">🚨 Alerts</h3>
      {alerts.map((alert, index) => (
        <p key={index} className="mb-1">{alert}</p>
      ))}
    </div>
  );
};

export default AlertBanner;
