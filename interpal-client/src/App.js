import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Main from "./views/Main/Main";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import WebApp from "./views/WebApp/WebApp";
import EmailVerify from "./views/EmailVerify";
import LogOut from "./views/LogOut";
import CompleteProfile from "./views/CompleteProfile/CompleteProfile";
import Discover from "./views/Discover/Discover";
import Chat from "./views/Chat/Chat";
import ChatContainer from "./views/Chat/ChatContainer";
import './bootstrap.min.css';
import Profile from "./views/Profile/Profile";

const App = () => {

  const [user, setUser] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const loggedIn = localStorage.getItem("token") !== null;
  

  const renderSelectedPage = (elem) => {
    if (user === null) {
      return <LoginPage />;
    } else if (user.activated === false) {
      return <EmailVerify />;
    }
    else if (user.completed === false) {
      return <CompleteProfile />;
    }
    else {
      return elem;
    }
  };
  React.useEffect(() => {
    axios
      .post("http://localhost:8000/api/users/loggedin", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("id", res.data.user._id);
        setLoaded(true);
      })
      .catch((err) => {
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      {!loaded ? (
        <div
          className="Loader"
        >
          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="activate" element={<EmailVerify />} />
          <Route
            path="completeprofile"
            element={renderSelectedPage(<CompleteProfile />)}
          />
          <Route path="logout" element={<LogOut />} />
          {loggedIn ? (
            <Route path="app" element={renderSelectedPage(<WebApp user={user} />)}>
              <Route path="discover" element={<Discover />} />
              <Route path="Chat" element={<Chat/>} >
                <Route path=":id" element={<ChatContainer/>} />
              </Route>

              <Route
                path="profile"
                element={<Profile user={user} setUser={setUser} />
                }
              />
                                          <Route
                path="profile/edit"
                element={<Profile user={user} setUser={setUser} />
                }
              />
                            <Route
                path="profile/:id"
                element={<Profile user={user} setUser={setUser} />
                }
              />
              <Route
                path="settings"
                element={
                  <h1>
                    mahdi asdqwe eqwe qw eqw eqw qw eqwqwe qwe qweeqw qwe qwe
                    wqeqweqwe qwe weq qwewe q
                  </h1>
                }
              />
            </Route>
          ) : (
            <Route path="app" element={<LoginPage />} />
          )}

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
