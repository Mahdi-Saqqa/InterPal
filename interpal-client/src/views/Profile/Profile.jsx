import React, { useEffect } from "react";
import "./Profile.css";
import { useOutletContext, useParams, Link, Outlet } from "react-router-dom";
import NewChat from "../Chat/NewChat";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function calculateAge(birthdate) {
  const currentDate = new Date();
  const birthDate = new Date(birthdate);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
const Profile = () => {
  const [receiver, setReceiver] = React.useState({});
  const [newChat, setNewChat] = React.useState(false);
  const { id } = useParams();
  const [userId, setUserId] = React.useState({});
  const [user, setUser] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [editables, setEditables] = React.useState(false);
  useEffect(() => {
    if (id === null || id === undefined) {
      setUserId(localStorage.getItem("id"));
    } else {
      setUserId(id);
    }
    if (id === localStorage.getItem("id")) {
      setEditables(true);
    }
    axios
      .post(`http://localhost:8000/api/users/getuser/${id}`)
      .then((res) => {
        setUser(res.data.user);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };
  const [darkMode] = useOutletContext();
  console.log(darkMode);
  return (
    <>
      {loaded ? (
        <div className="profile-container">
          {newChat ? (
            <NewChat
              setNewChat={setNewChat}
              newChat={newChat}
              receiver={receiver}
            />
          ) : null}
          <div
            className="header p-5 pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={headerStyle}
          ></div>
          <div
            className={`${
              darkMode === true ? " " : ""
            } p-3 CustomUserContainer border-radius mt--7  mb-5 `}
          >
            <div
              className={`${
                darkMode === true ? "dark-profile " : ""
              } profile-card card-profile shadow border-radius`}
            >
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <img
                      src={require(`../../uploads/${user.profilePic.details.filename}`)}
                      className="rounded-circle"
                    />
                    {editables ? <p className="editImage">Edit</p> : null}
                  </div>
                </div>
              </div>
              <div className=" text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class=" text-center border-0 pt-4 pt-md-4 pb-0 pb-md-4">
                  <div class="d-flex justify-content-between">
                    {editables ? (
                      <>
                        <Link
                          to="../profile/edit"
                          className="btn btn-sm btn-primary px-3 py-2"
                        >
                          Edit
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="#" class="btn btn-sm btn-primary p-3">
                          Connect
                        </Link>
                        <p className="h2 mt-3">{`${user.Fname} ${user.Lname}`}</p>
                        <Link
                          to="#"
                          class="btn btn-sm btn-primary float-right p-3"
                          onClick={() => {
                            setReceiver({
                              id: id,
                              name: `${user.Fname} ${user.Lname}`,
                              avatar: require(`../../uploads/${user.profilePic.details.filename}`),
                            });
                            setNewChat(true);
                          }}
                        >
                          Message
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span class="heading">22</span>
                      <span class="description"> Conections </span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Posts</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex space-evenly  w-100  flex-wrap">
                <div className="col col-12 col-lg-6  col-md-12 col-sm-12 col-xl-4  col-xs-12  my-3">
                <div className="custom-card">
                  <p className=" h2 mb-3 text-center">Languages</p>

                            <Box sx={{ width: 1,justifyContent: 'space-between' }} display='flex' >
                    arabic
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center">
                              <Slider defaultValue={1}  step={1} marks min={1} max={5}   disabled/>
                              </Stack>
                               Begginer
                            </Box>
                            
                            <Box sx={{ width: 1,justifyContent: 'space-between' }} display='flex' >
                    arabic
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center">
                              <Slider defaultValue={1}  step={1} marks min={1} max={5}   disabled/>
                              </Stack>
                               Begginer
                            </Box>
                            
                            <Box sx={{ width: 1,justifyContent: 'space-between' }} display='flex' >
                    arabic
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center">
                              <Slider defaultValue={1}  step={1} marks min={1} max={5}   disabled/>
                              </Stack>
                               Begginer
                            </Box>
                            
                            <Box sx={{ width: 1,justifyContent: 'space-between' }} display='flex' >
                    arabic
                              <Stack spacing={2} direction="row" sx={{ mb: 1, width:2/4 }} alignItems="center">
                              <Slider defaultValue={1}  step={1} marks min={1} max={5}   disabled/>
                              </Stack>
                               Begginer
                            </Box>
                </div>
                </div>
                <div className="col col-12 col-lg-6  col-md-12 col-sm-12 col-xl-4  col-xs-12  my-3">
                  <div className="custom-card justify-content-center align-items-center d-flex flex-column">
                    
                    <p className=" h2 mb-3 text-center">About</p>
                    <div className="w-auto">
                    <p>
                      <span className=" d-flex  align-items-center ">
                        <img src={user.country.flag} className="flag me-5 " />
                        <span className="ms-5">{user.country.name} </span>
                      </span>
                    </p>
                    <p>
                      <span className=" d-flex  align-items-center">
                        <span class="material-symbols-outlined">
                          perm_contact_calendar
                        </span>
                        <span className="age">{calculateAge(user.Bday)}</span>
                      </span>
                    </p>
                    
                    <p>
                      <span className="d-flex  align-items-center">
                        <span class="material-symbols-outlined">schedule</span>
                        <span className="age">08:15 am</span>
                      </span>
                    </p>
                    </div>
                    
                  </div>
                </div>
                <div className="col col-12 col-lg-6  col-md-12 col-sm-12 col-xl-4   col-xs-12  my-3 ">
<div className="custom-card">
                  <p className=" h2 mb-3 text-center">Introduction</p>
                    <p>{user.bio}</p>
</div>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="Loader" style={{ height: "100vh" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="10x" />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
