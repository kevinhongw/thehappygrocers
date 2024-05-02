'use server';

import dbConnect from '@/libs/dbConnect';
import Item, { IItem } from '@/models/Item';

export const createStoreItem = async (name: string, storeId: string) => {
  console.log('@@@@@@', name, storeId);
  await dbConnect();

  try {
    const item: IItem = await Item.create({ name, storeId });

    return item;
  } catch (error: any) {
    throw error;
  }
};
