import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "src/models";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { AppRoute } from "src/config/app-route.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import BankMaster from "src/pages/BankMaster.tsx";
import "./main.scss";
import CardClassMaster from "src/pages/CardClassMaster.tsx";
import CustomerMaster from "src/pages/CustomerMaster.tsx";
import CardMaster from "src/pages/CardMaster.tsx";
import StoreMaster from "src/pages/StoreMaster.tsx";
import TransactionMaster from "src/pages/TransactionMaster.tsx";
import TransactionDetail from "src/pages/TransactionDetail.tsx";
import StoreDetail from "./pages/StoreDetail.tsx";
import CustomerDetail from "./pages/CustomerDetail.tsx";

export const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <App />,
    children: [
      {
        path: AppRoute.BANK,
        element: <BankMaster />,
      },
      {
        path: AppRoute.CARD_CLASSES,
        element: <CardClassMaster />,
      },
      {
        path: AppRoute.CUSTOMER,
        element: <CustomerMaster />,
      },
      {
        path: AppRoute.CUSTOMER_CREATE,
        element: <CustomerDetail />,
      },
      {
        path: AppRoute.CARD,
        element: <CardMaster />,
      },
      {
        path: AppRoute.STORE,
        element: <StoreMaster />,
      },
      {
        path: AppRoute.STORE_CREATE,
        element: <StoreDetail />,
      },
      {
        path: AppRoute.TRANSACTION,
        element: <TransactionMaster />,
      },
      {
        path: AppRoute.TRANSACTION_CREATE,
        element: <TransactionDetail />,
      },
      {
        path: AppRoute.HOME,
        element: (
          <>
          </>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
