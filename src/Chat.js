import React, {useEffect,useState} from 'react';
import {Avatar,IconButton} from "@material-ui/core"; 
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from 'react-router-dom';
import db from './firebase';
import "./Chat.css";
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
       if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
               setRoomName(snapshot.data().name)
           ));
           db.collection('rooms')
           .doc(roomId)
           .collection("messages")
           .orderBy('timestamp','asc')
           .onSnapshot((snapshot)=>(
               setMessages(snapshot.docs.map((doc) => 
               doc.data()))
           ));
       }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you type>>>", input);
        db.collection('rooms')
        .doc(roomId)
        .collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>
                    last seen{" "}
                    {new Date(
                        messages[messages.length - 1]?.
                        timestamp?.toDate()
                        ).toUTCString()}
                </p>
            </div>
            <div className="chat__headerRight">
                   <IconButton>
                       <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                       <AttachFile/>
                    </IconButton>
                    <IconButton>
                       <MoreVertIcon/> 
                    </IconButton>  
            </div>
            </div>
            <div className="chat__body">
            {messages.map(message => (
                <p className={`chat__message ${
                    message.name === user.displayName && 'chat__receiver'}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>{message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value = {input} onChange={e => setInput(e.target.value)}
                     placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;