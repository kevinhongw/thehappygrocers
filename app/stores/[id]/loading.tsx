import React from 'react';

const StoreLoading = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="card card-bordered shadow-md h-28 p-6 flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="ml-4 text-lg">Loading items...</p>
      </div>
    </div>
  );
};

export default StoreLoading;
