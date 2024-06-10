import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";

function LoginAdmin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    setErrors(null);
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/auth/login", payload)
      .then((data) => {
        setUser(data.data.user);
        setToken(data.data.token);
        setErrors(null);
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 422) {
          setErrors(response.data.errors);
        } else if (response.status === 500) {
          setErrors({ server: ["Server error"] });
        } else if (response.status === 401) {
          setErrors({ email: [response.data.error] });
        }
      });
  };

  return (
    <div>
      <div className="pt-4 pb-2">
        <h5 className="card-title text-center pb-0 fs-4">
          Login to Your Account
        </h5>
        <p className="text-center small">
          Enter your email & password to login
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
          <label htmlFor="youremail" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="text"
              name="email"
              ref={emailRef}
              className="form-control"
              id="youremail"
              required
              placeholder="email"
            />
            <div className="invalid-feedback">Please enter your email.</div>
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="yourPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="form-control"
            id="yourPassword"
            required
            placeholder="Password"
          />
          <div className="invalid-feedback">Please enter your password!</div>
        </div>

        {/* <div className="col-12">
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
        </div> */}
        <div className="col-12">
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </div>
        {/* <div className="col-12">
          <p className="small mb-0">
            Don't have account?{" "}
            <Link to="/admin/auth/register"> Create an account</Link>
          </p>
        </div> */}
      </form>
    </div>
  );
}

export default LoginAdmin;
