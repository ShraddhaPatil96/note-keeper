import React from 'react';
import './ErrorToast.css';

const ErrorToast = ({ message }) => {
  return message ? <div className="ErrorToast">{message}</div> : null;
};

export default ErrorToast;
