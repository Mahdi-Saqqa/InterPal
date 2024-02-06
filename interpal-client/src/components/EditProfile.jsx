import React from "react";
import { useOutletContext, useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState("");
  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };
  const [darkMode] = useOutletContext();
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

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
    axios.get("http://localhost:8000/api/language").then((res) => {
      let l = res.data;
      l.sort((a, b) => a.name.localeCompare(b.name));
      setLanguages(l);
    });
  }, []);

  return (
    <div div className="profile-container">
      <div
        className="header p-5 pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={headerStyle}
      ></div>
      <div
        className={`${
          darkMode === true ? " " : ""
        }  CustomUserContainer border-radius mt--7  mb-5 `}
      >
        {" "}
        <div className="card  col col-10 col-sm-12 px-0 shadow">
          <div className="card-header border-0  m-0">
            <div className="row align-items-center">
              <div className="col-8">
                <h3 className="mb-0 text-primary">My account</h3>
              </div>
              <div className="col-4 text-right">
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form>
              <h6 className="heading-small text-muted mb-4">
                User information
              </h6>
              <div className="pl-lg-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="input-username"
                        className="form-control form-control-alternative"
                        placeholder="Username"
                        value="lucky.jesse"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="input-email"
                        className="form-control form-control-alternative"
                        placeholder="jesse@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="input-first-name"
                        className="form-control form-control-alternative"
                        placeholder="First name"
                        value="Lucky"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="input-last-name"
                        className="form-control form-control-alternative"
                        placeholder="Last name"
                        value="Jesse"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Country
                      </label>
                      <select
                        className="form-control form-control-alternative"
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country._id}>
                            {country.name}{" "}
                          </option>
                        ))}
                      </select>{" "}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        BirthDay
                      </label>
                      <input
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        type="date"
                        class="form-control form-control-alternative"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">Languages</h6>
              <div className="pl-lg-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Add Language
                      </label>
                      <select
                        className="form-control form-control-alternative"
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                      >
                        <option value="">Select Language</option>
                        {languages.map((language) => (
                          <option key={language._id} value={language._id}>
                            {language.name}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Level
                      </label>
                      <select
                        className="form-control form-control-alternative"
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                      >
                        <option value="">Select Level</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                        <option value="4">Fluent</option>
                        <option value="5">Native</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="form-group focused">
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        &nbsp;
                      </label>
                      <button  className="form-control form-control-alternative btn btn-sm btn-primary ">
                      add
                    </button>
                    </div>
                  </div>
                </div>
                <div className="row"></div>
              </div>
              <hr className="my-4" />
              <h6 className="heading-small text-dark mb-4">About me</h6>
              <div className="pl-lg-4">
                <div className="form-group text-dark focused">
                  <label>About Me</label>
                  <textarea
                    rows="4"
                    className="form-control form-control-alternative"
                    placeholder="A few words about you ..."
                  >
                    A beautiful Dashboard for Bootstrap 4. It is Free and Open
                    Source.
                  </textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
