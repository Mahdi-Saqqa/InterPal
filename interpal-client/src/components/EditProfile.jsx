import React from "react";
import { useOutletContext, useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EditProfile = (props) => {
  const {user} = props;
  const [country, setCountry] = useState(user.country._id);
  const b=new Date(user.birthDay).toISOString().split('T')[0];
  const [birthday, setBirthday] = useState(b);
  const [languages, setLanguages] = useState();
  const [language, setLanguage] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [levelName, setLevelName] = useState("");
const [level, setLevel] = useState(3);
const [email, setEmail] = useState(user.email);
const [username, setUsername] = useState(user.username);
const [firstName, setFirstName] = useState(user.firstName);
const [lastName, setLastName] = useState(user.lastName);
const [bio, setBio] = useState(user.bio);
console.log(user.languages)
const [selectedLanguages, setSelectedLanguages] = useState(user.languages.map(lang => {
    return {
        language: lang.language._id,
        level: lang.level,
        languageName: lang.language.name,
        levelName: lang.levelName
    }
    }));
const addLanguage = (e) => {
  e.preventDefault();
  console.log(language, level);
  if (language === "" || level === "") return;
  if (selectedLanguages.find((lang) => lang.language === language)) return;
  setSelectedLanguages((prev) => [
      ...prev,
      {
          language,
          level,
          languageName,
          levelName
      }
  ]);
  };
  const deleteLanguage = (e, index) => {
      e.preventDefault();
      setSelectedLanguages((prev) => prev.filter((lang, i) => i !== index));
  };
  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };
  const [darkMode] = useOutletContext();
  const [countries, setCountries] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
    });
    

  }, []);

  return (<>
  {
    loaded ? (<div div className="profile-container">
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        value={country}
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
                <Box sx={{ width: 1,justifyContent: 'space-between',alignItems:'center' }} display='flex' className='my-2' >
                        <div className="col-3"> 
                        <select
                        className="form-control form-control-alternative "
                        onChange={(e) => {
                            setLanguage(e.target.value)
                            setLanguageName(e.target.selectedOptions[0].text)
                        }}
                        name="language"
                      >
                        <option value="">Select Language</option>
                        {languages.map((language) => (
                          <option key={language._id} value={language._id}>
                            {language.name}{" "}
                          </option>
                        ))}
                      </select></div>
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center" >
                              <Slider defaultValue={3}  step={1} marks min={1} max={5}  onChange={(e, value) => {
                                setLevel(value)
                                switch (value) {
                                    case 1:
                                        setLevelName('Beginner')
                                        break;
                                    case 2:
                                        setLevelName('Intermediate')
                                        break;
                                    case 3:
                                        setLevelName('Advanced')
                                        break;
                                    case 4:
                                        setLevelName('Fluent')
                                        break;
                                    case 5:
                                        setLevelName('Native')
                                        break;
                                
                                    default:
                                        break;
                                }
                            }

                              } />
                              </Stack>
                              <div className="col-3">{levelName}</div>

                               <button  className="form-control form-control-alternative btn  btn-primary col-2 " onClick={(e)=>{
                                addLanguage(e)
                               }}>
                      Add
                    </button>
                            </Box>
                    {
                        selectedLanguages.map((lang, index) => (
                            
                            <Box sx={{ width: 1,justifyContent: 'space-between',alignItems:'center' }} display='flex' className='my-2' >
                                <div className="col-3">{lang.languageName}</div>
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center" >
                              <Slider value={lang.level}  step={1} marks min={1} max={5}   disabled/>
                              </Stack>
                                <div className="col-3">{lang.levelName}</div>
                               <button  className="form-control form-control-alternative btn  btn-danger col-2 " onClick={(e=>deleteLanguage(e,index))}>
                      Delete
                    </button>
                            </Box>
                        ))
                    }
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
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
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
    ):
    (<div>Loading...</div>)
  }
  </>
    
  );
};

export default EditProfile;
