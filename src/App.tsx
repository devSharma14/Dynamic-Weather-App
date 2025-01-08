import './index.css';
import { Layout } from './components/layout';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./context/theme-provider.tsx"
import WeatherPage from './pages/WeatherPage.tsx';
import CityPage from './pages/CityPage.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      // gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/city/:cityname" element={<CityPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App