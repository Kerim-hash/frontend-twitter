import React, { useRef, useEffect, useState, useContext } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useStylesMessages } from './theme';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MessageTop from './components/messageTop';
import MessageForm from './components/addFormMessage';
import Message from './components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, selectSearchUser } from '../../store/ducks/user/selectors';
import { Route, Routes, useParams } from 'react-router';
import { istance } from '../../core/axios';
import classNames from 'classnames';
import { Button } from '@mui/material';
import Conversation from './components/Conversation';
import { SocketContext } from '../../Context';
import VideoDialog from './components/VideoDialog';
import AddConversationDialog from './components/addConversation';
import VideoChat from './components/videoSidebar';

const Messages = () => {
    const classes = useStylesMessages()
    // state
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    const searchNewPerson = () => {
        setOpen(true);
    }

    const user = useSelector(selectData)
    const [conversations, setConversations] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    // socket  
    const { socket } = useContext(SocketContext);
    const videocall = onlineUsers?.find((item) => item.userId === "62593dcfbf83effc1dbccab8")?.socketId

    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.emit("addUser", user?._id);
        socket.on("getUsers", (users) => {
            setOnlineUsers(
                users
            );
        });
    }, [user]);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // request get
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await istance.get("/conversation/" + user?._id);
                setConversations(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user?._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await istance.get("/message/" + currentChat?._id);
                setMessages(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const receiverId = Array.isArray(currentChat?.members) && currentChat?.members?.find(
        (member) => member !== user?._id
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        try {
            const res = await istance.post("/message", message);
            setMessages([...messages, res.data.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    const openChat = (item) => {
        setCurrentChat(item)
        // navigate(`/messages/${id}`)
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const addConversations = (item) => {
        const addConversation = async () => {
            try {
                const res = await istance.post("/conversation/", { senderId: user._id, receiverId: item._id });
                setConversations([...conversations, res.data.data]);
            } catch (err) {
                console.log(err);
            }
        };
        addConversation();
        handleClose()
    }
    const deleteConversation = async (id: string) => {
        const deleteConversation = async () => {
            try {
                const res = await istance.delete(`/conversation/${id}`);
                setConversations(conversations.filter(item => item._id !== id));
            } catch (err) {
                console.log(err);
            }
        };
        await deleteConversation();
        setCurrentChat(null)
    }
    // video chat
    const [openVideoChat, setOpenVideoChat] = React.useState(true);
    const callMeVideo = () => {
        setOpenVideoChat(true)
    }
    return (
        <>
            <Grid item xs={11} md={3.75} >
                <Box className={classes.itemConversation}>
                    <div style={{ padding: '8px 15px', }}>
                        <Box display='flex' alignItems="center" justifyContent="space-between" >
                            <Typography variant="body1" color="text.secondary" style={{ fontWeight: 800, fontSize: 19, lineHeight: 1 }}>Сообщения</Typography>
                            <IconButton onClick={searchNewPerson}>
                                <PersonAddAlt1OutlinedIcon />
                            </IconButton>
                        </Box>
                        {conversations.length >= 1 ? <OutlinedInput
                            fullWidth
                            className={classes.outlinedInput}
                            placeholder="Поиск в Твитерре"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        /> : <Box style={{ paddingLeft: 14, marginTop: 35 }}>
                            <Typography variant="h4" color="text.secondary" style={{ fontWeight: 800, lineHeight: 1 }}> Отправил сообщение — получил сообщение</Typography>
                            <Typography variant="body2" color="#74828C" style={{ fontWeight: 500, marginTop: 10, marginBottom: 30 }}>Личные сообщения — это приватная переписка в Твиттере. В них можно делиться твитами, медиафайлами и другим контентом.</Typography>
                            <Button variant="contained" color="primary" size="large" onClick={searchNewPerson}>Начните переписку</Button>
                        </Box>}
                    </div>

                    <Box className={classes.messageUsers}>
                        {conversations && conversations?.map((item, index) => {
                            return <div onClick={() => openChat(item)} key={item._id}>
                                <Conversation setCurrentChat={setCurrentChat} conversations={item} currentUser={user._id} index={index} onlineUsers={onlineUsers} deleteConversation={deleteConversation} />
                            </div>
                        })
                        }
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={11} md={5.75} className={classes.itemMessage} >
                {!currentChat ?
                    <Box style={{ padding: 15, height: '100vh', display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center', }}>
                        <Box style={{ maxWidth: 295 }}>
                            <Typography variant="h4" color="text.secondary" style={{ fontWeight: 800, lineHeight: 1 }}>Вы не выбрали сообщение</Typography>
                            <Typography variant="body2" color="#74828C" style={{ fontWeight: 500, marginTop: 10, marginBottom: 30 }}>Выберите одно из своих сообщений или напишите новое.</Typography>
                            <Button variant="contained" color="primary" size="large" onClick={searchNewPerson}>Новое сообщение</Button>
                        </Box>
                    </Box>
                    :
                    <Box>
                        <MessageTop receiverId={receiverId} />
                        <Box display="flex" flexDirection="column" style={{ height: '82vh', overflow: 'scroll' }}>
                            {Array.isArray(messages) && messages?.map((item) => {
                                return <div ref={scrollRef} key={item.sender} className={classNames(classes.messageWrapper, { [classes.messageWrapperOwn]: item.sender === user._id })} >
                                    <Message text={item.text} own={item.sender === user._id} createdAt={item.createdAt} />
                                </div>
                            })}
                        </Box>
                        <MessageForm handleSubmit={handleSubmit} setNewMessage={setNewMessage} newMessage={newMessage} callMeVideo={callMeVideo} />
                    </Box>
                }
            </Grid>
            <Routes>
                <Route path="/video" element={<VideoDialog open={openVideoChat} setOpenVideoChat={setOpenVideoChat} videocall={videocall} />} />
            </Routes>
            <AddConversationDialog open={open} handleClose={handleClose} addConversations={addConversations} />
        </>
    )
}

export default Messages




