import Link from "next/link";
import dbConnect from "../../libs/dbConnect";
import Store, { IStore } from "../../models/Store";

type Props = {
};

const StoreList = async () => {
	const stores = await getStores();
	return (
		<div className="flex flex-col">
		<div className="header flex justify-between relative h-20 items-center" style={{ background: '#d2f0b4'}}>
			{/* <div /> */}
			<div className="w-full text-center text-xl">Happy Grocers</div>
			<div className="absolute right-5">
				<button className="">refresh</button>
			</div>
		</div>
		<div>
			<div className="p-8 flex flex-col gap-8">
				{stores.map((store) => (
					<div key={store._id.toString()} className="card card-bordered shadow-md h-28 p-6 flex justify-center text-left">
						<Link href={`/stores/${store._id.toString()}`}>
							{store.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	</div>
	);
};

/* Retrieves pet(s) data from mongodb database */
export const getStores = async () => {
	await dbConnect();

	/* find all the data in our database */
	const stores: IStore[] = await Store.find({});

	/* Ensures all objectIds and nested objectIds are serialized as JSON data */
	return stores;
};

export default StoreList;