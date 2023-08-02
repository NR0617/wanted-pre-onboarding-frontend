import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TodoList from "./pages/TodoList";
import ErrorPage from "./pages/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/todo",
    element: <TodoList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
