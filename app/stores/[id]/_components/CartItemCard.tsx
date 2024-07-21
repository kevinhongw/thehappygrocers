'use client';

import { SerializedItem } from '@/models/Item';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ThickArrowDownIcon } from '@radix-ui/react-icons';
// import { updateItemStatus } from '@/app/actions/updateItemStatus';
import { updateItemCompleted } from '@/app/actions/updateItemCompleted';

type Props = {
  item: SerializedItem;
  // onChange: (itemId: string, value: boolean) => void;
};

export const CartItemCard: React.FC<Props> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOnChange = async (_event: any) => {
    setLoading(true);

    try {
      await updateItemCompleted(item._id, true);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    router.refresh();
  };

  return (
    <div className="card card-bordered bg-green-100 h-20 p-6 pr-16 flex flex-row justify-start items-center gap-4">
      <span className="text-lg font-light">{item.name}</span>
      <button
        className="btn btn-sm btn-outline absolute right-4"
        onClick={handleOnChange}
      >
        <ThickArrowDownIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
