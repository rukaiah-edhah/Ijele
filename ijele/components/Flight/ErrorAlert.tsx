// components/Flight/ErrorAlert.tsx
import React from 'react';

interface ErrorAlertProps {
  error: any;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="alert alert-error">
      <span>{error.message || 'An error occurred'}</span>
    </div>
  );
};

export default ErrorAlert;