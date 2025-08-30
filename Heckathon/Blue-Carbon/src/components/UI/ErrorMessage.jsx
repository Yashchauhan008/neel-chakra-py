const ErrorMessage = ({ error }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <strong>Error:</strong> {error}
    </div>
  );
};

export default ErrorMessage;
