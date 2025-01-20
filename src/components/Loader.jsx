import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-75 z-50">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </div>
  );
};

export default Loader;