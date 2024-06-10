import React from "react";
import { useStateContext } from "../../../../context/ContextProvider";
import axiosClient from "../../../../axios-client";
import { Link } from "react-router-dom";

function Header({ toogle }) {
  const { user, token, setUser, setToken } = useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/admin/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">Blog-Toby</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toogle}></i>
      </div>

      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user.name}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.name}</h6>
                <span> {user.name} </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  to={`/admin/users/${user.id}`}
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  onClick={onLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
