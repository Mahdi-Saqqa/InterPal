import React from "react";
import { Routes, Route } from "react-router-dom";
import axiosInstance from "./Config/axiosInstance ";

import Main from "./views/Main/Main";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import WebApp from "./views/WebApp/WebApp";
import EmailVerify from "./views/EmailVerify";
import LogOut from "./views/LogOut";
import CompleteProfile from "./views/CompleteProfile/CompleteProfile";
import Discover from "./views/Discover/Discover";
import Chat from "./views/Chat/Chat";
import ChatContainer from "./views/Chat/ChatContainer";
import Profile from "./views/Profile/Profile";
import EditProfile from "./components/EditProfile";
import Loader from "./components/Loader";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const renderSelectedPage = (elem) => {
    if (user === null) {
      return <LoginPage />;
    } else if (user.activated === false) {
      return <CompleteProfile  user={user}/>;
    } else if (user.completed === false) {
      return <CompleteProfile  user={user}/>;
    } else {
      return elem;
    }
  };
  async function fetchData() {
    try {
      const res = await axiosInstance.get("/users/loggedin");
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (err) {
    }
  }
  React.useEffect(() => {
    fetchData().then(() => setLoaded(true));
  }, []);

  return (
    <div>
      {!loaded ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="activate" element={renderSelectedPage(<CompleteProfile user={user} />)} />
          <Route path="logout" element={<LogOut />} />
          <Route path="app" element={renderSelectedPage(<WebApp user={user} />)}>
            <Route path="discover" element={<Discover />} />
            <Route path="Chat" element={<Chat />}>
              <Route path=":id" element={<ChatContainer />} />
            </Route>
            <Route path="profile/complete" element={renderSelectedPage(<CompleteProfile user={user} />)} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="profile/:id" element={<Profile user={user} setUser={setUser} />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      )}
    </div>
  );
};
export default App;