import React, { useState, useEffect } from "react";
import "./Register.css"; // Make sure to create a corresponding CSS file
import Navbar from "../../components/Navbar";
import axios from "axios";

const RegisterPage = () => {
  const [countries, setCountries] = useState([]);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [country,setCountry] = useState('');
  const [birthday,setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    axios.post("http://localhost:8000/api/register", {
      Fname:firstName,
      Lname:lastName,
      Email:email,
      Password:password,
      Cpassword:confirmPassword,
      country:country,
      Bday:birthday
    }
    )
    .then((res) => {
      console.log(res.data);
      console.log("User registered!");
    })
    .catch((err) => {
      console.log(err);
    });
  
    console.log("User registered!");
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/country")
      .then((res) => {
        let c=res.data;
        c.sort((a,b)=>a.name.localeCompare(b.name))
        setCountries(c);
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
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}

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
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}

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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

              className="col-9"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="col-3">Birthday:</label>
            <input
            value={birthday}
            onChange={(e)=>setBirthday(e.target.value)}

              className="col-9"
              type="date"
              name="btday"
              placeholder="Enter your bday"
              required
            />
          </div>
          <div className="form-group">
            <label className="col-3">Password:</label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}

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
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}

              className="col-9"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label className="col-3">Country</label>
            <select className="col-9"
            onChange={(e)=>setCountry(e.target.value)}
            name="country" >
              <option value="">Select Country</option>
              {countries.map((country) => (
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
