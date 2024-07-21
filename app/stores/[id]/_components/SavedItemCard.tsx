'use client';

import { deleteItem } from '@/app/actions/deleteItem';
import { SerializedItem } from '@/models/Item';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ThickArrowUpIcon, TrashIcon } from '@radix-ui/react-icons';
// import { updateItemStatus } from '@/app/actions/updateItemStatus';
import { updateItemCompleted } from '@/app/actions/updateItemCompleted';

type Props = {
  item: SerializedItem;
};

export const SavedItemCard: React.FC<Props> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOnChange = async (_event: any) => {
    setLoading(true);

    try {
      await updateItemCompleted(item._id, false);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    router.refresh();
  };

  return (
    <div className="card card-bordered bg-red-100 h-20 p-6 pr-16 flex flex-row justify-start items-center gap-4">
      <button
        className="btn btn-sm btn-outline bg-error"
        onClick={() =>
          (
            document.getElementById('confirm-delete') as HTMLDialogElement
          )?.showModal()
        }
      >
        <TrashIcon className="w-4 h-4" />
      </button>
      <span className="text-lg font-light">{item.name}</span>
      <button
        className="btn btn-sm btn-outline  absolute right-4"
        onClick={handleOnChange}
      >
        <ThickArrowUpIcon className="w-4 h-4" />
      </button>

      {/* TODO: Move this to ItemList */}
      <ConfirmDeleteModal item={item} />
    </div>
  );
};
