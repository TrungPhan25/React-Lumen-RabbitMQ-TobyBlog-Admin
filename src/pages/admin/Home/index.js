import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function Admin() {
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    getData("day");
  }, []);

  const getData = (type) => {
    axiosClient.get(`/admin/dashboard?type=${type}`).then(({ data }) => {
      setViews(data.views);
      setComments(data.comments);
    });
  };

  const handleDay = () => {
    getData("day");
  };

  const handleMonth = () => {
    getData("month");
  };

  const handleYear = () => {
    getData("year");
  };

  return (
    <div className="row">
      <div className="card-body">
        <h5 className="card-title">Dashboard</h5>

        <ul
          className="nav nav-tabs nav-tabs-bordered"
          id="borderedTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              onClick={handleDay}
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#bordered-home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Today
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={handleMonth}
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#bordered-profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              tabIndex="-1"
            >
              This Month
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={handleYear}
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#bordered-contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              tabIndex="-1"
            >
              This Year
            </button>
          </li>
        </ul>
        <div className="tab-content pt-2" id="borderedTabContent">
          <div
            className="tab-pane fade active show"
            id="bordered-home"
            role="tabpanel"
            aria-labelledby="home-tab"
          ></div>
          <div
            className="tab-pane fade"
            id="bordered-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          ></div>
          <div
            className="tab-pane fade"
            id="bordered-contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          ></div>
        </div>
      </div>
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Views <span>| Total</span>
            </h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-eye"></i>
              </div>
              <div className="ps-3">
                <span className="text-success small pt-1 fw-bold">{views}</span>{" "}
                <span className="text-muted small pt-2 ps-1">views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">
          <div className="card-body">
            <h5 className="card-title">
              Comments <span>| Total</span>
            </h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="bi bi-chat-right-dots"></i>
              </div>
              <div className="ps-3">
                <span className="text-success small pt-1 fw-bold">
                  {comments}
                </span>{" "}
                <span className="text-muted small pt-2 ps-1">comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
