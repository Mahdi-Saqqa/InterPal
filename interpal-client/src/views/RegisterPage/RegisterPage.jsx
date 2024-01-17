import React, { useState, useEffect } from "react";
import "./Register.css"; // Make sure to create a corresponding CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
const RegisterPage = () => {
  const [countries, setCountries] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    axios
      .post("http://localhost:8000/api/register", {
        Fname: firstName,
        Lname: lastName,
        Email: email,
        Password: password,
        Cpassword: confirmPassword,
        country: country,
        Bday: birthday,
      })
      .then((res) => {
        let user = res.data;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("id", res.data.id);
        console.log(user);
        return emailjs.send(
          "service_4oj1jfh",
          "template_fdccufu",
          {
            user_code: user.activationToken,
            user_name: user.Fname + " " + user.Lname,
            toEmail: user.Email,
          },
          "pHlf1MseO9mIByVr6"
        );
      })
      .then((result) => {
        console.log("email sent");
        console.log(result.text);
      })
      .then((res) => {
        console.log("redirecting");
        navigate("/activate");
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
        let c = res.data;
        c.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(c);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="layout">
      <div class="main order-md-2">
        <div class="start">
          <div class="container">
            <div class="col-md-12">
              <div class="content">
                <h1>Create Account</h1>
                <div class="third-party">
                  <button class="btn item bg-face text-white">
                    <i class="bx bxl-facebook-circle"></i>
                  </button>
                  <button class="btn item bg-red">
                    <i class="material-icons">Gmail</i>
                  </button>
                  <button class="btn item  bg-black">
                    <i class="material-symbols-outlined text-white">X</i>
                  </button>
                </div>
                <p>or use your email for registration:</p>
                <form class="signup" onSubmit={handleSubmit}>
                  <div class="form-parent">
                    <div class="form-group custom-btn">
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        id="inputName"
                        class="form-control custom-btn"
                        placeholder="First Name"
                        required
                      />
                      <button class="btn icon custom-btn">
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>
                    <div class="form-group custom-btn">
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        id="inputName"
                        class="form-control custom-btn"
                        placeholder="Last Name"
                        required
                      />
                      <button class="btn custom-btn icon">
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group custom-btn">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="inputEmail"
                      class="form-control custom-btn"
                      placeholder="Email Address"
                      required
                    />
                    <button class="btn custom-btn icon">
                      <i class="material-icons">mail_outline</i>
                    </button>
                  </div>

                  <div class="form-group custom-btn">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="inputPassword"
                      class="form-control custom-btn"
                      placeholder="Password"
                      required
                    />
                    <button class="btn icon custom-btn">
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group custom-btn">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      id="inputPassword"
                      class="form-control custom-btn"
                      placeholder="Confirm Password"
                      required
                    />
                    <button class="btn custom-btn icon">
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group custom-btn">
                    <div class="custom-dropdown">
                      <select
                        className="form-control custom-btn"
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country._id}>
                            {country.name}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="form-group custom-btn">
                    <input
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      type="date"
                      class="form-control custom-btn"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="custom-btn2 "
                    formaction="index-2.html"
                  >
                    Sign Up
                  </button>
                  <div class="callout">
                    <span>
                      Already a member? <a href="sign-in.html">Sign In</a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="aside order-md-1">
        <div class="container">
          <div class="col-md-12">
            <div class="preference">
              <h2>Welcome Back!</h2>
              <p>
                To keep connected with your friends please login with your
                personal info.
              </p>
              <a href="sign-in.html" class="custom-btn2 custom-btn3">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
