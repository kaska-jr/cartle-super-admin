import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IoStorefrontSharp } from "react-icons/io5";
import { Store } from "../../types/store";
import { useGetAllStores } from "../../services/queries";
import { LoadingSpinner } from "../../components";

const Stores = () => {
  const {
    data: StoresData,
    isLoading: isStoresLoading,
    error,
    isError,
  } = useGetAllStores();

  console.log(error);

  const stores = StoresData?.data?.stores || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage] = useState(5); // Number of stores per page
  const [showPublished, setShowPublished] = useState<boolean | null>(null); // State to toggle between published and not published stores

  // Get current stores based on pagination and filter
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  let currentStores = stores.slice(indexOfFirstStore, indexOfLastStore);

  if (showPublished !== null) {
    currentStores = currentStores.filter(
      (store: Store) => store.published === showPublished
    );
  }

  const publishedStates = [
    { state: null, value: "all" },
    { state: true, value: "active" },
    { state: false, value: "Not active" },
  ];

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Toggle between published and not published stores
  const togglePublished = (published: boolean | null) => {
    console.log(published);
    setShowPublished(published);
    // setCurrentPage(1); // Reset pagination when filter changes
  };

  return (
    <div className="pl-20 lg:pl-20 pt-20 lg:pt-28 w-full h-screen overflow-hidden overflow-y-auto no-scrollbar children">
      <h1 className="text-2xl p-2 font-medium text-gray-300 dark:text-gray-300">
        Stores
      </h1>
      <div className="flex justify-between pr-10">
        <div className="flex mb-4">
          {publishedStates.map((publishedState) => {
            const { state, value } = publishedState;
            return (
              <button
                key={value}
                onClick={() => togglePublished(state)}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  showPublished === state
                    ? "bg-orange-500 text-white"
                    : "bg-slate-900 dark:bg-slate-900 text-gray-300 dark:text-gray-300"
                } focus:outline-none capitalize`}
              >
                {value}
              </button>
            );
          })}
        </div>
        <button className="bg-orange-500 text-white py-1 px-2 rounded-lg h-fit capitalize">
          create store
        </button>
      </div>

      <div className=" bg-slate-900 text-gray-300 dark:bg-slate-900 dark:text-gray-300 p-4 m-2 ml-0 rounded-lg cards dark:border-0">
        <div>
          {isStoresLoading ? (
            <div className="text-gray-600 divide-y dark:divide-gray-600 flex flex-col gap-3 items-center justify-center py-10 w-full">
              <LoadingSpinner />
              <p className="text-gray-300 text-lg">
                Fetching Store, Please wait
              </p>
            </div>
          ) : currentStores.length > 0 ? (
            <div className="mt-4 border-0 overflow-x-auto">
              <>
                <table className="w-full table-auto text-sm text-left">
                  <thead className="border-b dark:border-gray-600">
                    <tr className="font-large text-lg text-gray-300 dark:text-gray-300">
                      <td className="py-4 text-xl"></td>
                      <td className="py-4 text-xl pr-4 lg:pr-2">Store Name</td>
                      <td className="py-4 text-xl">Domain Name</td>
                      <td className="py-4 text-xl">Store Email</td>
                      <td className="py-4 text-xl">Store Contact</td>
                      <td className="py-4 text-xl">Country/Region</td>
                    </tr>
                  </thead>

                  <tbody className="text-gray-300 dark:text-gray-300 divide-y dark:divide-gray-600">
                    {currentStores.map((store: Store) => (
                      <tr key={store?.id}>
                        <td className="py-4 text-lg">
                          {store.storeImg ? (
                            <img
                              src={store.storeImg}
                              alt={store.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <IoStorefrontSharp
                                className="w-6 h-6 text-gray-700"
                                fontSize={6}
                              />
                            </div>
                          )}
                        </td>
                        <td className="py-4 text-lg pr-8 lg:pr-2 capitalize">
                          {store.name}
                        </td>
                        <td className="py-4 text-lg">{store.domainName}</td>
                        <td className="py-4 text-lg">{store.storeEmail}</td>
                        <td className="py-4 text-lg">{store.storePhone}</td>
                        <td className="py-4 text-lg">
                          {store.countryRegion ?? "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex justify-center">
                  {[...Array(Math.ceil(stores.length / storesPerPage))].map(
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className="mx-1 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-300 dark:focus:bg-gray-700"
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              </>
            </div>
          ) : !isError ? (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <p className="capitalize text-lg">
                No store available for this category
              </p>
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
  );
};

export default Stores;
