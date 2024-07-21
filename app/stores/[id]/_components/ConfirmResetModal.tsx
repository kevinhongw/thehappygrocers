'use client';

import React, { useState } from 'react';
import { resetStoreCart } from '@/app/actions/resetStoreCart';
import { useRouter } from 'next/navigation';

interface ConfirmResetModalProps {
  storeId: string;
}

export const ConfirmResetModal = ({ storeId }: ConfirmResetModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnReset = async () => {
    setLoading(true);

    try {
      await resetStoreCart(storeId);
      closeModal();
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    router.refresh();
  };

  const closeModal = () => {
    (
      document.getElementById(`reset-store-${storeId}`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog
      id={`reset-store-${storeId}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Reset cart</h3>
        <p className="py-4">Are you sure you want to reset the cart?</p>
        <div className="modal-action flex justify-between">
          <button className="btn btn-outline" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn btn-warning"
            onClick={handleOnReset}
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner"></span>}
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};
