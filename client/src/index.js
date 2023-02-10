import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";

import Robert from "./Pages/Robert";
import Missing from "./Pages/Missing";
import Toppaid from "./Pages/Toppaid";
import Kitten from "./Pages/Kittens";

import EquipmentList from "./Pages/EquipmentList";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EquipmentCreator from "./Pages/EquipmentCreator";

import DivisionList from "./Pages/DivisionList";
import DivisionCreator from "./Pages/DivisionCreator";
import DivisionUpdater from "./Pages/DivisionUpdater";

import ToolList from "./Pages/ToolList";
import ToolUpdater from "./Pages/ToolUpdater";
import ToolCreator from "./Pages/ToolCreator";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Layout name="Employee" />
            <EmployeeList />
            <Layout name="Equipment" />
            <EquipmentList />
            <Layout name="Division" />
            <DivisionList />
          </>
        ),
      },
      {
        path: "/createEmployee",
        element: <EmployeeCreator />,
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/createDivision",
        element: <DivisionCreator />,
      },
      {
        path: "/createTool",
        element: <ToolCreator />,
      },
      {
        path: "/updateEmployee/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/updateEquipment/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/updateDivision/:id",
        element: <DivisionUpdater />,
      },
      {
        path: "/updateTool/:id",
        element: <ToolUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/robert",
        element: <Robert />,
      },
      {
        path: "/missing",
        element: <Missing />,
      },
      {
        path: "/top-paid",
        element: <Toppaid />,
      },
      {
        path: "/tools",
        element: (
          <>
            <Layout name="Tool" />
            <ToolList />,
          </>
        ),
      },
      {
        path: "/kittens/:id",
        element: <Kitten />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
