import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../components/layout/Main";
import SignIn from "../pages/SignIn";
import Movements from "../pages/Movements";
import ProfileIndex from "../pages/Profile";
import EditProfile from "../pages/Profile/editProfile";
import EditAddress from "../pages/Profile/editAddress";
import EditBank from "../pages/Profile/editBank";
import { useRoleGet } from "../hooks/useUser.query";
import AdminIndex from "../pages/Admin";
import CreateUser from "../pages/Admin/Create";
import ListProfiles from "../pages/Admin/ListProfiles";
import Description from "../pages/Admin/Description";
import { isAuthenticated } from "../services/auth";
import Apport from "../pages/Admin/Apport";
import Withdraw from "../pages/Admin/Withdraw";
import Forgot from "../pages/Forgot";
import Reset from "../pages/reset";

export default function MainRoutes() {
  const { data } = useRoleGet();
  return useRoutes([
    {
      path: "/",
      element: isAuthenticated() ? <Main /> : <Navigate to="/login" />,
      children: [
        {
          element: <Navigate to="/" />,
        },
        { path: "/", element: <Home /> },
        { path: "/investiment", element: <Movements /> },
        {
          path: "/profile",
          children: [
            { path: "", element: <ProfileIndex /> },
            { path: "edit-profile", element: <EditProfile /> },
            { path: "edit-address", element: <EditAddress /> },
            { path: "edit-bank", element: <EditBank /> },
          ],
        },
        data === 99 && {
          path: "/admin",
          children: [
            { path: "", element: <AdminIndex /> },
            { path: "users", element: <h1>Users</h1> },
            { path: "create-user", element: <CreateUser /> },
            { path: "list-users", element: <ListProfiles /> },
            { path: "description/:id", element: <Description /> },
            { path: "aporte/:id", element: <Apport /> },
            { path: "saque/:id", element: <Withdraw /> },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    { path: "/recuperar-senha", element: <Forgot /> },
    { path: "/resetar-senha/:token", element: <Reset /> },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);
}
