import React from 'react';

const StoresLoading = () => {
  return (
    <div className="flex flex-col">
      <div
        className="header flex justify-between relative h-20 items-center"
        style={{ background: '#d2f0b4' }}
      >
        <div className="w-full text-center text-xl">Happy Grocers</div>
      </div>
      <div>
        <div className="card card-bordered shadow-md h-28 p-6 flex justify-center text-left">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default StoresLoading;
