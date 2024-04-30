"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
};

const RefreshButton: React.FC<Props> = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  }
    return (
        <button onClick={handleRefresh}>Refresh</button>
    );
}

export default RefreshButton