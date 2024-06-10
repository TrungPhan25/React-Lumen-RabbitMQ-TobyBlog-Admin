import { Link } from "react-router-dom";
import NavItem from "./NavigationItem";
import { useStateContext } from "../../../../context/ContextProvider";

function Sidebar() {
  const { user } = useStateContext();
  const isUser = user.role == process.env.REACT_APP_USER_ROLE;

  const postsLinks = [
    { to: "/admin/posts", label: "List" },
    { to: "/admin/posts/create", label: "Create" },
  ];

  const postsAdditionalLinks = isUser
    ? []
    : [{ to: "/admin/public-posts", label: "Public" }];

  const postsFinalLinks = [...postsLinks, ...postsAdditionalLinks];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Category */}
        {!isUser && (
          <NavItem
            name="category"
            title="Category"
            icon="bi bi-pencil-square"
            links={[
              { to: "/admin/category", label: "List" },
              { to: "/admin/category/create", label: "Create" },
            ]}
          />
        )}
        {/* Post */}
        <NavItem
          name="post"
          title="Post"
          icon="bi bi-file-earmark-medical-fill"
          links={postsFinalLinks}
        />

        {/* User */}
        {!isUser && (
          <NavItem
            name="user"
            title="User"
            icon="bi bi-people-fill"
            links={[
              { to: "/admin/users", label: "List" },
              { to: "/admin/users/create", label: "Create" },
            ]}
          />
        )}
        {!isUser && (
          <NavItem
            name="contact"
            title="Contact"
            icon="bi bi-envelope"
            links={[{ to: "/admin/contacts", label: "List" }]}
          />
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
