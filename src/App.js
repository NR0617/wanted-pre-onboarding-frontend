import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TodoList from "./pages/TodoList";
import ErrorPage from "./pages/ErrorPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />,
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

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
