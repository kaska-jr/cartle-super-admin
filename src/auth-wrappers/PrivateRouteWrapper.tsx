import { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRouteWrapper = ({ component }: { component: ReactNode }) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{component}</>;
};

export default PrivateRouteWrapper;
