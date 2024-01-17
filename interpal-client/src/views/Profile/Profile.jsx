import React from "react";
import "./Profile.css";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
const Profile = () => {
  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };
  const [darkMode] = useOutletContext();
  console.log(darkMode);
  return (
    <div className="profile-container">
      <div
        className="header p-5 pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={headerStyle}
      >
        <span className="mask bg-gradient-default opacity-8"></span>
        <div className="container-fluid  d-flex align-items-center">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              {/* <h1 className="display-2 text-white">Hello Jesse</h1>
            <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            <Link to="#!" className="btn btn-info">Edit profile</Link>  */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${darkMode === true ? " " : ""} p-3  border-radius mt--7  `}
      >
        <div
          className={`${
            darkMode === true ? "dark-profile " : ""
          } profile-card card-profile shadow border-radius`}
        >
          <div className="row justify-content-center">
            <div className="col-lg-3 order-lg-2">
              <div className="card-profile-image">
                <Link to="#">
                  <img
                    src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                    className="rounded-circle"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className=" text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div class=" text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <Link to="#" class="btn btn-info mr-4">Connect</Link>
                                <Link to="#" class="btn btn-default float-right">Message</Link>
                            </div>
                        </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                <div>
                                            <span class="heading">22</span>
                                            <span class="description">Friends</span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">Photos</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comments</span>
                                        </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3>
                Jessica Jones<span className="font-weight-light">, 27</span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2"></i>Bucharest, Romania
              </div>
              <div className="h5 mt-4">
                <i className="ni business_briefcase-24 mr-2"></i>Solution
                Manager - Creative Tim Officer
              </div>
              <div>
                <i className="ni education_hat mr-2"></i>University of Computer
                Science
              </div>
              <hr className="my-4" />
              <p>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                Murphy — writes, performs and records all of his own music.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
