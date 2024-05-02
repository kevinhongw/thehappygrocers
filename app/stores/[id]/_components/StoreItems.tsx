'use client';

import React, { useState } from 'react';
import ItemList from './ItemList';
import CreateItemInput from './CreateItemInput';
import { createStoreItem } from '@/app/actions/createStoreItem';
import { SerializedItem } from '@/models/Item';
import { useRouter } from 'next/navigation';

type Props = {
  items: SerializedItem[];
  storeId: string;
};

const StoreItems: React.FC<Props> = ({ items, storeId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateItem = async (value: string) => {
    setIsLoading(true);

    try {
      await createStoreItem(value, storeId);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    router.refresh();
  };

  return (
    <>
      <CreateItemInput onCreate={handleCreateItem} disabled={isLoading} />
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      <ItemList storeId={storeId} items={items} />
    </>
  );
};

export default StoreItems;
