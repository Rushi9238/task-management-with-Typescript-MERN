import React from "react";

const ErrorPage = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
        <h1 className="text-2xl font-bold text-red-600 mb-2">⚠️ Error</h1>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
