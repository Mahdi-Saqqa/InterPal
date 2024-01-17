import React from "react";
import "./Discover.css";
import ColumnScroll from "../../components/ColumnScroll/ColumnScroll";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";

const Discover = () => {
  const [people, setPeople] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loggedInUserId = localStorage.getItem('id');
  console.log(loggedInUserId);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        console.log(res.data);
        const filteredPeople = res.data.users.filter(person => person._id !== loggedInUserId);
        console.log(filteredPeople);
        setPeople(filteredPeople);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <div className="Loader" style={{ height: "100vh" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="10x" />
          </div>
        </div>
      ) : (
        <ColumnScroll data={people} />
      )}
    </>
  );
};

export default Discover;
