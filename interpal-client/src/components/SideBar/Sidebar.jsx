import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import "./SideBar.css"; // Add your styles here
import { Popper } from "@mui/base/Popper";

const Sidebar = (props) => {
  const temp = [1,2,3,4,5,6]
  const user = props.user;
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = props; // Default dark mode to false
  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
      document.querySelector(".sidebar-1").classList.add("dark");
      document.getElementById("dark-mode-toggle").classList.add("dark-1");
    }

    let sidebar = document.querySelector(".sidebar-1");

    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
      if (window.innerWidth < 800) {
        sidebar.classList.add("close");
        sidebar.classList.remove("locked");
        sidebar.classList.remove("hoverable");
      } else {
        sidebar.classList.remove("close");
        sidebar.classList.add("locked");
        sidebar.classList.add("hoverable");
      }
    };

    window.addEventListener("resize", handleWindowResize);

    // Function to hide the sidebar when the mouse leaves
    const hideSidebar = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    };

    // Function to show the sidebar when the mouse enters
    const showSidebar = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    };

    // Function to show and hide the sidebar

    // If the window width is less than 800px, close the sidebar and remove hoverability and lock
    if (window.innerWidth < 800) {
      sidebar.classList.add("close");
      sidebar.classList.remove("locked");
    } else {
      sidebar.classList.add("locked");
    }

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);

      //   sidebarOpenBtn.removeEventListener("click", toggleSidebar);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  // Function to toggle dark mode
  const toggleDarkMode = (props) => {
    let dark = localStorage.getItem("dark");
    if (dark === "true") {
      setDarkMode(false);
      localStorage.setItem("dark", "false");
      document.body.classList.remove("dark");
      document.querySelector(".sidebar-1").classList.remove("dark");
      document.getElementById("dark-mode-toggle").classList.remove("dark-1");
    } else {
      setDarkMode(true);
      localStorage.setItem("dark", "true");
      document.body.classList.add("dark");
      document.querySelector(".sidebar-1").classList.add("dark");
      document.getElementById("dark-mode-toggle").classList.add("dark-1");
    }
  };
  const [newNotification, setNewNotification] = useState(true);
  const anchorEl = useRef(null);
  const [notstatus, setNotstatus] = useState(false);

  return (
    <nav className="sidebar-1 locked">
      <div className="logo_items flex">
        <span className="nav_image">
          <img
            src="https://ik.imagekit.io/shadid/34014211_8063740.jpg?updatedAt=1694428340416"
            alt="logo_img"
          />
        </span>
        <Link to="#" className="logo_name ">
          <span className="logo_name">InterPal</span>
        </Link>
        {/* <i className="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
        <i className="bx bx-x" id="sidebar-close"></i> */}
      </div>

      <div className="menu_container">
        <div className="menu_items">
          {/* Dashboard */}
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Dashboard</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <Link to="/app" className="link flex">
                <i className="bx bx-home-alt"></i>
                <span>Home</span>
              </Link>
            </li>

            <li className="item">
              <Link to="/app/discover" className="link flex">
                <i className="bx bx-grid-alt"></i>
                <span>Discover</span>
              </Link>
            </li>
            <li className="item">
              <Link to="/app/chat" className="link flex">
                <i class="bx bx-chat"></i>
                <span>Chat</span>
              </Link>
            </li>
            <li className="item">
              <Link
                onClick={() => {
                  setNewNotification(false);
                  setNotstatus(!notstatus);
                }}
                className="link flex"
                ref={anchorEl}
                style={newNotification ? { background: "#4e97c8" } : {}}
              >
                {newNotification ? (
                  <i
                    class="bx bxs-bell-ring bx-rotate-90 bx-tada"
                    style={{ color: "#ffec36" }}
                  ></i>
                ) : (
                  <i className="bx bx-bell"></i>
                )}
                <span>Notifications</span>
                {newNotification ? (
                  <span className="mx-5 p-2 badge rounded-pill bg-danger">
                    99
                  </span>
                ) : null}
              </Link>
            </li>
            <Popper
              id="placement-popper"
              open={notstatus}
              anchorEl={anchorEl.current}
              placement={"right"}
            >
              <div
                className="m-3 notification"
                style={{
                  border: "1px solid",
                  borderColor: "rgba(0,0,0,0.2)",
                  margin: "0.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.1)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  zIndex: 100000,
                  position: "relative",
                }}
              >
                {
                  temp.map((item) => {
                    return(
                      <span className="d-flex justify-content-center py-3 border-bottom border-top">
                    <div>
                      <div class=" col-12 d-flex mx-auto  align-items-center">
                        <div className="col-1">
                          <img
                            className="avatar-md "
                            src={require(`../../uploads/${user.profilePic.details.filename}`)}
                            alt="avatar"
                          />
                        </div>
  
                        <span className="mx-3 col-6">
                          Janette has sent you friend request on Swipe.
                        </span>
                        <div className="col-5">
                          <button className="btn btn-primary col-5 ">Add</button>
                          <button className="btn btn-danger  col-5">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </span>
                    )
                  })
                }


                
              </div>
            </Popper>
          </ul>

          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Setting</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-cog"></i>
                <span>Setting</span>
              </Link>
            </li>
            <li className="item">
              <Link to="/logout" className="link flex">
                <i class="bx bx-log-out"></i>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          className="dark-mode-toggle"
          id="dark-mode-toggle"
          onClick={toggleDarkMode}
        >
          Dark Mode
        </button>

        {/* Sidebar Profile */}
        <div
          className="sidebar_profile flex"
          onClick={() => navigate("./profile/" + user._id)}
        >
          <span className="nav_image">
            <img
              src={require(`../../uploads/${user.profilePic.details.filename}`)}
              alt="logo_img"
            />
          </span>
          <div className="data_text">
            <span className="name">{`${user.Fname} ${user.Lname}`}</span>
            <span className="email">{`${user.Email}`}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
