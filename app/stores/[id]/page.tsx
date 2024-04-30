import Link from 'next/link';
import dbConnect from '@/libs/dbConnect';
import Item, { IItem } from '@/models/Item';
import CreateItemInput from './_components/CreateItemInput';
import { revalidatePath } from 'next/cache';
import ItemCard from './_components/ItemCard';
import { ObjectId } from 'mongodb';

type Props = {
  params: {
    id: string;
  };
};

const StorePage = async ({ params }: Props) => {
  const items = await getItems(params.id);

  async function createItem(value: string) {
    'use server';

    await createItemDB(value, params.id);
    revalidatePath(`/stores/${params.id}`);
  }

  async function updateItem(itemId: ObjectId, value: boolean) {
    'use server';

    await updateItemDB(itemId, value);
    revalidatePath(`/stores/${params.id}`);
  }

  const incompleteItem = items.filter((item) => !item.completed);
  const completedItem = items.filter((item) => item.completed);

  return (
    <div className="p-8 flex flex-col gap-8">
      <CreateItemInput onAction={createItem} />
      {incompleteItem.map((item) => (
        <ItemCard key={item._id} item={item} onChange={updateItem} />
      ))}
      {completedItem.map((item) => (
        <ItemCard key={item._id} item={item} onChange={updateItem} />
      ))}
    </div>
  );
};

const getItems = async (storeId: string) => {
  await dbConnect();

  const items: IItem[] = await Item.find({ storeId: storeId });

  return items.map((item) => JSON.parse(JSON.stringify(item)));
};

const createItemDB = async (name: string, storeId: string) => {
  await dbConnect();

  try {
    const item: IItem = await Item.create({ name, storeId });

    return item;
  } catch (error: any) {
    throw error;
  }
};

const updateItemDB = async (itemId: ObjectId, completed: boolean) => {
  await dbConnect();

  console.log('@@@-1', itemId);

  try {
    await Item.updateOne({ _id: itemId }, { completed });
  } catch (error: any) {
    throw error;
  }
};

export default StorePage;
