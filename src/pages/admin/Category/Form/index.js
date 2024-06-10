import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../../components/Input/TextInput";
import SelectInput from "../../../../components/Input/SelectInput";
import axiosClient from "../../../../axios-client";
import { useStateContext } from "../../../../context/ContextProvider";

function CategoryForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [parent, setParent] = useState(null);
  const [categoryOld, setCategoryOld] = useState(null);
  const { setNotification } = useStateContext();
  const [category, setCategory] = useState({
    id: null,
    title: "",
    slug: "",
    meta_title: "",
  });
  useEffect(() => {
    setLoading(true);
    if (id) {
      axiosClient
        .get(`/admin/category/show/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setParent(data.categories_parent);
          setCategory(data.category);
          setCategoryOld(data.category);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      axiosClient
        .get(`/admin/category/parent`)
        .then(({ data }) => {
          setLoading(false);
          setParent(data.data);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleReset = () => {
    console.log("reset");
    setCategory({
      id: null,
      title: "",
      slug: "",
      meta_title: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (category.id) {
      axiosClient
        .put(`/admin/category/update/${category.id}`, category)
        .then((data) => {
          navigate("/admin/category");
          setErrors(null);
          setNotification("");
          setNotification({
            type: "success",
            data: "Category was successfully updated",
          });
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/admin/category", category)
        .then((data) => {
          navigate("/admin/category");
          setErrors(null);
          setNotification({
            type: "success",
            data: "Category was successfully created",
          });
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      <div className="pagetitle">
        <h1>
          {!!category.id
            ? `UPDATE CATEGORY: ${categoryOld.title}`
            : "CREATE NEW CATEGORY"}
        </h1>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Biểu mẫu</h5>
            {errors && (
              <div style={{ color: "red" }}>
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            {!loading && (
              <form onSubmit={onSubmit}>
                <TextInput
                  label="Title"
                  value={category.title}
                  onChange={(value) =>
                    setCategory({ ...category, title: value })
                  }
                  placeholder="Title"
                  isRequired="true"
                />
                <SelectInput
                  label="Category parent"
                  id="floatingSelect"
                  options={parent}
                  defaultOption="Category parent ..."
                  onChange={(e) =>
                    setCategory({ ...category, parent_id: e.target.value })
                  }
                  value={category.parent_id}
                />
                <TextInput
                  label="Slug"
                  value={category.slug}
                  onChange={(value) =>
                    setCategory({ ...category, slug: value })
                  }
                  placeholder="Slug"
                  isRequired="true"
                />
                <TextInput
                  label="Title meta"
                  value={category.title}
                  onChange={(value) =>
                    setCategory({ ...category, meta_title: value })
                  }
                  placeholder="Title meta"
                />
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryForm;
