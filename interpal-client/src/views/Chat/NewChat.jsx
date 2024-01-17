import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewChat = (props) => {
    const navigate = useNavigate();
    const newChat = props.newChat;
    const setNewChat = props.setNewChat;
    const [message, setMessage] = useState('');
    const receiver = props.receiver;
    console.log(receiver);
    const sender = localStorage.getItem('id');
    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        axios.post('http://localhost:8000/api/chat/new', {
            sender: sender,
            receiver: receiver.id,
            message: message
        }).then((response)=>{
            if(response.status === 200){
                console.log(response.data);
                navigate(`/app/chat/${response.data._id}`);

            }
        }).catch((err)=>{
            console.log(err.response.data);
        })
    }

  return (
    <div className={"modal fade show " + (
        newChat ? 'ShowNewChat' : ''
    )}  id="startnewchat" tabindex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="requests">
            <div className="title">
                <h1>Start new chat</h1>
                <button type="button" className="btn" data-dismiss="modal" aria-label="Close"  onClick={()=>{setNewChat(!newChat); console.log(newChat); }}><i
                        className="material-icons" >close</i></button>
            </div>
            <div className="content">
                <form onSubmit={sendMessage}>
                    <div className="form-group">
                        <label htmlFor="participant">Recipient:</label>
                        <input type="text" className="form-control transparent" id="participant" disabled 
                            />
                        <div className="user" id="recipient">
                            <img className="avatar-sm" src={receiver.avatar} alt="avatar"/>
                            <h5>{receiver.name}</h5>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea className="text-control" id="message"
                            placeholder="Send your welcome message..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn button w-100">Start New Chat</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default NewChat