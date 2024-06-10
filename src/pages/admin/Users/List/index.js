import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../context/ContextProvider";
import PaginationComponent from "../../../../components/Pagination";
import Loading from "../../../../components/Loading";
import SearchInput from "../../../../components/Input/SearchInput";
import TableHeader from "../../../../components/Table/TableHeader";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const navigate = useNavigate();
  const headers = [
    { label: "#ID", width: "10%" },
    { label: "Name" },
    { label: "Email", width: "30%" },
    { label: "Create Date", width: "20%" },
    { label: "Active", width: "20%" },
  ];

  useEffect(() => {
    getUsers(currentPage);
  }, []);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    getUsers(newPage);
  };

  const getUsers = (page = currentPage, searchValue = null) => {
    let url = `/admin/users?page=${page}`;
    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setPageCount(data.meta.last_page);
        setCurrentPage(data.meta.current_page);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/admin");
      });
  };

  const handleSearch = (value) => {
    setSearch(value);
    setLoading(true);
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => getUsers(null, value), 1000);
    setSearchTimeout(timeout);
  };

  const onDeleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      axiosClient
        .delete(`/admin/users/destroy/${id}`)
        .then(() => {
          getUsers();
          setNotification({
            type: "success",
            data: "User was successfully deleted",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">List User</h5>

            <div className="datatable-top">
              {/* Seach box */}
              <SearchInput handleSearch={handleSearch} />
              {/* Pagination  */}
              <div style={{ justifyContent: "right", alignItems: "center" }}>
                <PaginationComponent
                  pageCount={pageCount}
                  currentPage={currentPage - 1}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>

            <table className="table table-striped">
              <TableHeader headers={headers} />
              {/* Loading */}
              {loading && <Loading length={headers.length} />}

              {/* Data */}
              {!loading && (
                <>
                  <tbody>
                    {Array.isArray(users) &&
                      users.map((user) => (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td>
                            <Link
                              to={`/admin/users/${user.id}`}
                              className="btn btn-outline-secondary"
                            >
                              Edit
                            </Link>
                            &nbsp;
                            <button
                              onClick={(ev) => onDeleteUser(user.id)}
                              className="btn btn-outline-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
