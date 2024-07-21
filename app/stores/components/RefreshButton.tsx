'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';

const RefreshButton: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button className="btn btn-sm btn-outline" onClick={handleRefresh}>
      <ReloadIcon className="h-5 w-5" />
    </button>
  );
};

export default RefreshButton;
