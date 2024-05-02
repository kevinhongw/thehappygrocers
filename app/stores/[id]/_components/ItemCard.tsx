'use client';

import { SerializedItem } from '@/models/Item';
import React from 'react';
type Props = {
  item: SerializedItem;
  onChange: (itemId: string, value: boolean) => void;
};

const ItemCard: React.FC<Props> = ({ item, onChange }) => {
  const handleOnChange = (event: any) => {
    onChange(item._id, event.target.checked);
  };

  return (
    <div className="card card-bordered shadow-md h-20 p-6 flex flex-row justify-start gap-4">
      <input
        type="checkbox"
        className="checkbox"
        checked={item.completed}
        onChange={handleOnChange}
      />
      <span className={`${item.completed ? 'line-through' : ''}`}>
        {item.name}
      </span>
    </div>
  );
};

export default ItemCard;
