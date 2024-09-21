import { Link } from "react-router-dom";
import { convertToNormalTime } from "../../libs/helpers";
import LoadingSpinner from "../shared/LoadingSpinner";

const TopMerchants = ({
  filteredMerchants,
  isLoading,
}: {
  filteredMerchants: any[];
  isLoading: boolean;
}) => {
  // const merchants = [
  //   {
  //     avatar:
  //       "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  //     name: "Marcus Bergson",
  //     revenue: 120000,
  //     topStore: "ElectroMart",
  //     date: "May 23, 2024",
  //   },
  //   {
  //     avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  //     name: "Jaydon Vaccaro",
  //     revenue: 95000,
  //     topStore: "Gadget World",
  //     date: "May 22, 2024",
  //   },
  //   {
  //     avatar: "https://randomuser.me/api/portraits/women/79.jpg",
  //     name: "Cooper Press",
  //     revenue: 110000,
  //     topStore: "Book Haven",
  //     date: "May 23, 2024",
  //   },
  //   {
  //     avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
  //     name: "Corey Schleifer",
  //     revenue: 85000,
  //     topStore: "Techie Land",
  //     date: "May 22, 2024",
  //   },
  //   {
  //     avatar:
  //       "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  //     name: "Phillip Lubin",
  //     revenue: 100000,
  //     topStore: "Fashion Hub",
  //     date: "May 23, 2024",
  //   },
  // ];

  return (
    <div className="bg-slate-900 text-gray-400 dark:bg-slate-900 dark:text-gray-400 p-4 m-2 ml-0 rounded-lg cards dark:border-0">
      <div className="flex justify-between mx-auto items-center mb-4">
        <p className="text-xl font-medium dark:text-gray-300">Top Merchants</p>
        <Link
          to="/admin/merchants"
          className="text-lg text-orange-500 sm:block"
        >
          See all
        </Link>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="mt-4 border-0 overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="border-b dark:border-gray-600">
              <tr className="font-small text-gray-300 text-xl">
                <td className="py-3 pr-4 lg:pr-2">Name</td>
                <td className="py-3 pl-4">Revenue</td>
                <td className="py-3 pl-4">Email Address</td>
                <td className="py-3 pl-4">Date Created</td>
              </tr>
            </thead>

            <tbody className="text-gray-600 divide-y dark:divide-gray-600">
              {filteredMerchants?.slice(0, 5).map((item, idx) => (
                <tr key={idx} className="text-lg">
                  <td className="flex items-center gap-x-3 py-3 pr-8 lg:pr-2">
                    <img
                      src={"/Avatar.jpg"}
                      className="w-10 h-10 rounded-full"
                      alt={item.name}
                    />
                    <div className="pr-2">
                      <span className="block text-gray-300 dark:text-gray-300 pr-2 text-lg font-medium capitalize">
                        {item.firstname} {item.lastname}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap text-gray-300 pl-4 dark:text-gray-300">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.revenue)}
                  </td>
                  <td className="py-4 whitespace-nowrap text-gray-300 pl-4">
                    {item.email}
                  </td>
                  <td className="py-4 whitespace-nowrap text-gray-300 pl-4">
                    {convertToNormalTime(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <div className="text-gray-600 divide-y dark:divide-gray-600 flex flex-col gap-3 items-center justify-center py-10 w-full">
              <LoadingSpinner />
              <p className="text-gray-300 text-lg">
                Fetching Merchants, Please wait
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMerchants;
