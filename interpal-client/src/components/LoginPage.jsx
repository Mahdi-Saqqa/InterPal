import React from 'react';
import './LoginPage.css'; // Make sure to import your CSS file
import Navbar from './Navbar';

const LoginPage = () => {


  return (
    <>
    <Navbar/>
   

    <div className="login-container ">
      <form className="login-form">
        <h2>Login</h2>

        {/* Add your login form fields here */}
        <div className="form-group">
          <label className='col-3'>Email:</label>
          <input className='col-9' type="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label className='col-3'>Password:</label>
          <input className='col-9' type="password" name="password" placeholder="Enter your password" />
        </div>

        <div className='form-group d-flex justify-content-center'> <button type="submit">Log in</button></div>
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
