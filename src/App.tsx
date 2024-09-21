import { ToastContainer } from "react-toastify";
import AppRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // refetchOnWindowFocus: true,
    },
  },
});

function App() {
  //wrap your Context providers here
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContainer
          theme="light"
          className="toastify"
          position="top-center"
        />
        <AppRouter />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
