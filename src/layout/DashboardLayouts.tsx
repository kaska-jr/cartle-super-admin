import { Outlet } from "react-router-dom";
import { Navbar, SideBar, LoadingSpinner, Error } from "../components";

export default function DashboardLayouts() {
  return (
    <main>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {false ? (
        <div className="fixed top-0 h-screen pt-24 lg:pt-28 w-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : false ? (
        <div className="fixed top-0 h-screen pt-24 lg:pt-28 w-screen flex items-center justify-center">
          <Error />
        </div>
      ) : (
        <div className="bg-gray-800 dark:bg-gray-800 min-h-screen">
          <div className="fixed top-0 h-screen">
            <SideBar />
          </div>
          <Outlet />
        </div>
      )}
    </main>
  );
}
