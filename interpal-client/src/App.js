import React from 'react'
import Main from './views/Main/Main'
import LoginPage from './views/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './views/RegisterPage/RegisterPage';
import WebApp from './views/WebApp/WebApp';
import EmailVerify from './views/EmailVerify';
import LogOut from './views/LogOut';
import axios from 'axios';

const App = () => {
  const [user, setUser] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [activated, setActivated] = React.useState(false);
  React.useEffect(() => {
    
      axios.post("http://localhost:8000/api/users/loggedin", {token: localStorage.getItem("token")})
          .then(res => {
            console.log(res);
              setUser(res.data.user);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem("id", res.data.user._id);
              
              console.log(res.data.user);
              if (res.data.user.activated === false) { 
                setActivated(false);
                setLoaded(true);

              }
              else {
                setActivated(true);
                setLoaded(true);

              }
          })

          .catch(err => {
              setLoaded(true);
          })
  }, []);

  return (
    <div>
    <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/RegisterPage" element={<RegisterPage/>} />
    <Route path="/activate" element={<EmailVerify/>} />
    <Route path="/logout" element={<LogOut/>} />
    {
      activated === true ?
      (<>
          <Route path="/app" element={<WebApp/>} />

      </>):(<>
        <Route path="/app" element={<EmailVerify/>} />

      </>)
    }
    <Route path="*" element={<h1>Not Found</h1>} />


   </Routes>
   </div>
  )
  
}

export default App;