
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full mx-auto text-center px-4">
            <div className="mb-8">
              <div className="w-16 h-16 bg-[#EA3E3A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">!</span>
              </div>
              <h1 className="text-2xl font-bold font-manrope text-gray-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 font-manrope">
                We're sorry, but something went wrong. Please try refreshing the page.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 text-white"
              >
                Refresh Page
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
