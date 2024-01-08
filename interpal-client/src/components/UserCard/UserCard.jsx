import React from "react";
import "./UserCard.css";

const UserCard = () => {
  return (
    <div className="userCard ">
        <div className="userCard__image_container">
        <img className="userCard__image"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        </div>
        <div className="userCard__info">
        <p className="userCard__name">Mahdi Saqqa</p>
        <p className="userCard__location"> <img src="https://flagcdn.com/w320/sk.png" alt="" /> Palestine</p>
        <p className="userCard__bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        <p className="userCard__lang"> <span>Arabic</span> <span>English</span> <span>+1</span></p>

        </div>



    </div>
  );
};

export default UserCard;
