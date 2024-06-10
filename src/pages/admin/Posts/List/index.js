import TableHeader from "../../../../components/Table/TableHeader";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { Link } from "react-router-dom";
import SearchInput from "../../../../components/Input/SearchInput";
import PaginationComponent from "../../../../components/Pagination";
import Loading from "../../../../components/Loading";
import { useStateContext } from "../../../../context/ContextProvider";

function Post() {
  const [posts, setPosts] = useState({
    id: null,
    title: "",
    category_id: "",
    meta_title: "",
    slug: "",
    summary: "",
    content: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setNotification } = useStateContext();
  const headers = [
    { label: "STT", width: "10%" },
    { label: "Title", width: "30%" },
    { label: "Image", width: "20%" },
    { label: "Category", width: "20%" },
    { label: "Author", width: "20%" },
    { label: "Active", width: "20%" },
  ];
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = (page = currentPage, searchValue = null) => {
    let url = `/admin/post?page=${page}`;
    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setCurrentPage(data.posts.current_page);
        setPageCount(data.posts.last_page);
        setPosts(data.posts.data);
        setCategories(data.categories);
      })
      .catch((error) => {});
  };

  const handleGetCategoryName = (id) => {
    let category = categories.find((category) => category.id === id);
    return category ? category.title : "";
  };

  const onDeletePost = (id) => {
    if (window.confirm("Are you sure?")) {
      axiosClient
        .delete(`/admin/post/destroy/${id}`)
        .then(() => {
          getPosts();
          setNotification({
            type: "success",
            data: "Category was successfully deleted",
          });
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            setNotification({
              type: "info",
              data: response.data.message,
            });
          }
        });
    }
  };

  const handleImage = (image) => {
    console.log();
    return (
      <img
        src={`${process.env.REACT_APP_API_URL}/get-image/${image}`}
        alt="Image"
        width="100"
      />
    );
  };

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    getPosts(newPage);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setLoading(true);
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => getPosts(null, value), 1000);
    setSearchTimeout(timeout);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">List Posts</h5>
              <div className="datatable-top">
                <SearchInput handleSearch={handleSearch} />
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
                      {Array.isArray(posts) &&
                        posts.map((post) => (
                          <tr key={post.id}>
                            <th scope="row">{post.id}</th>
                            <td>{post.title}</td>
                            <td style={{}}>
                              <div
                                style={{
                                  width: "auto",
                                  height: "100px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {handleImage(post.image)}
                              </div>
                            </td>
                            <td>
                              {post.category_id && (
                                <span className="badge bg-secondary">
                                  {handleGetCategoryName(post.category_id)}
                                </span>
                              )}
                            </td>
                            <td>{post.author.name}</td>
                            <td>
                              <Link
                                to={`/admin/posts/${post.id}`}
                                className="btn btn-outline-secondary"
                              >
                                Edit
                              </Link>
                              &nbsp;
                              <button
                                onClick={(ev) => onDeletePost(post.id)}
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

export default Post;
