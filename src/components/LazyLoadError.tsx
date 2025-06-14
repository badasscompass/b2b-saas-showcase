
import React from 'react';

interface LazyLoadErrorProps {
  error?: Error;
  retry?: () => void;
}

export const LazyLoadError: React.FC<LazyLoadErrorProps> = ({ error, retry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-16 h-16 bg-[#EA3E3A] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold font-manrope text-gray-900 mb-2">
            Page Failed to Load
          </h1>
          <p className="text-gray-600 font-manrope">
            Sorry, we couldn't load this page. Please try refreshing or go back to the home page.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 text-white px-4 py-2 rounded font-manrope transition-colors"
          >
            Refresh Page
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-manrope transition-colors"
          >
            Go to Home
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default LazyLoadError;
