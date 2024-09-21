import { useState, useEffect } from "react";
import { Merchant } from "../../types/merchant";
import { useGetAllMerchants } from "../../services/queries";
import {
  convertToNormalTime,
  getSubscriptionPlanName,
} from "../../libs/helpers";
import { LoadingSpinner } from "../../components";

const Merchants = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filterPlan, setFilterPlan] = useState("all");
  const [selectedMerchants, setSelectedMerchants] = useState("all");

  const {
    data: MerchantsData,
    isLoading: isMerchantsLoading,
    error,
    isError,
  } = useGetAllMerchants();

  console.log(error);

  const filteredMerchants = MerchantsData?.data.merchants.filter(
    (merchant: Merchant) => merchant.role === "merchant"
  );

  const filteredFreeUsers = filteredMerchants?.filter(
    (merchant: Merchant) => merchant.subscriptionPlanId === 1
  );

  const filteredProUsers = filteredMerchants?.filter(
    (merchant: Merchant) => merchant.subscriptionPlanId === 2
  );

  console.log("check", filteredProUsers);

  const filteredPrimeUsers = filteredMerchants?.filter(
    (merchant: Merchant) => merchant.subscriptionPlanId === 3
  );

  useEffect(() => {
    if (filteredMerchants) {
      if (selectedMerchants === "all") {
        setMerchants(filteredMerchants);
      } else if (selectedMerchants === "Free Users") {
        setMerchants(filteredFreeUsers);
      } else if (selectedMerchants === "Pro Users") {
        setMerchants(filteredProUsers);
      } else if (selectedMerchants === "Prime Users") {
        setMerchants(filteredPrimeUsers);
      }
    }
  }, [selectedMerchants, filteredMerchants]);

  const merchantStates = [
    { planId: null, value: "all" },
    {
      planId: 1,
      value: "Free Users",
    },
    { planId: 2, value: "Pro Users" },
    { planId: 3, value: "Prime Users" },
  ];

  type MerchantState = {
    planId: number | null;
    value: string;
  };

  // Filter merchants by plan
  const filterMerchantsByPlan = (merchantState: MerchantState) => {
    const { value } = merchantState;
    setSelectedMerchants(value);
    setFilterPlan(value);
  };

  return (
    <div className="pl-20 lg:pl-20 pt-20 lg:pt-28 w-full h-screen overflow-hidden overflow-y-auto no-scrollbar children">
      <p className="text-2xl p-2 font-medium text-gray-300 dark:text-gray-300">
        Merchants
      </p>
      <div className="flex justify-between pr-9">
        <div className="flex mb-4">
          {merchantStates.map((merchantState) => {
            const { planId, value } = merchantState;
            return (
              <button
                onClick={() => filterMerchantsByPlan(merchantState)} // Change here
                key={planId}
                className={`mx-1  px-3 py-1 rounded-lg ${
                  filterPlan === value
                    ? "bg-orange-500 text-white"
                    : "bg-slate-900 dark:bg-slate-900 text-gray-300 dark:text-gray-300"
                } focus:outline-none capitalize`}
              >
                {value}
              </button>
            );
          })}
        </div>

        <button className="bg-orange-500 text-white py-1 px-2 rounded-lg h-fit">
          Create Merchant
        </button>
      </div>

      <div className="bg-slate-900 text-gray-400 dark:bg-slate-900 dark:text-gray-200 p-4 m-2 ml-0 rounded-lg cards dark:border-0">
        <div className="flex items-center flex-col">
          <div className=" flex flex-col border-0 overflow-x-auto w-full">
            {isMerchantsLoading ? (
              <div className="text-gray-600 divide-y dark:divide-gray-600 flex flex-col gap-3 items-center justify-center py-10 w-full">
                <LoadingSpinner />
                <p className="text-gray-300 text-lg">
                  Fetching Merchants, Please wait
                </p>
              </div>
            ) : merchants?.length > 0 ? (
              <>
                <table className="w-full table-auto text-sm text-left">
                  <thead className="border-b dark:border-gray-600">
                    <tr className="font-large text-xl text-gray-300 dark:text-gray-300 w-full">
                      <td className="py-3 "></td>
                      <td className="py-3 pr-4 lg:pr-2">Merchant Name</td>
                      <td className="py-3 ">Email</td>
                      <td className="py-3 ">Email Verified</td>
                      <td className="py-3 ">Country/Region</td>
                      <td className="py-3 ">Subscription Plan</td>
                      <td className="py-3 ">Date Created</td>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 dark:text-gray-300 divide-y dark:divide-gray-600 text-lg">
                    {filteredMerchants?.map(
                      (merchant: Merchant, index: number) => (
                        <tr key={index} className="">
                          <td className="py-4">
                            <img
                              src={merchant.profilePhoto || "/Avatar.jpg"}
                              alt={merchant.firstname}
                              className="w-8 h-8 rounded-full"
                            />
                          </td>
                          <td className="py-4 pr-8 lg:pr-2 capitalize">
                            <span>
                              {merchant.firstname} {merchant.lastname}
                            </span>
                          </td>
                          <td className="py-4">{merchant.email}</td>

                          <td className="py-4">
                            {merchant.emailVerified ? "Yes" : "No"}
                          </td>
                          <td className="py-4">
                            {merchant.countryRegion || "N/A"}
                          </td>
                          <td className="py-4">
                            {getSubscriptionPlanName(
                              merchant.subscriptionPlanId
                            )}
                          </td>

                          <td className="py-4">
                            {convertToNormalTime(merchant.createdAt)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </>
            ) : !isError ? (
              <div className="flex flex-col md:flex-row gap-6 items-center text-lg">
                <p className="capitalize">No merchant(s) in this Category</p>
              </div>
            ) : (
              <div className="text-gray-600 divide-y dark:divide-gray-600 flex flex-col gap-3 items-center justify-center py-10 w-full">
                <p className="text-gray-300 text-lg">
                  Error Fetching Data, Something went wrong
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchants;
