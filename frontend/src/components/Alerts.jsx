import React from 'react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="errorAlert mt-4 mb-3 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
      {message}
    </div>
  );
};

const SuccessAlert = ({ message }) => {
    if (!message) return null;
    return (
        <div className="successAlert mt-4 mb-3 text-center text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
        {message}
        </div>
    );
}




export { ErrorAlert, SuccessAlert };
