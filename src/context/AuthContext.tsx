import { createContext, ReactNode } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { QueryCache } from "@tanstack/react-query";

const queryCache = new QueryCache();

const defaultValues = {
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
  login: (_admin: any) => {}, // Update to return void (implicitly)
  logout: () => undefined,
};

export const AuthContext = createContext(defaultValues);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState({
    key: "cartle-admin-loggedIn",
    defaultValue: false,
  });

  const [token, setToken] = usePersistedState({
    key: "cartle-admin-token",
    defaultValue: undefined,
  });

  const login = (admin: any) => {
    const { token } = admin;
    console.log(token);
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // No return statement, meaning it implicitly returns void
  };

  const logout = () => {
    setIsLoggedIn(false);
    queryCache.clear();
    setToken(undefined);
    return undefined; // Explicitly return undefined to satisfy the expected type
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
