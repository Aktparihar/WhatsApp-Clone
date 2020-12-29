import React, {useEffect,useState} from 'react';
import {Avatar,IconButton} from "@material-ui/core"; 
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";

function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you type>>>", input);
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>Room name</h3>
                <p>Last seen ...</p>
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
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <spam className="chat__name">
                        Ankit Parihar
                    </spam>Hey Guys, How are you?
                    <spam className="chat__timestamp">
                        12:00pm
                    </spam>
                </p>
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