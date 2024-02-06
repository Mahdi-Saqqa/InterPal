import React,{useEffect,useState} from 'react'
import axiosInstance from '../../Config/axiosInstance ';
import { Link } from 'react-router-dom';
const ChatItem = (props) => {
    return (
        <Link to={props.id} className="filterDiscussions all unread single"
        id="list-request-list" data-toggle="list" role="tab">
        <img className="avatar-md" src={require(`../../uploads/${props.avatar}`)}
            data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar"/>
        <div className="status">
            <i className="material-icons offline">fiber_manual_record</i>
        </div>
        {/* <div className="new bg-gray">
            <span>?</span>
        </div> */}
        <div className="data">
            <h5>{props.name}</h5>
            <span>{props.date}</span>
            <p>{props.message}</p>
        </div>
    </Link>
    )
}
const formateTime = (time) => {
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
const ChatBar = (props) => {
    const {newChat, setNewChat,darkMode} = props
    const [chatList, setChatList] = useState([]);
    const socket = props.socket;
    const fetchChatList = () => {
        axiosInstance.get('/chat/userChat').then((response)=>{
            console.log(response.data);
            let sorted = response.data.sort((a,b)=>{
                return new Date(b.messages[b.messages.length - 1].timestamp) - new Date(a.messages[a.messages.length - 1].timestamp)
            })
            setChatList(sorted);

        }
        ).catch((err)=>{
            console.log(err.response.data);
        })

    }
    useEffect(()=>{
        socket.on('newChat', (data)=>{
            fetchChatList();
        })
        fetchChatList();

    },[])
  return (
    <div id="discussions" className="tab-pane fade active show">
    <div className="search">
        <form className="form-inline position-relative">
            <input type="search" className="form-control" id="conversations"
                placeholder="Search for conversations..."/>
            <button type="button" className="btn btn-link loop"><i
                    className="material-icons">search</i></button>
        </form>
        <button className="btn create" data-toggle="modal" data-target="#startnewchat" onClick={()=>{setNewChat(!newChat); console.log(newChat);
                }}><i
                className="material-icons">create</i></button>
    </div>
    <div className="list-group sort">
        <button className="btn filterDiscussionsBtn active show" data-toggle="list"
            data-filter="all">All</button>
        <button className="btn filterDiscussionsBtn" data-toggle="list"
            data-filter="read">Read</button>
        <button className="btn filterDiscussionsBtn" data-toggle="list"
            data-filter="unread">Unread</button>
    </div>
    <div className={`discussions ${darkMode === true ? 'dark' : ''}`}>
        <h1>Discussions</h1>
        <div className="list-group" id="chats" role="tablist">
            {chatList.map((chat)=>{
                let user = chat.users[0]._id === localStorage.getItem('id') ? chat.users[1] : chat.users[0];
                console.log(user);
                return <ChatItem key={chat._id}  
                id={chat._id}
                name={user.Fname + ' ' + user.Lname}  
                avatar={user.profilePic.name}
                message={chat.messages[chat.messages.length - 1].content}
                date={formateTime(new Date(chat.messages[chat.messages.length - 1].timestamp))}
                />
            }
            )}

        </div>
    </div>
</div>
  )
}

export default ChatBar