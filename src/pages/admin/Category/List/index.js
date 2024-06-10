import TableHeader from "../../../../components/Table/TableHeader";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { Link } from "react-router-dom";
import SearchInput from "../../../../components/Input/SearchInput";
import PaginationComponent from "../../../../components/Pagination";
import Loading from "../../../../components/Loading";
import { useStateContext } from "../../../../context/ContextProvider";

function ListCategory() {
  const [categories, setCategories] = useState([]);
  const [categoriesParent, setCategoriesParent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setNotification } = useStateContext();
  const headers = [
    { label: "STT", width: "10%" },
    { label: "Title", width: "20%" },
    { label: "level", width: "10%" },
    { label: "Category parent", width: "20%" },
    { label: "Slug", width: "20%" },
    { label: "Active", width: "20%" },
  ];

  useEffect(() => {
    getCategories(currentPage);
  }, []);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    getCategories(newPage);
  };

  const getCategories = (page = currentPage, searchValue = null) => {
    let url = `/admin/category?page=${page}`;
    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setCategories(data.categories);
        setCategoriesParent(data.categories_parent);
        setPageCount(data.pagination.last_page);
        setCurrentPage(data.pagination.current_page);
      })
      .catch((error) => {});
  };

  const onDeleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      axiosClient
        .delete(`/admin/category/destroy/${id}`)
        .then(() => {
          getCategories();
          setNotification({
            type: "success",
            data: "Category was successfully deleted",
          });
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            setNotification({
              type: "warning",
              data: response.data.message,
            });
          }
        });
    }
  };

  const handleGetCategoryParentName = (id) => {
    let category = categoriesParent.find((category) => category.id === id);
    return category ? category.title : "";
  };

  const handleSearch = (value) => {
    setSearch(value);
    setLoading(true);
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => getCategories(null, value), 1000);
    setSearchTimeout(timeout);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">List Categories</h5>
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
                {loading && <Loading length={headers.length} />}
                {!loading && (
                  <>
                    <tbody>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <tr key={category.id}>
                            <th scope="row">{category.id}</th>
                            <td>{category.title}</td>
                            <td>
                              {!category.parent_id && (
                                <i className="bi bi-check"></i>
                              )}
                            </td>
                            <td>
                              {category.parent_id && (
                                <span className="badge bg-secondary">
                                  <i className="bi bi-info-circle me-1"></i>
                                  {handleGetCategoryParentName(
                                    category.parent_id
                                  )}
                                </span>
                              )}
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">
                                <i className="bi bi-info-circle me-1"></i>
                                {category.slug}
                              </span>
                            </td>
                            <td>
                              <Link
                                to={`/admin/category/${category.id}`}
                                className="btn btn-outline-secondary"
                              >
                                Edit
                              </Link>
                              &nbsp;
                              <button
                                onClick={(ev) => onDeleteCategory(category.id)}
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
    </>
  );
}

export default ListCategory;
