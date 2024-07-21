import { getStoreItems } from '@/app/actions/getStoreItems';
import StoreItems from './_components/StoreItems';
import { ConfirmResetModal } from './_components/ConfirmResetModal';

type Props = {
  params: {
    id: string;
  };
};

const StorePage = async ({ params }: Props) => {
  const items = await getStoreItems(params.id);

  return (
    <div className="p-8 flex flex-col gap-8">
      <StoreItems storeId={params.id} items={items} />
      <ConfirmResetModal storeId={params.id} />
    </div>
  );
};

export default StorePage;
