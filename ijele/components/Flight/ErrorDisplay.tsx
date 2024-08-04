// components/Flight/ErrorDisplay.tsx
import React from 'react';

type ErrorDisplayProps = {
  errorMessage: string | null;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => (
  <div>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
);

export default ErrorDisplay;
