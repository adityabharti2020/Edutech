import {Navigate , useRoutes } from "react-router-dom";
import Home from "./components/Home/Home";
export default function Router() {
    const routes = useRoutes([
      { element: <Navigate to="/home" />, index: true },
      {
        path: "/home",
        element: <Home />,
      },
    ]);
  
    return routes;
  }
  