import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../Config/axiosInstance ";
import axios from "axios";
import "./CompleteProfile.css";
import emailjs from "emailjs-com";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const CompleteProfile = (props) => {
  const { user } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const fieldsets = useRef([]);
  const progressBarItems = useRef([]);
  const [code, setCode] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [previewSrc, setPreviewSrc] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [profilePicture, setProfilePicture] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [levelName, setLevelName] = useState("");
const [level, setLevel] = useState("");
const [selectedLanguages, setSelectedLanguages] = useState([]);
const [bio, setBio] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/language").then((res) => {
      let l = res.data;
      l.sort((a, b) => a.name.localeCompare(b.name));
      setLanguages(l);
    });
  }, []);
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewSrc(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const addLanguage = (e) => {
    e.preventDefault();
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
    const saveInfo = () => {
        axiosInstance
            .post("/user/completeProfile", {
                bio,
                languages: selectedLanguages
            })
            .then((res) => {
                console.log(res.data);
                handleNext();
                setTimeout(() => {
                    window.location.href = "/app";
                }
                    , 3000);
                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        "http://localhost:8000/api/user/uploadProfilePicture",
        formData,
        config
      )
      .then((response) => {
        console.log(response);
        setPreviewSrc(response.data.url);
        handleNext();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendCode = (e) => {
    e.preventDefault();
    console.log(code);
    axiosInstance
      .post("/user/activate", { code })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          handleNext();
        }
      })
      .catch((err) => {
        console.log(err);
        setCodeError("Invalid or expired Code");
      });
  };
  const handleResend = (e) => {
    e.preventDefault();
    axiosInstance
      .get("/user/resend")
      .then((res) => {
        console.log(res.data);
        let user = res.data;
        return emailjs.send(
          "service_4oj1jfh",
          "template_fdccufu",
          {
            user_code: user.activationToken,
            user_name: user.firstName + " " + user.lastName,
            toEmail: user.email,
          },
          "pHlf1MseO9mIByVr6"
        );
      })
      .then((result) => {
        console.log("email sent");
        console.log(result.text);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };
  useEffect(() => {
    fieldsets.current = Array.from(document.querySelectorAll("fieldset"));
    progressBarItems.current = Array.from(
      document.querySelectorAll("#progressbar li")
    );
    console.log(user.profilePic);
    if (!(user.profilePic === null || user.profilePic === undefined)) {
      setCurrentStep(3);
      progressBarItems.current[0].classList.add("active");
      progressBarItems.current[1].classList.add("active");
      progressBarItems.current[2].classList.add("active");
      fieldsets.current[0].style.display = "none";
      fieldsets.current[2].style.display = "block";
    } else if (user.activated) {
      setCurrentStep(2);
      progressBarItems.current[0].classList.add("active");
      progressBarItems.current[1].classList.add("active");
      fieldsets.current[0].style.display = "none";
      fieldsets.current[1].style.display = "block";
    }
  }, []);

  const handleNext = () => {
    const current_fs = fieldsets.current[currentStep - 1];
    const next_fs = fieldsets.current[currentStep];

    progressBarItems.current[currentStep - 1].classList.add("active");
    next_fs.style.display = "block";
    current_fs.style.display = "none";

    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="container-fluid" id="grad1">
      <div className="row justify-content-center mt-0">
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-5 mb-2">
          <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
            <h2>
              <strong>Complete your profile</strong>
            </h2>
            <p>Fill your information to help Us know you better!</p>
            <div className="row">
              <div className="col-md-12 mx-0">
                <form id="msform">
                  <ul id="progressbar">
                    <li className="active" id="account">
                      <strong>Email</strong>
                    </li>
                    <li id="personal">
                      <strong>Picture</strong>
                    </li>
                    <li id="info">
                      <strong>info</strong>
                    </li>
                    <li id="confirm">
                      <strong>Finish</strong>
                    </li>
                  </ul>
                  <fieldset>
                    <div className="form-card text-center">
                      <h1>Verify your Email Adress</h1>
                      <p>
                        Check your email for a link to verify your email
                        address. If it doesn’t appear within a few minutes,
                        check your spam folder.
                      </p>
                      <p>
                        Didn’t receive a link?{" "}
                        <button
                          classNameName=" btn-link"
                          onClick={handleResend}
                        >
                          Resend
                        </button>
                      </p>
                      <form>
                        <label className="col-3">Activation Code:</label>

                        <div className="form-group">
                          <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="col-9 m-auto"
                            type="text"
                            name="Activation Code"
                            placeholder="Enter your Code"
                            pattern="[1-9]{1}[0-9]{5}"
                            required
                          />
                          {CodeError && (
                            <div className="text-danger">{CodeError}</div>
                          )}
                        </div>
                      </form>
                    </div>
                    <input
                      type="button"
                      name="next"
                      className="next action-button"
                      onClick={sendCode}
                      value="Verify"
                    />
                  </fieldset>
                  <fieldset>
                    <div className="form-card">
                      <h2 className="fs-title">Profile Picture</h2>
                      <div className="picture-container">
                        <div className="picture">
                          <img
                            src={previewSrc}
                            className="picture-src"
                            id="wizardPicturePreview"
                            title=""
                            alt="preview img"
                          />
                          <input
                            onChange={handleFileChange}
                            type="file"
                            name="profilePicture"
                            id="wizard-picture"
                            className=""
                          />
                        </div>
                        <h6 className="">Choose Picture</h6>
                      </div>
                    </div>
                    
                    <input
                      type="button"
                      name="next"
                      className="next action-button"
                      value="Next Step"
                      onClick={uploadImage}
                    />
                  </fieldset>
                  <fieldset>
                    <div className="form-card">
                      <h2 className="fs-title">Personal Information</h2>
                      <label className="">Tell us about yourself!</label>

                      <textarea
                        className="form-control border"
                        name="bio"
                        rows={4}
                        onChange={(e) => setBio(e.target.value)}

                      ></textarea>

                      <br />
                      
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
              </div>
                    </div>
                    
                    <input
                      type="button"
                      name="next"
                      className="next action-button"
                      onClick={saveInfo}
                      value="Save"
                    />
                  </fieldset>
                  <fieldset>
                    <div className="form-card">
                      <h2 className="fs-title text-center">Success !</h2>
                      <br />
                      <br />
                      <div className="row justify-content-center">
                        <div className="col-3">
                          <img
                            src="https://img.icons8.com/color/96/000000/ok--v2.png"
                            className="fit-image"
                            alt="success"
                          />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row justify-content-center">
                        <div className="col-7 text-center">
                          <h5>You Have Successfully Signed Up</h5>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
