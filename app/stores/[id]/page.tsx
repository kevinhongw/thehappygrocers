import Link from "next/link";
import dbConnect from "@/libs/dbConnect";
import Item, {IItem} from "@/models/Item";
import CreateItemInput from "./_components/CreateItemInput";
import { revalidatePath } from 'next/cache'

type Props = {
  params: {
    id: string;
  };
};

const StorePage = async ({ params }: Props) => {
	const items = await getItems(params.id);
  
  async function createItem(value: string) {
    'use server'
 
    await createItemDB(value, params.id)
    revalidatePath(`/stores/${params.id}`)
  }

	return (
		<div className="p-8 flex flex-col gap-8">
      <CreateItemInput onAction={createItem} />
			{items.map((item) => (
				<div key={item._id.toString()} className="card card-bordered shadow-md h-20 p-6 flex justify-center text-left">
					<div>
						{item.name}
					</div>
				</div>
			))}
		</div>
	);
};

export const getItems = async (storeId: string) => {
	await dbConnect();

	const items: IItem[] = await Item.find({ storeId: storeId });

	return items;
};

export const createItemDB = async (name: string, storeId: string) => {
  await dbConnect();

  console.log('@@@-1', name, storeId)

  try {
    const item: IItem = await Item.create({ name, storeId });
    console.log('@@@', item);
    
    return item;
  } catch(error: any) {
    throw error;
  }
};

export default StorePage;