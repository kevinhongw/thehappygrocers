'use client';

import { SerializedItem } from '@/models/Item';
import React, { useOptimistic } from 'react';
import ItemCard from './ItemCard';
import { updateItem } from '@/app/actions/updateItem';
import { deleteItem } from '@/app/actions/deleteItem';
import { useRouter } from 'next/navigation';

type Props = {
  items: SerializedItem[];
  storeId: string;
};

const ItemList: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const [optimisticItems, addOptimisticItem] = useOptimistic<
    SerializedItem[],
    { itemId: string; completed: boolean }
  >(items, (state, { itemId, completed }) => {
    for (const item of state) {
      if (item._id === itemId) {
        item.completed = completed;
      }
    }
    return [...state];
  });

  const handleItemChange = async (itemId: string, completed: boolean) => {
    addOptimisticItem({ itemId, completed });
    try {
      await updateItem(itemId, completed);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleItemDelete = async (itemId: string) => {
    await deleteItem(itemId);
    router.refresh();
  };

  const incompleteItem = (optimisticItems || []).filter(
    (item) => !item.completed,
  );
  const completedItem = (optimisticItems || []).filter(
    (item) => item.completed,
  );

  return (
    <div className="flex flex-col gap-4">
      {!!items && items.length === 0 && <div>No item</div>}
      {incompleteItem.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onChange={handleItemChange}
          onDelete={handleItemDelete}
        />
      ))}
      {completedItem.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onChange={handleItemChange}
          onDelete={handleItemDelete}
        />
      ))}
    </div>
  );
};

export default ItemList;
