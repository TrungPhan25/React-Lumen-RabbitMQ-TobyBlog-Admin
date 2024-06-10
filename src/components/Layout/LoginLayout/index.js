import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";

function LoginLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4"></div>

              <div className="card mb-3">
                <div className="card-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginLayout;
