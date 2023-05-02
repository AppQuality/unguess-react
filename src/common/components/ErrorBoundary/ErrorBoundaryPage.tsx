const ErrorBoundaryPage = () => (
  <div>
    <h1>Sorry.. there was an error</h1>
    <button type="button" onClick={() => window.location.reload()}>
      Refresh
    </button>
  </div>
);

export default ErrorBoundaryPage;
