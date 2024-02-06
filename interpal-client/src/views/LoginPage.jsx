import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {

  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };
  async function login() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        form
      );
      localStorage.setItem("userToken", response.data.token);
      window.location.href = "/app";
    } catch (error) {
      setError(error.response.data.msg);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <main>
      <div class="layout">
        <div class="main order-md-1">
          <div class="start">
            <div class="container">
              <div class="col-md-12">
                <div class="content">
                  <h1>Sign in to Swipe</h1>
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
                  <p class="paragrah">or use your email account:</p>
                  <form onSubmit={handleSubmit}>
                    <div class="form-group custom-btn">
                      <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        class="form-control custom-btn"
                        placeholder="Email Address"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                      <button class="btn custom-btn icon">
                        <i class="material-icons">mail_outline</i>
                      </button>
                    </div>
                    <div class="form-group custom-btn">
                      <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        class="form-control custom-btn"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={handleChange}
                      />
                      <button class="btn custom-btn icon">
                        <i class="material-icons">lock_outline</i>
                      </button>
                    </div>
                    <button
                      type="submit"
                      class=" custom-btn2"
                      formaction="index-2.html"
                    >
                      Sign In
                    </button>
                    <div class="callout">
                      <span>
                        Don't have account?
                        <Link to="./register">Create Account</Link>
                      </span>
                    </div>
                    {error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {error}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="aside order-md-2">
          <div class="container">
            <div class="col-md-12">
              <div class="preference">
                <h2>Hello, Friend!</h2>
                <p>
                  Enter your personal details and start your journey with Swipe
                  today.
                </p>
                <Link to="../register" class="custom-btn2 custom-btn3">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
