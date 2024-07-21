'use client';

import { PlusCircledIcon } from '@radix-ui/react-icons';
import React from 'react';

type Props = {
  disabled: boolean;
  onCreate: (value: string) => void;
};

const CreateItemInput: React.FC<Props> = ({ disabled, onCreate }) => {
  const [value, setValue] = React.useState('');

  const handleOnSubmit = () => {
    if (value.trim() === '') return;
    onCreate(value);
    setValue('');
  };

  return (
    <form action={handleOnSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          name="itemName"
          className="grow"
          placeholder="New item"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
        />
        <button type="submit" className="btn btn-ghost p-0">
          <PlusCircledIcon className="w-6 h-6" />
        </button>
      </label>
    </form>
  );
};

export default CreateItemInput;
