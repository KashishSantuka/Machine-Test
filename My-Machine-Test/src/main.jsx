import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App.jsx'
// import { Auth0Provider } from "@auth0/auth0-react";
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
   
      <RouterProvider router={router} />
  
  </React.StrictMode>
);
