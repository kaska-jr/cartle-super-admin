import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Login,
  Merchants,
  Newsletter,
  Overview,
  Reports,
  Revenue,
  Roles,
  Stores,
  StoreTracking,
} from "../pages";
import { Suspense } from "react";
import DashboardLayouts from "../layout/DashboardLayouts";
import { Loader, NotFound } from "../components";
import PrivateRouteWrapper from "../auth-wrappers/PrivateRouteWrapper";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={<PrivateRouteWrapper component={<DashboardLayouts />} />}
        >
          <Route path="/admin" element={<Overview />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="reports" element={<Reports />} />
          <Route path="stores" element={<Stores />} />
          <Route path="roles" element={<Roles />} />
          <Route path="store-tracking" element={<StoreTracking />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
