import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthForm from "./components/AuthForm";
import FlightTicketForm from "./components/FlightTicketForm";
import FlightTicketList from "./components/FlightTicketList";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorBoundary />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
