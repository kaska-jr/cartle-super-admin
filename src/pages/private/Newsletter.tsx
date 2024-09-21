import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { Newsletter } from "../../types/newsletter";
import { useGetAllNotifications } from "../../services/queries";
import { useNotificationMutation } from "../../services/mutation";
import { Loader2 } from "lucide-react";

const NewsletterPage = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newslettersPerPage] = useState(5); // Number of newsletters per page
  const [formData, setFormData] = useState<Newsletter>({
    title: "",
    content: "",
  });

  const {
    data: newsletterData,
    isLoading,
    isSuccess,
  } = useGetAllNotifications();

  const {
    mutate: sendNotification,
    isPending,
    isSuccess: isSendNotificationSuccess,
  } = useNotificationMutation();

  useEffect(() => {
    console.log(newsletterData?.data?.notifications);
    setNewsletters(newsletterData?.data?.notifications);
  }, [isSuccess]);

  useEffect(() => {
    if (isSendNotificationSuccess) {
      setFormData({ title: "", content: "" });
    }
  }, [isSendNotificationSuccess]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("Both title and content are required");
      return;
    }
    sendNotification(formData);
  };

  // Get current newsletters
  const indexOfLastNewsletter = currentPage * newslettersPerPage;
  const indexOfFirstNewsletter = indexOfLastNewsletter - newslettersPerPage;
  const currentNewsletters = (newsletters || []).slice(
    indexOfFirstNewsletter,
    indexOfLastNewsletter
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="pl-20 lg:pl-20 pt-20 lg:pt-28 w-full h-screen overflow-hidden overflow-y-auto no-scrollbar children">
      <ToastContainer />

      {isLoading ? (
        <div className="flex justify-center items-center my-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className=" bg-slate-900 text-gray-300 dark:bg-slate-900 dark:text-gray-300 p-4 m-2 ml-0 rounded-lg cards dark:border-0 mt-8">
          <div className="">
            <h1 className="text-xl py-2 font-medium">All Newsletters</h1>
            <div className="mt-4 border-0 overflow-x-auto">
              {(currentNewsletters || []).length === 0 ? (
                <div className="text-center text-gray-300 dark:text-gray-300">
                  Opps! No notifications found.
                </div>
              ) : (
                <>
                  <table className="w-full table-auto text-sm text-left">
                    <thead className="border-b dark:border-gray-600">
                      <tr className="font-large text-xl text-gray-300 dark:text-gray-300">
                        <td className="py-3 pr-4 lg:pr-2">ID</td>
                        <td className="py-3 ">Title</td>
                        <td className="py-3 ">Content</td>
                        <td className="py-3 ">Sent At</td>
                        {/* <td className="py-3 "></td> */}
                      </tr>
                    </thead>
                    <tbody className="text-lg text-gray-300 dark:text-gray-300 divide-y dark:divide-gray-600">
                      {(currentNewsletters || []).map((newsletter, index) => (
                        <tr key={index} className="">
                          <td className="py-4 pr-8 lg:pr-2">{newsletter.id}</td>
                          <td className="py-4 capitalize">
                            {newsletter.title}
                          </td>
                          <td className="py-4 capitalize">
                            {newsletter.content}
                          </td>
                          <td className="py-4">
                            {newsletter.createdAt
                              ? new Date(newsletter.createdAt).toLocaleString()
                              : "N/A"}
                          </td>
                          {/* <td className="py-3 pl-4 cursor-pointer hover:text-orange-500">
                            Read More
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex justify-center">
                    {[
                      ...Array(
                        Math.ceil(
                          (newsletters || []).length / newslettersPerPage
                        )
                      ),
                    ]?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`${
                          index === currentPage - 1 && "bg-slate-700"
                        } mx-1 px-3 py-1 rounded-lg text-gray-300 dark:text-gray-300   focus:outline-none`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900 text-gray-300 dark:bg-slate-900 dark:text-gray-300 max-w-3xl mx-auto  p-4 m-2 rounded-lg cards dark:border-0">
        <p className="text-xl p-2 pb-4 pl-0 font-medium dark:text-gray-300">
          Send Notification
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border  border-gray-800 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-800 dark:bg-gray-800 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={5}
              className="mt-1 p-2 w-full border  border-gray-800  rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-800 dark:bg-gray-800 dark:text-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-lg w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPage;
