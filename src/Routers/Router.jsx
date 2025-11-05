import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import ChatInterface from "../Pages/KEyboardViewPortChat/ChatInterface";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <h1>Main</h1>,
      },
      {
        path: "/chat",
        element: <ChatInterface />,
      },
    ],
  },
  {
    path: "/register",
    element: <h1>Register</h1>,
  },
]);
