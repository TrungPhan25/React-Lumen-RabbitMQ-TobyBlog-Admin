import React, { useState, useEffect } from "react";
import TableHeader from "../../../components/Table/TableHeader";
import axiosClient from "../../../axios-client";
import Loading from "../../../components/Loading";
import { useStateContext } from "../../../context/ContextProvider";

function PublicPost() {
  const [loading, setLoading] = useState(true);
  const { setNotification } = useStateContext();
  const headers = [
    { label: "STT", width: "10%" },
    { label: "Title", width: "30%" },
    { label: "Active", width: "20%" },
  ];
  const [posts, setPosts] = useState({
    id: null,
    title: "",
    published: "",
  });

  useEffect(() => {
    getPublicPosts();
  }, []);

  const getPublicPosts = () => {
    axiosClient
      .get("/admin/public-post")
      .then(({ data }) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxPublic = (id) => {
    if (window.confirm("Are you sure?")) {
      setPosts(
        posts.map((item) =>
          item.id === id ? { ...item, published: item.published ? 0 : 1 } : item
        )
      );
      axiosClient
        .post(`/admin/public-post/update/${id}`)
        .then((data) => {
          if (data.data.data.published === true) {
            setNotification({
              type: "success",
              data: "The post has been published",
            });
          } else {
            setNotification({
              type: "info",
              data: "The post has been discontinued",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <table className="table table-striped">
                <TableHeader headers={headers} />
                {loading && <Loading length={headers.length} />}
                {!loading && (
                  <>
                    <tbody>
                      {Array.isArray(posts) &&
                        posts.map((post) => (
                          <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={post.published}
                                onChange={() => handleCheckboxPublic(post.id)}
                              ></input>
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

export default PublicPost;
