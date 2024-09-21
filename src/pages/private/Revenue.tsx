import Construction from "../../components/shared/Construction";
import { nanoid } from "nanoid";
//notification
import { useState } from "react";

const RevenuePage = () => {
  // Dummy data for recent revenue transactions
  const recentCommissions = [
    { id: nanoid(), amount: 100, date: "2024-04-01" },
    { id: nanoid(), amount: 150, date: "2024-03-30" },
    { id: nanoid(), amount: 200, date: "2024-03-28" },
    { id: nanoid(), amount: 120, date: "2024-03-25" },
    { id: nanoid(), amount: 180, date: "2024-03-22" },
  ];

  const recentTransactions = [
    { id: nanoid(), amount: 50, date: "2024-04-02" },
    { id: nanoid(), amount: 80, date: "2024-03-31" },
    { id: nanoid(), amount: 100, date: "2024-03-29" },
    { id: nanoid(), amount: 70, date: "2024-03-26" },
    { id: nanoid(), amount: 90, date: "2024-03-23" },
  ];

  const recentPlans = [
    { id: nanoid(), amount: 200, date: "2024-03-27" },
    { id: nanoid(), amount: 300, date: "2024-03-24" },
    { id: nanoid(), amount: 250, date: "2024-03-21" },
    { id: nanoid(), amount: 180, date: "2024-03-18" },
    { id: nanoid(), amount: 220, date: "2024-03-15" },
  ];

  const [selectedType, setSelectedType] = useState<string>("all");

  // Filtered recent transactions based on selected type
  let filteredTransactions = [];

  if (selectedType === "commission") {
    filteredTransactions = recentCommissions;
  } else if (selectedType === "transaction") {
    filteredTransactions = recentTransactions;
  } else if (selectedType === "plan") {
    filteredTransactions = recentPlans;
  } else {
    filteredTransactions = [
      ...recentCommissions,
      ...recentTransactions,
      ...recentPlans,
    ];
  }

  const revenueFilterData = ["all", "commission", "transaction", "plan"];

  const tableHeader = ["S/N", "Type", "Amount", "Date"];

  // Calculate total revenue
  const totalRevenue = filteredTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="pl-20 lg:pl-20 pt-20 lg:pt-28 w-full h-screen overflow-hidden overflow-y-auto no-scrollbar children">
      <p className="text-2xl p-2 font-medium text-gray-300 dark:text-gray-300">
        Revenue
      </p>

      <div>
        <Construction />
      </div>

      {/* <div className="flex gap-x-2 mb-4">
        {revenueFilterData.map((revenueFilterDataItem) => {
          return (
            <button
              key={revenueFilterDataItem}
              onClick={() => setSelectedType(revenueFilterDataItem)}
              className={`mx-1 px-3 py-1 rounded-lg ${
                selectedType === revenueFilterDataItem
                  ? "bg-orange-500 text-white"
                  : "bg-slate-900 dark:bg-slate-900 text-gray-300 dark:text-gray-300"
              } focus:outline-none capitalize`}
            >
              {revenueFilterDataItem}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900 dark:bg-slate-900 text-gray-300 dark:text-gray-300 p-4 m-2 ml-0 rounded-lg cards dark:border-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="mt-4 border-0">
            <table className="w-full text-left">
              <thead>
                <tr>
                  {tableHeader.map((item, index) => {
                    return (
                      <th
                        className="px-4 py-2 border dark:border-gray-700"
                        key={index}
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-2 border dark:border-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700">
                      {selectedType === "commission"
                        ? "Commission"
                        : selectedType === "transaction"
                        ? "Transaction"
                        : "Plan"}
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700">
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-2 border dark:border-gray-700">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-3">
              <div className="text-lg font-medium my-4">Total Revenue: </div>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RevenuePage;
