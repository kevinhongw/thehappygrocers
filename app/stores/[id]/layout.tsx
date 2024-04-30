import Link from "next/link";
import dbConnect from "@/libs/dbConnect";
import Store, { IStore } from "@/models/Store";
import { revalidatePath } from 'next/cache'
import RefreshButton from "./_components/RefreshButton";

export default async function StoreLayout({
  params,
	children,
}: Readonly<{
  params: {
    id: string;
  };
	children: React.ReactNode;
}>) {
  const store = await getStoreById(params.id);
  
	return (
		<div className="flex flex-col">
			<div className="header flex justify-between relative h-20 items-center" style={{ background: '#d2f0b4'}}>
        <Link className="absolute left-5" href="/stores">back</Link>
				<div className="w-full text-center text-xl">{store.name}</div>
				<div className="absolute right-5">
					<RefreshButton />
				</div>
			</div>
			<div>
					{children}
			</div>
		</div>
	);
}

/* Retrieves pet(s) data from mongodb database */
const getStoreById = async (storeId: string) => {
	await dbConnect();

	/* find all the data in our database */
	const store: IStore | null = await Store.findOne({ _id: storeId });

  if (!store) {
    return {
      name: 'error',
    }
  }

	return store;
};