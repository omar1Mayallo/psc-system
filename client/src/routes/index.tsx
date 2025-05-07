import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout";
import NotFound from "../pages/404";
import Login from "../pages/Auth/pages/Login";
import Register from "../pages/Auth/pages/Register";
import Dashboard from "../pages/Dashboard";
import Devices from "../pages/Devices";
import CreateDevice from "../pages/Devices/pages/CreateDevice";
import EditDevice from "../pages/Devices/pages/EditDevice";
import Orders from "../pages/Orders";
import CreateOrder from "../pages/Orders/pages/CreateOrder";
import EditOrder from "../pages/Orders/pages/EditOrder";
import Sessions from "../pages/Sessions";
import Snacks from "../pages/Snacks";
import CreateSnack from "../pages/Snacks/pages/CreateSnack";
import EditSnack from "../pages/Snacks/pages/EditSnack";
import {UserRoles} from "../shared/types/entities/User";
import {AuthRoutes, PrivateRoutes} from "./AuthRoutes";

const router = createBrowserRouter([
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AuthRoutes />,
        children: [
          // FOR USER
          {index: true, element: <Devices />},
          {path: "snacks", element: <Snacks />},

          // FOR OWNER & ADMIN
          {
            element: (
              <PrivateRoutes userRole={[UserRoles.ADMIN, UserRoles.OWNER]} />
            ),
            children: [
              {
                path: "snacks",
                children: [
                  {
                    element: <PrivateRoutes userRole={UserRoles.OWNER} />,
                    children: [
                      {path: ":snackId/edit", element: <EditSnack />},
                      {path: "create", element: <CreateSnack />},
                    ],
                  },
                ],
              },
              {
                path: "devices",
                children: [
                  {
                    element: <PrivateRoutes userRole={UserRoles.OWNER} />,
                    children: [
                      {path: ":deviceId/edit", element: <EditDevice />},
                      {path: "create", element: <CreateDevice />},
                    ],
                  },
                ],
              },
              {
                path: "orders",
                children: [
                  {index: true, element: <Orders />},
                  {path: ":orderId/edit", element: <EditOrder />},
                  {path: "create", element: <CreateOrder />},
                ],
              },
              {path: "sessions", element: <Sessions />},
              {
                path: "dashboard",
                element: <PrivateRoutes userRole={UserRoles.OWNER} />,
                children: [{index: true, element: <Dashboard />}],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
