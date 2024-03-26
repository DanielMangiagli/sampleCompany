import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import DeviceDetails from "./pages/DeviceDetails.tsx";
import DeviceList from "./pages/DevicesList.tsx";
import VulnerabilitiesList from "./pages/VulnerabilitiesList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/devices",
        element: <DeviceList />,
      },
      {
        path: "/vulnerabilities",
        element: <VulnerabilitiesList />,
      },
      {
        path: "/devices/:id",
        element: <DeviceDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
