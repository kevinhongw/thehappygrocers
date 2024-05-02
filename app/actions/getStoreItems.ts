'use server';

import dbConnect from '@/libs/dbConnect';
import Item, { IItem, SerializedItem } from '@/models/Item';

export async function getStoreItems(storeId: string) {
  await dbConnect();

  try {
    const data: IItem[] = await Item.find({ storeId });

    const items: SerializedItem[] = data.map((item) =>
      JSON.parse(JSON.stringify(item)),
    );

    return items;
  } catch (error: any) {
    throw error;
  }
}
