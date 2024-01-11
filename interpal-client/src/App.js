import React from 'react'
import Main from './views/Main/Main'
import LoginPage from './views/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './views/RegisterPage/RegisterPage';
import WebApp from './views/WebApp/WebApp';
import EmailVerify from './views/EmailVerify';
import LogOut from './views/LogOut';
import axios from 'axios';
import CompleteProfile from './views/CompleteProfile/CompleteProfile';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Discover from './views/Discover/Discover';
const App = () => {
  const [user, setUser] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);  
  const renderSelectedPage = (elem) => {
    if (user === null) {
      return <LoginPage />
      
    }
    else if (user.activated === false) {
      return <EmailVerify />
    }
    else {
      return elem
    }
  }
  React.useEffect(() => {
    axios.post("http://localhost:8000/api/users/loggedin", { token: localStorage.getItem("token") })
      .then(res => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("id", res.data.user._id);

        console.log(res.data.user);
          setLoaded(true);
        
        
      })
      .catch(err => {
        setLoaded(true);
      })
  }, []);

  return (
    <div >
      {
        !loaded ?
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                      <FontAwesomeIcon icon={faSpinner} spin size="10x" />
          </div>
          :
          <Routes>
        <Route path="/"  element={<Main />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="activate" element={<EmailVerify />} />
        <Route path="completeprofile" element={renderSelectedPage(<CompleteProfile />)} />
        <Route path="logout" element={<LogOut />} />
        <Route path="app" element={<WebApp user={user} />} >
            <Route path="discover" element={<Discover/>} />
            <Route path="profile" element={<h1>mahdi asdqwe eqwe qw eqw eqw qw eqwqwe qwe qweeqw qwe qwe wqeqweqwe  qwe weq qwewe q</h1>} />
            <Route path="settings" element={<h1>mahdi asdqwe eqwe qw eqw eqw qw eqwqwe qwe qweeqw qwe qwe wqeqweqwe  qwe weq qwewe q</h1>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      }

    </div>
  )

}

export default App;