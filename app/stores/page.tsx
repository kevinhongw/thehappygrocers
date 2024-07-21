import Link from 'next/link';
import dbConnect from '../../libs/dbConnect';
import Store, { IStore } from '../../models/Store';
import RefreshButton from './components/RefreshButton';
import { Suspense } from 'react';

type Props = {};

const StoreList = async () => {
  const stores = await getStores();

  return (
    <div className="flex flex-col">
      <div
        className="header flex justify-between relative h-20 items-center"
        style={{ background: '#d2f0b4' }}
      >
        <div className="w-full text-center text-xl">Happy Grocers</div>
        <div className="absolute right-5">
          <Suspense fallback={<div>Loading stores...</div>}>
            <RefreshButton />
          </Suspense>
        </div>
      </div>
      <div>
        <div className="p-8 flex flex-col gap-8">
          {stores.map((store) => (
            <Link
              key={store._id.toString()}
              href={`/stores/${store._id.toString()}`}
              className="h-28"
            >
              <button className="btn bg-white font-light text-xl w-full h-full">
                {store.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Retrieves pet(s) data from mongodb database */
const getStores = async () => {
  await dbConnect();

  /* find all the data in our database */
  const stores: IStore[] = await Store.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  return stores;
};

export default StoreList;
