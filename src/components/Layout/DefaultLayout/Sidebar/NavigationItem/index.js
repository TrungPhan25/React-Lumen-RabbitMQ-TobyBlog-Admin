import React from "react";
import { Link } from "react-router-dom";

function NavItem({ name, title, links, icon }) {
  return (
    <li className="nav-item">
      <div
        className="nav-link collapsed"
        data-bs-target={`#${name}-nav`}
        data-bs-toggle="collapse"
        href="#"
      >
        <i className={icon}></i>
        <span>{title}</span>
        <i className="bi bi-chevron-down ms-auto"></i>
      </div>
      <ul
        id={`${name}-nav`}
        className="nav-content collapse"
        data-bs-parent="#sidebar-nav"
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>
              <i className="bi bi-circle"></i>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default NavItem;
