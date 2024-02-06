import React from 'react'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Loader = () => {
  return (
    <div
    className="Loader"
  >
    <FontAwesomeIcon icon={faSpinner} spin size="10x" />
  </div>
  )
}

export default Loader