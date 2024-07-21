import { SerializedItem } from '@/models/Item';
import { CartItemCard } from './CartItemCard';

import { SavedItemCard } from './SavedItemCard';

type Props = {
  items: SerializedItem[];
  storeId: string;
};

const ItemList = ({ items, storeId }: Props) => {
  const incompleteItem = (items || [])
    .filter((item) => !item.completed)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  const completedItem = (items || [])
    .filter((item) => item.completed)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  const openResetModal = () =>
    (
      document.getElementById(`reset-store-${storeId}`) as HTMLDialogElement
    )?.showModal();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cart</h3>
        <button
          className={`btn btn-outline btn-sm ${incompleteItem.length === 0 ? 'hidden' : ''}`}
          onClick={openResetModal}
        >
          Reset
        </button>
      </div>
      {incompleteItem.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
      {incompleteItem.length === 0 && <div>No item in cart</div>}

      <h3 className="text-xl font-semibold">Saved for later</h3>
      {completedItem.map((item) => (
        <SavedItemCard key={item._id} item={item} />
      ))}
      {completedItem.length === 0 && <div>No item saved</div>}
    </div>
  );
};

export default ItemList;
