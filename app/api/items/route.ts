import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import dbConnect from '@/libs/dbConnect';
import Item, { IItem } from '@/models/Item';

export async function POST(req: NextRequest) {
  const { name, storeId } = await req.json();

  await dbConnect();

  try {
    const item: IItem = await Item.create({ name, storeId });

    return item;
  } catch(error: any) {
    throw error;
  }
}