import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/useContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "styled-components";
const queryClient = new QueryClient();
function App() {
  const theme = {
    colors: {
      primary: 'rgb(233, 90, 12)',
      black: '#000',
      white: '#fff',
    },
    shadows: {
      medium: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    gradients: {
      main: 'linear-gradient(45deg, rgba(233, 90, 12, 0.05), rgba(0, 0, 0, 0.05))',
      dark: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))',
    }
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" expand={false} richColors />
          <HashRouter>
            <UserProvider>
              <AppRoutes />
            </UserProvider>
          </HashRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
