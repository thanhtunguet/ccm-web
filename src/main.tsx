import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { AppRoute } from "src/config/app-route.ts";
import BankDetail from "src/pages/BankDetail.tsx";
import BankMaster from "src/pages/BankMaster.tsx";
import CardClassDetail from "src/pages/CardClassDetail.tsx";
import CardClassMaster from "src/pages/CardClassMaster.tsx";
import CardMaster from "src/pages/CardMaster.tsx";
import CustomerMaster from "src/pages/CustomerMaster.tsx";
import StoreMaster from "src/pages/StoreMaster.tsx";
import TransactionDetail from "src/pages/TransactionDetail.tsx";
import TransactionMaster from "src/pages/TransactionMaster.tsx";
import App from "./App.tsx";
import "./main.scss";
import CardDetail from "./pages/CardDetail.tsx";
import CustomerDetail from "./pages/CustomerDetail.tsx";
import HelpPage from "./pages/help/HelpPage.tsx";
import StoreDetail from "./pages/StoreDetail.tsx";

export const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <App/>,
    children: [{
      path: AppRoute.HELP,
      element: <HelpPage/>,
    },
    {
      path: AppRoute.BANK,
      element: <BankMaster/>,
    },
    {
      path: AppRoute.BANK_CREATE,
      element: <BankDetail/>,
    },
    {
      path: AppRoute.CARD_CLASSES,
      element: <CardClassMaster/>,
    },

    {
      path: AppRoute.CARD_CLASS_CREATE,
      element: <CardClassDetail/>,
    },
    {
      path: AppRoute.CUSTOMER,
      element: <CustomerMaster/>,
    },
    {
      path: AppRoute.CUSTOMER_CREATE,
      element: <CustomerDetail/>,
    },
    {
      path: AppRoute.CARD,
      element: <CardMaster/>,
    },
    {
      path: AppRoute.CARD_CREATE,
      element: <CardDetail/>,
    },
    {
      path: AppRoute.STORE,
      element: <StoreMaster/>,
    },
    {
      path: AppRoute.STORE_CREATE,
      element: <StoreDetail/>,
    },
    {
      path: AppRoute.TRANSACTION,
      element: <TransactionMaster/>,
    },
    {
      path: AppRoute.TRANSACTION_CREATE,
      element: <TransactionDetail/>,
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
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
