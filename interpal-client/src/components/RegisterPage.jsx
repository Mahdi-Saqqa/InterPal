import React, { useState, useEffect } from "react";
import "./Register.css"; // Make sure to create a corresponding CSS file
import Navbar from "./Navbar";
import axios from "axios";

const RegisterPage = () => {
  const [country, setCountry] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("User registered!");
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/country")
      .then((res) => {
        let c=res.data;
        c.sort((a,b)=>a.name.localeCompare(b.name))
        setCountry(c);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="form-group  ">
            <label className="col-3">First Name:</label>
            <div className="col-9">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-3">Last Name:</label>
            <input
              className="col-9"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label className="col-3">Email:</label>
            <input
              className="col-9"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="col-3">Password:</label>
            <input
              className="col-9"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label className="col-3"> Confirm Password:</label>
            <input
              className="col-9"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label className="col-3">Country</label>
            <select className="col-9" name="country" required>
              <option value="">Select Country</option>
              {country.map((country) => (
                <option key={country._id} value={country._id}>
                  <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        style={{ width: '20px', marginLeft: '5px' }}
                      />
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group d-flex justify-content-center">
            {" "}
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
