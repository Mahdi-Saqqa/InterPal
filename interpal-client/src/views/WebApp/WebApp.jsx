import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import "./WebApp.css";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WebApp = () => {
  const [loaded, setLoaded] = React.useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (localStorage.getItem("token")) {
              
      setLoaded(true);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      {loaded ? (
              <div className="userList">
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
            </div>)
            : (<></>
              )}
    </div>
  );
};

export default WebApp;
