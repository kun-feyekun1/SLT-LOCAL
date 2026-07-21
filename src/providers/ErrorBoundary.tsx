import React, { Component, ReactNode } from "react";
import { GlobalErrorScreen } from "./GlobalErrorScreen";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error:", error);
    console.log("Stack:", errorInfo.componentStack);

    // Production
    // Sentry.captureException(error)
    // Crashlytics.recordError(error)
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <GlobalErrorScreen
          error={this.state.error}
          onRetry={this.reset}
        />
      );
    }

    return this.props.children;
  }
}