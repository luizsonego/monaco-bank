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
import { useState } from "react";
import GifComponent from "../components/GifComponent";
import ChangePass from "../pages/Profile/ChangePass";
import AdminEditProfile from "../pages/Admin/upadate/editProfile";
import AdminEditAddress from "../pages/Admin/upadate/editAddress";
import AdminEditBank from "../pages/Admin/upadate/editBank";
import Lancamentos from "../pages/Admin/Lancamentos";
import Lancamento from "../pages/Admin/Lancamento";
import Transfer from "../pages/Admin/Transfer";
import Complete from "../pages/Complete";
import ListNewProfiles from "../pages/Admin/ListNewProfiles";
import ListDeletedProfiles from "../pages/Admin/ListDeletedProfiles";
import UserTransfer from "../pages/Transfer";
import Confirm from "../pages/Transfer/confirm";
import Print from "../pages/Print";
import RequestMovimentation from "../pages/Admin/RequestMovimentation";
import ListExtract from "../pages/Print/List";
import SendDoc from "../pages/Admin/SendDoc";
import Doc from "../pages/Profile/Doc";

export default function MainRoutes() {
  const [gifEnded, setGifEnded] = useState(false);

  const { data } = useRoleGet();

  const handleGifEnd = () => {
    setGifEnded(true);
  };

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
        { path: "investiment/list-extract", element: <ListExtract /> },
        { path: "/print", element: <Print /> },
        {
          path: "/profile",
          children: [
            { path: "", element: <ProfileIndex /> },
            { path: "edit-profile", element: <EditProfile /> },
            { path: "edit-address", element: <EditAddress /> },
            { path: "edit-bank", element: <EditBank /> },
            { path: "alterar-senha", element: <ChangePass /> },
            { path: "documentos", element: <Doc /> },
          ],
        },
        {
          path: "/user-transfer",
          children: [
            { path: "", element: <UserTransfer /> },
            { path: "confirm-transfer/:transfer", element: <Confirm /> },
          ],
        },
        // { path: "/user-transfer", element: <UserTransfer /> },

        data === 99 && {
          path: "/admin",
          children: [
            { path: "", element: <AdminIndex /> },
            { path: "users", element: <h1>Users</h1> },
            { path: "create-user", element: <CreateUser /> },
            { path: "list-users", element: <ListProfiles /> },
            { path: "list-new-users", element: <ListNewProfiles /> },
            { path: "list-deleted-users", element: <ListDeletedProfiles /> },
            { path: "description/:id", element: <Description /> },
            { path: "aporte/:id", element: <Apport /> },
            { path: "saque/:id", element: <Withdraw /> },
            { path: "edit-profile/:id", element: <AdminEditProfile /> },
            { path: "edit-address/:id", element: <AdminEditAddress /> },
            { path: "edit-bank/:id", element: <AdminEditBank /> },
            { path: "lancamentos/:id", element: <Lancamentos /> },
            { path: "lancamento/:transactionid", element: <Lancamento /> },
            { path: "transfer/:id", element: <Transfer /> },
            { path: "enviar-documento", element: <SendDoc /> },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: !gifEnded ? (
        <GifComponent onGifEnd={handleGifEnd} />
      ) : (
        <SignIn />
      ),
    },
    // { path: "/login", element: <GifComponent onGifEnd={handleGifEnd} /> },
    // { path: "/login", element: <SignIn /> },
    { path: "/recuperar-senha", element: <Forgot /> },
    { path: "/resetar-senha/:token", element: <Reset /> },
    { path: "register", element: <Complete /> },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);
}
