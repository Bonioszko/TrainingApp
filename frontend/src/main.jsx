import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { UserContextProvider } from "../context/userContext.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <NotFoundPage></NotFoundPage>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/register",
        element: <Register></Register>,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </UserContextProvider>
    </React.StrictMode>
);
