import React from "react";

const UserCard = () => {
  return (
    <div className="card col-2 d-flex "  >
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="card-img-top"  alt="..." />
      <div className="card-body">
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default UserCard;
