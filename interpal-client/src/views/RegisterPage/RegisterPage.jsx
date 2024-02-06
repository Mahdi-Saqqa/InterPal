import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";





const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    birthDay: "",
  });
  const handleChange = (event) => {
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const [error, setError] = useState(null);

  const [countries, setCountries] = useState([]);

  async function sendEmail(user) {
    console.log(user);

    try {
      await emailjs.send(
        "service_4oj1jfh",
        "template_fdccufu",
        {
          user_code: user.activationToken,
          user_name: user.firstName + " " + user.lastName,
          toEmail: user.email,
        },
        "pHlf1MseO9mIByVr6"
      );
      console.log("Email sent successfully!");
    }
    catch (error) {
      console.log("Email failed to send!");
      console.log(error);
    }
  }
  async function register (){
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        form
      );
      console.log(response.data);
      localStorage.setItem("userToken", response.data.token);
      await sendEmail(response.data);
      window.location.href = "/app/profile/complete";
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      if (error.response.status && error.response.status === 401) {
        setError(error.response.data);
      }
      console.log(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();   
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
                <form class="signup needs-validation" onSubmit={handleSubmit} >
                  <div class="form-parent">
                    <div class="form-group custom-btn">
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        type="text"
                        className={`form-control custom-btn `+ (error && error.firstName ? "is-invalid" : "")}
                        placeholder="First Name"
                        required
                      />
                      <button class="btn icon custom-btn" disabled>
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>

                    <div class="form-group custom-btn">
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        type="text"
                        className={`form-control custom-btn `+ (error && error.lastName ? "is-invalid" : "")}
                        placeholder="Last Name"
                        required
                      />
                      <button class="btn custom-btn icon" disabled>
                        <i class="material-icons">person_outline</i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group custom-btn">
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      className={`form-control custom-btn `+ (error && error.email ? "is-invalid" : "")}
                      placeholder="Email Address"
                      required
                    />
                    <button class="btn custom-btn icon" disabled>
                      <i class="material-icons">mail_outline</i>
                    </button>
                  </div>

                  <div class="form-group custom-btn">
                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      type="password"
                      className={`form-control custom-btn `+ (error && error.password ? "is-invalid" : "")}
                      placeholder="Password"
                      required
                    />
                    <button class="btn icon custom-btn" disabled>
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group custom-btn">
                    <input
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      className={`form-control custom-btn `+ (error && error.confirmPassword ? "is-invalid" : "")}
                      placeholder="Confirm Password"
                      required
                    />
                    <button class="btn custom-btn icon" disabled>
                      <i class="material-icons">lock_outline</i>
                    </button>
                  </div>
                  <div class="form-group custom-btn">
                    <div class="custom-dropdown">
                      <select
                        className="form-control custom-btn"
                        onChange={handleChange}
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
                      value={form.birthDay}
                      onChange={handleChange}
                      name="birthDay"
                      type="date"
                      className={`form-control custom-btn `+ (error && error.birthDay ? "is-invalid" : "")}
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
                  {error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        
                          <ul>
                          {Object.values(error).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                        
                      </div>
                    )}
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
              <a href="./login" class="custom-btn2 custom-btn3">
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
