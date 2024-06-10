import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axiosClient from "../../../axios-client";
import { showNotification } from "../../../components/Notification";
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "../../../components/Breadcrumbs";
import "react-toastify/dist/ReactToastify.css";

function DefaultLayout() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { user, token, notification, setUser, setToken } = useStateContext();

  useEffect(() => {
    if (token) {
      axiosClient
        .get("admin/user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (notification) {
      showNotification(notification.type, notification.data);
    }
  }, [notification]);

  if (!token) {
    return <Navigate to="/admin/auth/login" />;
  }

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div className={toggleSidebar ? "toggle-sidebar" : ""}>
      <Header toogle={handleToggleSidebar} />
      <Sidebar />
      <main id="main" className="main">
        <ToastContainer />
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
