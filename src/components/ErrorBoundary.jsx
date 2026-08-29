import React from 'react';
import ServerErrorPage from '../pages/ServerErrorPage';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Axis Engineering App Error Boundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ServerErrorPage
          error={this.state.error}
          onRetry={() => {
            this.setState({ hasError: false, error: null, errorInfo: null });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}
