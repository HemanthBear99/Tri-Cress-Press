"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: ((props: { error?: Error; reset: () => void }) => React.ReactNode);
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) {
        return fallback({ error: this.state.error, reset: this.reset });
      }
      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <div className="text-navy-deep dark:text-white">
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-sm opacity-70">
            {error?.message || "An unexpected error occurred"}
          </p>
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-navy-deep rounded-md font-medium hover:bg-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
