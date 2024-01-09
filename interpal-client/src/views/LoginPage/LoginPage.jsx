import React from 'react';
import './LoginPage.css'; // Make sure to import your CSS file
import Navbar from '../../components/Navbar';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null); // error state for handling errors
  console.log(localStorage.getItem('token'));
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('here');
      navigate('/app');
    }
  }, [])
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      Email: email,
      Password: password
    }).then((response)=>{
      console.log(response);
      if(response.status === 200){
        console.log(response.data);
        localStorage.setItem('token', response.data.token);    
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("id", response.data.id);
        console.log("redirecting");
        navigate('/app');
      }
    }).catch((err)=>{
      console.log(err.response.data);
      setError(err.response.data.msg);
    })
  };

  return (
    <>
    <Navbar/>
   

    <div className="login-container ">
      <form className="login-form" 
      onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        {/* Add your login form fields here */}
        <div className="form-group">
          <label className='col-3'>Email:</label>
          <input value={email} className='col-9' type="email" name="email" onChange={(e)=>{
            setEmail(e.target.value);
          }} placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label className='col-3'>Password:</label>
          <input className='col-9' type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>{
            setPassword(e.target.value);
          }} />
        </div>

        <div className='form-group d-flex justify-content-center'> <button type="submit">Log in</button></div>
        {
            error && <p className='error'>{error}</p>
          }
      </form>

      <div className="login-options">
        <p className='text-center'>Or log in with:</p>
        <div className="social-links d-flex justify-content-center'">
          <button  className='google ' >Login with Google</button>
          <button className='facebook'  >Login with Facebook</button>
          <button  className='gmail' >Login with Gmail</button>

        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
