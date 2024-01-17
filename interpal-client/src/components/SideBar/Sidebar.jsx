import React, { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import "./SideBar.css"; // Add your styles here

const Sidebar = (props) => {
  const user = props.user;
  const navigate = useNavigate();
  const {darkMode, setDarkMode} = props // Default dark mode to false
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
  ]);
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

    window.addEventListener('resize', handleWindowResize);

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
    }
    else {
      sidebar.classList.add("locked");
    }


    // Cleanup event listeners when the component unmounts
    return () => {

      window.removeEventListener('resize', handleWindowResize);

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
              <i class='bx bx-chat'></i>
                <span>Chat</span>
              </Link>
            </li>
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
        <div className="sidebar_profile flex" onClick={()=>navigate('./profile')}>
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
