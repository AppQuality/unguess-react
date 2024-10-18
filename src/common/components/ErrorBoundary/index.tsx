import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorBoundaryPage from './ErrorBoundaryPage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.state = { hasError: true, error, errorInfo };
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      if (process.env.NODE_ENV === 'development') {
        return (
          <div>
            {error?.message}
            <br />
            <code>{error?.stack}</code>
          </div>
        );
      }

      return <ErrorBoundaryPage />;
    }

    return children;
  }
}

export default ErrorBoundary;
