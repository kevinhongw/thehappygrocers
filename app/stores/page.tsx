import Link from "next/link";
import dbConnect from "../../libs/dbConnect";
import Store, { Stores } from "../../models/Store";
import { GetServerSideProps } from "next";

type Props = {
};

const StoreList = async () => {
	const stores = await getStores();
	return (
		<>
			<h1>Stores</h1>
			{stores.map((store) => (
				<div key={store._id}>
					<div className="card">
						{store.name}
					</div>
				</div>
			))}
		</>
	);
};

/* Retrieves pet(s) data from mongodb database */
export const getStores = async () => {
	await dbConnect();

	/* find all the data in our database */
	const result = await Store.find({});

	console.log('@@@', result);
	/* Ensures all objectIds and nested objectIds are serialized as JSON data */
	const stores = result.map((doc) => {
		const store = JSON.parse(JSON.stringify(doc));
		return store;
	});

	return stores;
};

export default StoreList;