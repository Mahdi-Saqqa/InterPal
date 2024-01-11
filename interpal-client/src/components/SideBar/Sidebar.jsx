import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./SideBar.css"; // Add your styles here

const Sidebar = (props) => {
    const user = props.user;
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    const sidebarCloseBtn = document.querySelector("#sidebar-close");
    const sidebarLockBtn = document.querySelector("#lock-icon");

    // Function to toggle the lock state of the sidebar
    const toggleLock = () => {
      sidebar.classList.toggle("locked");
      // If the sidebar is not locked
      if (!sidebar.classList.contains("locked")) {
        sidebar.classList.add("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
      } else {
        sidebar.classList.remove("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
      }
    };

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
    const toggleSidebar = () => {
      sidebar.classList.toggle("close");
    };

    // If the window width is less than 800px, close the sidebar and remove hoverability and lock
    if (window.innerWidth < 800) {
      sidebar.classList.add("close");
      sidebar.classList.remove("locked");
      sidebar.classList.remove("hoverable");
    }

    // Adding event listeners to buttons and sidebar for the corresponding actions
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebar.addEventListener("mouseleave", hideSidebar);
    sidebar.addEventListener("mouseenter", showSidebar);


    // Cleanup event listeners when the component unmounts
    return () => {
      sidebarLockBtn.removeEventListener("click", toggleLock);
      sidebar.removeEventListener("mouseleave", hideSidebar);
      sidebar.removeEventListener("mouseenter", showSidebar);
    //   sidebarOpenBtn.removeEventListener("click", toggleSidebar);
      sidebarCloseBtn.removeEventListener("click", toggleSidebar);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    // Assuming 'sidebar' is a class name for the sidebar element
    document.querySelector(".sidebar").classList.toggle("dark");
    // Assuming 'dark-1' is a class name for the dark mode button
    document.getElementById("dark-mode-toggle").classList.toggle("dark-1");
  };

  return (
    <nav className="sidebar locked">
      <div className="logo_items flex">
        <span className="nav_image">
          <img
            src="https://ik.imagekit.io/shadid/34014211_8063740.jpg?updatedAt=1694428340416"
            alt="logo_img"
          />
        </span>
        <span className="logo_name">Tandem</span>
        <i className="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
        <i className="bx bx-x" id="sidebar-close"></i>
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
              <Link to="#" className="link flex">
                <i className="bx bx-home-alt"></i>
                <span>Overview</span>
              </Link>
            </li>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-grid-alt"></i>
                <span>All Projects</span>
              </Link>
            </li>
          </ul>

          {/* Editor */}
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Editor</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bxs-magic-wand"></i>
                <span>Magic Build</span>
              </Link>
            </li>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-folder"></i>
                <span>New Projects</span>
              </Link>
            </li>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-cloud-upload"></i>
                <span>Upload New</span>
              </Link>
            </li>
          </ul>

          {/* Settings */}
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Setting</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-flag"></i>
                <span>Notice Board</span>
              </Link>
            </li>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-award"></i>
                <span>Award</span>
              </Link>
            </li>
            <li className="item">
              <Link to="#" className="link flex">
                <i className="bx bx-cog"></i>
                <span>Setting</span>
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
        <div className="sidebar_profile flex">
          <span className="nav_image">
            <img src={require(`../../uploads/${user.profilePic.details.filename}`)} alt="logo_img" />
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
