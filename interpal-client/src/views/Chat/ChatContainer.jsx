import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axiosInstance from "../../Config/axiosInstance ";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
const formateTime = (time) => {
  return time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
const ChatContainer = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io.connect("http://localhost:8000");

  const chatId = useParams().id;
  const userId = localStorage.getItem("id");
  const sendMessage = (e) => {
    socket.emit("chat message", {
      message: message,
      sender: userId,
      receiver: user._id,
    });

    console.log({
      sender: userId,
      receiver: user._id,
      message: message,
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("newChat", (data) => {
      axiosInstance
        .post("/chat/getChat", {
          id: chatId,
        })
        .then((response) => {
          setChat(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
    axiosInstance
      .post("/chat/getChat", {
        id: chatId,
      })
      .then((response) => {
        setChat(response.data);
        setUser(
          response.data.users[0]._id == userId
            ? response.data.users[1]
            : response.data.users[0]
        );
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);
  useEffect(() => {
    let ChatContainer = document.getElementById("content");

    if (ChatContainer) {
      // Using smooth scrolling
      ChatContainer.scrollTo({
        top: ChatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  const { darkMode } = props;
  return (
    <>
      {loaded ? (
        <div
          className="babble tab-pane fade active show"
          id="list-chat"
          role="tabpanel"
          aria-labelledby="list-chat-list"
        >
          <div className="chat" id="chat1">
            <div className={`top ${darkMode === true ? "dark" : ""}`}>
              <div className="container">
                <div className="col-md-12">
                  <div className="inside">
                    <a href="#">
                      <img
                        className="avatar-md"
                        src={require(`../../uploads/${user.profilePic.name}`)}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Keith"
                        alt="avatar"
                      />
                    </a>
                    <div className="status">
                      <i className="material-icons online">
                        fiber_manual_record
                      </i>
                    </div>
                    <div className="data">
                      <h5>
                        <a href="#">{user.Fname + " " + user.Lname}</a>
                      </h5>
                      <span>Active now</span>
                    </div>
                    <button className="btn connect d-md-block d-none" name="1">
                      <i className="material-icons md-30">phone_in_talk</i>
                    </button>
                    <button className="btn connect d-md-block d-none" name="1">
                      <i className="material-icons md-36">videocam</i>
                    </button>
                    <button className="btn d-md-block d-none">
                      <i className="material-icons md-30">info</i>
                    </button>
                    <div className="dropdown show">
                      <button
                        onClick={() => setDropdown(!dropdown)}
                        className="btn"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <i className="material-icons md-30">more_vert</i>
                      </button>
                      <div
                        className={
                          "dropdown-menu dropdown-menu-right" +
                          (dropdown ? " show" : "")
                        }
                      >
                        <button className="dropdown-item connect" name="1">
                          <i className="material-icons">phone_in_talk</i>Voice
                          Call
                        </button>
                        <button className="dropdown-item connect" name="1">
                          <i className="material-icons">videocam</i>Video Call
                        </button>
                        <hr />
                        <button className="dropdown-item">
                          <i className="material-icons">clear</i>Clear History
                        </button>
                        <button className="dropdown-item">
                          <i className="material-icons">block</i>Block Contact
                        </button>
                        <button className="dropdown-item">
                          <i className="material-icons">delete</i>Delete Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content" id="content">
              <div className="container">
                <div className="col-md-12">
				{
  chat.messages.map((message, index) => {
    const isFirstMessage = index === 0;
    const currentDate = new Date(message.timestamp).getDate();
    const isToday = currentDate === new Date().getDate();
    const isYesterday = currentDate === new Date().getDate() - 1;
    const formattedDate =
      isToday
        ? 'Today'
        : isYesterday
        ? 'Yesterday'
        : formatDate(new Date(message.timestamp));

    // Check if the day has changed and it's not the first message
    const isDayChanged = !isFirstMessage && currentDate !== new Date(chat.messages[index - 1].timestamp).getDate();

    return ( 
      <>
        {(isDayChanged || isFirstMessage) && (
          <div key={`dateSeparator-${index}`}  className="date">
            <hr />
            <span>{formattedDate}</span>
            <hr />
          </div>
        )}

        <div key={index} className={`message ${message.sender._id === userId ? 'me' : ''}`}>
          <div className="text-main">
            <div className={`text-group ${message.sender._id === userId ? 'me' : ''}`}>
              <div className={`text ${message.sender._id === userId ? 'me' : ''}`}>
                <p>{message.content}</p>
              </div>
            </div>
            <span>{formateTime(new Date(message.timestamp))}</span>
          </div>
        </div>
      </>
    );
  })
}
                  {/* <div className="message">
												<div className="text-main">
													<div className="text-group">
														<div className="text typing">
															<div className="wave">
																<span className="dot"></span>
																<span className="dot"></span>
																<span className="dot"></span>
															</div>
														</div>
													</div>
												</div>
											</div> */}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="col-md-12">
                <div className="bottom">
                  <div className="position-relative w-100">
                    <textarea
                      className="form-control"
                      placeholder="Start typing for reply..."
                      rows="1"
                      id="messageInput"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                    ></textarea>
                    <button className="btn emoticons">
                      <i className="material-icons">insert_emoticon</i>
                    </button>
                    <button
                      onClick={sendMessage}
                      type="submit"
                      className="btn send"
                    >
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                  <label>
                    <input type="file" />
                    <span className="btn attach d-sm-block d-none">
                      <i className="material-icons">attach_file</i>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="call" id="call1">
            <div className="content">
              <div className="container">
                <div className="col-md-12">
                  <div className="inside">
                    <div className="panel">
                      <div className="participant">
                        <img className="avatar-xxl" src={""} alt="avatar" />
                        <span>Connecting</span>
                      </div>
                      <div className="options">
                        <button className="btn option">
                          <i className="material-icons md-30">mic</i>
                        </button>
                        <button className="btn option">
                          <i className="material-icons md-30">videocam</i>
                        </button>
                        <button className="btn option call-end">
                          <i className="material-icons md-30">call_end</i>
                        </button>
                        <button className="btn option">
                          <i className="material-icons md-30">person_add</i>
                        </button>
                        <button className="btn option">
                          <i className="material-icons md-30">volume_up</i>
                        </button>
                      </div>
                      <button className="btn back" name="1">
                        <i className="material-icons md-24">chat</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

export default ChatContainer;
