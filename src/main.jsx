import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthForm from "./components/AuthForm"; // Make sure to import AuthForm
import FlightTicketForm from "./components/FlightTicketForm";
import FlightTicketList from "./components/FlightTicketList";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, element: <FlightTicketList /> },
      { path: "register", element: <AuthForm formMode="register" /> },
      { path: "login", element: <AuthForm formMode="login" /> },
      { path: "flight-form", element: <FlightTicketForm /> },
      { path: "flight-form/:id", element: <FlightTicketForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
