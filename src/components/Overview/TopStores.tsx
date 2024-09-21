import React from "react";
import { Link } from "react-router-dom";
import { Account, Store } from "../../types/store";
import LoadingSpinner from "../shared/LoadingSpinner";

const StoreProgress: React.FC<Store> = ({ name, account, percentage }) => {
  const amountGenerated = account[0]?.revenue;
  console.log(amountGenerated);

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 50) {
      return "progress-purple";
    } else if (percentage >= 40) {
      return "progress-blue";
    } else if (percentage >= 30) {
      return "progress-orange";
    } else {
      return "bg-progress";
    }
  };

  return (
    <div className="mb-1">
      <div className="flex justify-between mb-1">
        <span className=" font-medium capitalize text-lg text-gray-300 dark:text-gray-300">
          {name}
        </span>
      </div>
      <div className="w-full bg-gray-200 my-2 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`rounded-full h-2.5 ${getProgressBarColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-sm font-sm text-gray-400 dark:text-gray-400">
          $ {amountGenerated}
        </span>
        <span className="text-sm font-sm text-gray-400 dark:text-gray-400">
          +{percentage}%
        </span>
      </div>
    </div>
  );
};

const TopStores = ({ stores, isLoading }: any) => {
  // Calculate the total revenue of each store
  let totalRevenue = 0;
  stores.forEach((store: Store) => {
    store.account.forEach((account: Account) => {
      totalRevenue += account.revenue;
    });
  });

  // Calculate the percentage contribution of each store
  const storesWithPercentage = stores.map((store: Store) => {
    const storeRevenue = store.account.reduce(
      (sum: number, account: Account) => sum + account.revenue,
      0
    );
    const percentage =
      totalRevenue > 0 ? (storeRevenue / totalRevenue) * 100 : 0;
    return {
      ...store,
      percentage: percentage.toFixed(2), // Keeping two decimal points for percentage
    };
  });

  return (
    <div className="bg-slate-900 text-gray-300 dark:bg-slate-900 dark:text-gray-300 p-4 m-2 ml-0 rounded-lg cards dark:border-0">
      <div className="flex justify-between mx-auto items-center mb-4">
        <p className="text-xl font-medium dark:text-gray-300">Top Stores</p>
        <Link to="/admin/stores" className="text-sm text-orange-500 sm:block">
          See all
        </Link>
      </div>
      {isLoading && (
        <div className="text-gray-600 divide-y dark:divide-gray-600 flex flex-col gap-3 items-center justify-center py-10 w-full">
          <LoadingSpinner />
          <p className="text-gray-300 text-lg">Fetching Stores, Please wait</p>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto">
        {storesWithPercentage
          .slice(0, 5)
          .map((store: Store & { percentage: string }) => (
            <StoreProgress key={store.id} {...store} />
          ))}
      </div>
    </div>
  );
};

export default TopStores;
