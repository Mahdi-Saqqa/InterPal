import React from 'react';
import './Register.css'; // Make sure to create a corresponding CSS file
import Navbar from './Navbar';

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('User registered!');
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="form-group  ">
          <label className='col-3'>First Name:</label>
          <div className='col-9'><input type="text" name="name" placeholder="Enter your name" required /></div>
        </div>

        <div className="form-group">
          <label className='col-3' >Last Name:</label>
          <input className='col-9' type="text" name="name" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label className='col-3'>Email:</label>
          <input className='col-9' type="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label className='col-3'>Password:</label>
          <input className='col-9' type="password" name="password" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label className='col-3'> Confirm Password:</label>
          <input className='col-9' type="password" name="password" placeholder="Enter your password" required />
        </div>

       <div className='form-group d-flex justify-content-center'> <button type="submit">Register</button></div>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;
