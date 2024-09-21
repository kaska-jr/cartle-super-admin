import {
  SalesTrend,
  TotalCards,
  TopMerchants,
  TopStores,
} from "../../components";

import { useGetAllMerchants, useGetAllStores } from "../../services/queries";
import { Merchant } from "../../types/merchant";
import { Store } from "../../types/store";

const Overview = () => {
  //Merchant Data
  const { data: MerchantsData, isLoading: isMerchantsLoading } =
    useGetAllMerchants();

  const filteredMerchants = MerchantsData?.data.merchants.filter(
    (merchant: Merchant) => merchant.role === "merchant"
  );
  const merchantCount = filteredMerchants?.length;

  //Store Data
  const { data: StoresData, isLoading: isStoresLoading } = useGetAllStores();

  const storesCount = StoresData?.data?.totalStores;
  const stores: Store = StoresData?.data?.stores || [];

  return (
    <>
      <div className="pl-20 lg:pl-20 pt-20 lg:pt-28 w-full h-screen overflow-hidden overflow-y-auto no-scrollbar children">
        <div className="lg:flex mb-4">
          <div className="lg:w-2/3 ">
            <SalesTrend />
          </div>
          <div className="lg:w-2/5 lg:pl-2 mt-4 lg:mt-0 ">
            <TotalCards
              merchantCount={merchantCount}
              storesCount={storesCount}
            />
          </div>
        </div>

        <div className="lg:flex">
          <div className="lg:w-2/3">
            <TopMerchants
              filteredMerchants={filteredMerchants}
              isLoading={isMerchantsLoading}
            />
          </div>

          <div className="lg:w-2/5 lg:pl-2 mt-4 lg:mt-0">
            <TopStores stores={stores} isLoading={isStoresLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
