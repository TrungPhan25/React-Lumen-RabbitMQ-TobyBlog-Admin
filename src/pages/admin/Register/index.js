import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";

function AdminRegister() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/auth/signup", payload)
      .then((data) => {
        setUser(data.data.user);
        setToken(data.data.token);
        setErrors(null);
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="container">
      <div className="pt-4 pb-2">
        <h5 className="card-title text-center pb-0 fs-4">
          Register to Your Account
        </h5>
        <p className="text-center small">
          Enter your personal details to create account
        </p>
      </div>

      <form className="row g-3 needs-validation" onSubmit={onSubmit}>
        {errors && (
          <div style={{ color: "red" }}>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        <div className="col-12">
          <label htmlFor="yourName" className="form-label">
            Username
          </label>
          <input
            ref={nameRef}
            type="name"
            name="name"
            className="form-control"
            id="yourName"
            required
            placeholder="Username"
          />
        </div>

        <div className="col-12">
          <label htmlFor="yourUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              ref={emailRef}
              type="text"
              name="email"
              className="form-control"
              id="yourEmail"
              required
              placeholder="Email"
            />
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="yourPassword" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            autoComplete="on"
            className="form-control"
            id="yourPassword"
            required
            placeholder="Password"
          />
        </div>

        <div className="col-12">
          <label htmlFor="yourPassword" className="form-label">
            Password Confirmation
          </label>
          <input
            ref={passwordConfirmationRef}
            type="password"
            name="passwordConfirmation"
            autoComplete="on"
            className="form-control"
            id="yourPasswordConfirm"
            required
            placeholder="PasswordConfirm"
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
              value="true"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </div>
        <div className="col-12">
          <p className="small mb-0">
            Already have an account <Link to="/admin/auth/login">Log in</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default AdminRegister;
