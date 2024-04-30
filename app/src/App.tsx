import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import DarkModeProvider from "./context/DarkModeContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ui/ScrollToTop";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Recipes from "./pages/Recipes";
import Articles from "./pages/Articles";
import MealPlanner from "./pages/MealPlanner";
import Rank from "./pages/Rank";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="articles" element={<Articles />} />
                <Route path="planner" element={<MealPlanner />} />
                <Route path="rank" element={<Rank />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              zIndex: 1000,
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
            className:
              "bg-bgWhite dark:bg-bgDark text-bgDark dark:text-bgWhite",
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
