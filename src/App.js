import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import queryClient from "./clientProvider/clientProvider";
import { SafeArea } from "antd-mobile";
import MainRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeArea position="top" />
      <ChakraProvider>
        <MainRoutes />
      </ChakraProvider>
      <SafeArea position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
