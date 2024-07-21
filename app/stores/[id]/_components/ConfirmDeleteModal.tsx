'use client';

import React, { useState } from 'react';
import { deleteItem } from '@/app/actions/deleteItem';
import { useRouter } from 'next/navigation';
import { IItem } from '@/models/Item';

interface ConfirmDeleteModalProps {
  item: IItem;
}

export const ConfirmDeleteModal = ({ item }: ConfirmDeleteModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnDelete = async () => {
    setLoading(true);

    try {
      await deleteItem(item._id.toString());
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    router.refresh();
  };

  return (
    <dialog
      id={`confirm-delete-${item._id}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete item</h3>
        <p className="py-4">
          Are you sure you want to delete <strong>{item.name}</strong>?
        </p>
        <div className="modal-action flex justify-between">
          <button
            className="btn btn-outline"
            onClick={() =>
              (
                document.getElementById(
                  `confirm-delete-${item._id}`,
                ) as HTMLDialogElement
              ).close()
            }
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleOnDelete}
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner"></span>}
            Confirm
          </button>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </div>
    </dialog>
  );
};
