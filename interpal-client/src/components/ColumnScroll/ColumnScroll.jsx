// ColumnScroll.js
import React, { useEffect } from "react";
import "./ColumnScroll.css";
import NewChat from "../../views/Chat/NewChat";
import { faSpinner,faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ColumnItem = (props) =>{
 const { imageUrl, title, info,alt,id, setReceiver,setNewChat } = props;
  const navigate = useNavigate();
  return (
<figure className="custom-column__item">
  <div className="custom-column__item-imgwrap">
    <img src={imageUrl} alt={alt} />
    <div className="custom-column__item-caption">
      <span className="custom-title">{title}</span>
      <span className="custom-info">{info}</span>
      
      {/* Container for buttons */}
      
      
    </div>
    <div className="button-container">
        <button className="btn btn-primary left-button" onClick={() => {
          setReceiver({
            id: id,
            name: title,
            avatar: imageUrl
          })
          setNewChat(true)
        }}><i class='bx bxs-send'></i></button>
        <button className="btn btn-secondary right-button" onClick={
          ()=>{navigate(`/app/profile/${id}`)}
        }><FontAwesomeIcon icon={faUser} /></button>
      </div>
  </div>

</figure>
) 
}

const ColumnScroll = (props) => {
  const [receiver, setReceiver] = React.useState({});
  const [newChat, setNewChat] = React.useState(false);
  const { data } = props;
  const[loadded,setLoadded] = React.useState(false)
  
  const [people1, setPeople1] = React.useState([])
  const [people2, setPeople2] = React.useState([])
  const [people3, setPeople3] = React.useState([])
  const [people4, setPeople4] = React.useState([])

  useEffect(() => {

    for (let i = 0; i < 32; i++) {

      if(data[i].profilePic == ""){
        data[i].profilePic = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        console.log(data[i]._id);
      }
      else{
        data[i].profilePic =require(`../../uploads/${data[i].profilePic.details.filename}`)
      }

      if (i < 8) {
        setPeople1(prev => [...prev, data[i]])
      } else if (i < 16) {
        setPeople2(prev => [...prev, data[i]])
      } else if (i < 24) {
        setPeople3(prev => [...prev, data[i]])
      } else {
        setPeople4(prev => [...prev, data[i]])
      }



    }
    setLoadded(true)
  }, []);
  // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    const columnsContainer = document.querySelector(".custom-columns");
    const reverseColumns = document.querySelectorAll(".custom-column-reverse");
    
    columnsContainer.style.overflowY = "hidden";

    const handleScroll = () => {
      if (window.innerWidth > 1024){
        const scrollPosition = window.scrollY;
        const newTranslateY = scrollPosition / 2.1;  
  
        reverseColumns.forEach(($column) => {
          $column.style.transform = `translateY(${newTranslateY}px)`;
          $column.style.webkitTransform = `translateY(${newTranslateY}px)`;
          $column.style.mozTransform = `translateY(${newTranslateY}px)`;
          $column.style.msTransform = `translateY(${newTranslateY}px)`;
          $column.style.oTransform = `translateY(${newTranslateY}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    {loadded} ? (
      <div className="custom-columns" data-scroll-container="">
      {
        newChat ? <NewChat setNewChat={setNewChat} newChat={newChat} receiver={receiver} /> : null
      }
      <div className="custom-column custom-column-reverse">
        {
          people1.map((person, index) => (
            <ColumnItem
              setNewChat={setNewChat}
              setReceiver={setReceiver}
              id={person._id}
              key={index}
              alt={person._id}
              imageUrl={person.profilePic}
              title={person.Fname+' '+person.Lname}
              info={person.bio}
            />
          ))
        }
      </div>

      <div className="custom-column">
      {
          people2.map((person, index) => (
            <ColumnItem
              setNewChat={setNewChat}
              setReceiver={setReceiver}
              id={person._id}
              key={index}
              alt={person._id}
              imageUrl={person.profilePic}
              title={person.Fname+' '+person.Lname}
              info={person.bio}
            />
          ))
        }
      </div>

      <div className="custom-column  custom-column-reverse">
      {
          people3.map((person, index) => (
            <ColumnItem
              setNewChat={setNewChat}
              setReceiver={setReceiver}
              id={person._id}
              key={index}
              alt={person._id}
              imageUrl={person.profilePic}
              title={person.Fname+' '+person.Lname}
              info={person.bio}
            />
          ))
        }
      </div>
      <div className="custom-column">
      {
          people4.map((person, index) => (
            <ColumnItem
              setNewChat={setNewChat}
              setReceiver={setReceiver}
              id={person._id}
              key={index}
              alt={person._id}
              imageUrl={person.profilePic}
              title={person.Fname+' '+person.Lname}
              info={person.bio}
            />
          ))
        }
      </div>
    </div>) : (        <div>
          <div className="Loader" style={{ height: "100vh" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="10x" />
          </div>
        </div>)
  );
};

export default ColumnScroll;
