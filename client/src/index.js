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

import EquipmentList from "./Pages/EquipmentList";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EquipmentCreator from "./Pages/EquipmentCreator";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout name="Employee"/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <EmployeeList />
            <Layout name="Equipment" />
            <EquipmentList />
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
        path: "/updateEmployee/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/updateEquipment/:id",
        element: <EquipmentUpdater />,
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
