import { useState } from "react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const breadcrumbs = {
  // Page Create User
  "/admin/users/create": [
    { label: "Trang chủ", link: "/admim" },
    { label: "Người dùng", link: "/admin/users" },
    { label: "Tạo mới", link: "", active: true },
  ],
  // Page Edit User
  "/admin/users/:id": [
    { label: "Trang chủ", link: "/admim" },
    { label: "Người dùng", link: "/admin/users" },
    { label: "Chỉnh sửa", active: true },
  ],
  // Page List User
  "/admin/users": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Người dùng", link: "/admin/users", active: true },
  ],
  // Page Create Category
  "/admin/category/create": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Danh mục", link: "/admin/category" },
    { label: "Tạo mới", link: "/admin/category/create", active: true },
  ],
  // Page Edit Category
  "/admin/category/:id": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Danh mục", link: "/admin/category" },
    { label: "Chỉnh sửa", link: "", active: true },
  ],
  // Page List Category
  "/admin/category": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Danh mục", link: "/admin/category", active: true },
  ],
  // Page Create Post
  "/admin/posts/create": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Bài viết", link: "/admin/posts" },
    { label: "Tạo mới", link: "", active: true },
  ],
  // Page Edit Post
  "/admin/posts/:id": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Bài viết", link: "/admin/posts" },
    { label: "Chỉnh sửa", link: "", active: true },
  ],
  // Page List Post
  "/admin/posts": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Bài viết", link: "/admin/posts", active: true },
  ],
  // Page Create Public Post
  "/admin/public-posts": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Bài viết", link: "/admin/posts", active: true },
  ],
   // Page Contact
   "/admin/contacts": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Liên hệ", link: "/admin/contacts", active: true },
  ],
  "/admin/contacts/:id": [
    { label: "Trang chủ", link: "/admin" },
    { label: "Liên hệ", link: "/admin/contacts"},
    { label: "Phản hồi", link: "/admin/contacts", active: true },
  ],
};

function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname;
  let baseUrl = path;

  // Handle path with id
  const hasId = /\d+$/.test(path);
  if (hasId) {
    const newbaseUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/"));
    baseUrl = newbaseUrl + "/:id";
  }

  const breadcrumbsList = !breadcrumbs[baseUrl] ? [] : breadcrumbs[baseUrl];

  return (
    <nav>
      <ol className="breadcrumb">
        {breadcrumbsList.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${item.active ? "active" : ""}`}
          >
            {item.active ? (
              <span>{item.label}</span>
            ) : (
              <Link to={item.link}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
