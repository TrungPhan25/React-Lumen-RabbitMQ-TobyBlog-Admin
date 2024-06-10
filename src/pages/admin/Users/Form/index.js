import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import { useStateContext } from "../../../../context/ContextProvider";
import TextInput from "../../../../components/Input/TextInput";
import ImageInput from "../../../../components/Input/ImageInput";
import TextareaInput from "../../../../components/Input/Textarea";
import SelectInput from "../../../../components/Input/SelectInput";

function UserForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [userOld, setUserOld] = useState(null);
  const { setNotification } = useStateContext();
  const [isRequired, setIsRequired] = useState(true);
  const [isRequiredPassword, setIsRequiredPassword] = useState(true);
  const [imageBefore, setImageBefore] = useState([]);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: "",
    link_facebook: "",
    link_instagram: "",
    link_x: "",
    info: "",
    role: "",
  });

  useEffect(() => {
    if (id) {
      setIsRequiredPassword(false);
      setLoading(true);
      axiosClient
        .get(`/admin/users/show/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.user);
          setUserOld(data.user);
          setImageBefore(data.image);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.id) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      if (user.password) {
        formData.append("password", user.password);
        formData.append("password_confirmation", user.password_confirmation);
      }
      formData.append("link_facebook", user.link_facebook);
      formData.append("link_instagram", user.link_instagram);
      formData.append("link_x", user.link_x);
      formData.append("info", user.info);
      formData.append("role", user.role);
      if (user.image) {
        formData.append("image", user.image);
      }
      axiosClient
        .post(`/admin/users/update/${user.id}`, formData)
        .then((data) => {
          navigate("/admin/users");
          setErrors(null);
          setNotification("");
          setNotification({
            type: "success",
            data: "User was successfully updated",
          });
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("password_confirmation", user.password_confirmation);
      formData.append("link_facebook", user.link_facebook);
      formData.append("link_instagram", user.link_instagram);
      formData.append("link_x", user.link_x);
      formData.append("info", user.info);
      formData.append("role", user.role);
      if (user.image) {
        formData.append("image", user.image);
      }
      axiosClient
        .post("/admin/users", formData)
        .then((data) => {
          navigate("/admin/users");
          setErrors(null);
          setNotification("");
          setNotification({
            type: "success",
            data: "User was successfully created",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, image: file });
  };

  const roleList = [
    { id: 1, value: 1, title: "Admin" },
    { id: 3, value: 3, title: "User" },
  ];

  return (
    <>
      <div className="pagetitle">
        <h1>{!!user.id ? `CẬP NHẬT USER: ${userOld.name}` : "TẠO MỚI USER"}</h1>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Biểu mẫu</h5>
            {loading && <p>Loading...</p>}
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
                  label="Name"
                  value={user.name}
                  onChange={(value) => setUser({ ...user, name: value })}
                  placeholder="Name"
                  isRequired={isRequired}
                />
                <TextInput
                  label="Email"
                  value={user.email}
                  onChange={(value) => setUser({ ...user, email: value })}
                  placeholder="Email"
                  isRequired={isRequired}
                />
                <TextInput
                  label="Password"
                  value={user.password}
                  onChange={(value) => setUser({ ...user, password: value })}
                  placeholder="Password"
                  type="password"
                  isRequired={isRequiredPassword}
                />
                <TextInput
                  label="Confirm Password"
                  value={user.password_confirmation}
                  onChange={(value) =>
                    setUser({ ...user, password_confirmation: value })
                  }
                  placeholder="Password Confirmation"
                  type="password"
                  isRequired={isRequiredPassword}
                />
                <ImageInput
                  handleImageChange={handleImageChange}
                  imageBefore={imageBefore}
                  label="Avatar"
                />
                <TextInput
                  label="Link Facebook"
                  value={user.link_facebook}
                  onChange={(value) =>
                    setUser({ ...user, link_facebook: value })
                  }
                  placeholder="Facebook"
                />
                <TextInput
                  label="Link Instagram"
                  value={user.link_instagram}
                  onChange={(value) =>
                    setUser({ ...user, link_instagram: value })
                  }
                  placeholder="Instagram"
                />
                <TextInput
                  label="Link X"
                  value={user.link_x}
                  onChange={(value) => setUser({ ...user, link_x: value })}
                  placeholder="X"
                />
                <TextareaInput
                  label="Summary"
                  value={user.info}
                  onChange={(value) => setUser({ ...user, info: value })}
                  placeholder="Summary"
                />
                <SelectInput
                  label="Authorization"
                  id="floatingSelect"
                  options={roleList}
                  defaultOption="Chọn quyền ..."
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  value={user.role}
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

export default UserForm;
