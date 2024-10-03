import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import ForgotPassword from "./Components/loginPage/forgotPassword/ForgotPassword";
import Login from "./Components/loginPage/Login";
import SignUp from "./Components/signUp/SignUp";
import DashBoard from "./Components/dashBoard/DashBoard";
import HomePage from "./Components/homePage/HomePage";
import CreateEmploye from "./Components/createEmploye/CreateEmploye";
import EmployeList from "./Components/employeList/EmployeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/dashBoard",
    element: <DashBoard />,
  },
  {
    path: "/homePage",
    element: <HomePage />,
  },
  {
    path: "/createEmploye",
    element: <CreateEmploye />,
  },
  {
    path: "/employeList",
    element: <EmployeList/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-g6b5nnc2a702rgia.au.auth0.com"
      clientId="ZUfB1lKJjIMf4eDsLvd6wOVqytpAbX7m"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
