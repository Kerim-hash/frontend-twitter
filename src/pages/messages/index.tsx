import React, { useRef, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useStylesMessages } from './theme';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import MessageTop from './components/messageTop';
import Avatar from '@mui/material/Avatar';
import MessageForm from './components/addFormMessage';
import Message from './components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, selectSearchUser } from '../../store/ducks/user/selectors';
import { Routes, useNavigate, useParams } from 'react-router';
import { Route } from 'react-router';
import { io } from 'socket.io-client'
import { istance } from '../../core/axios';
import classNames from 'classnames';
import { Button } from '@mui/material';
import Conversation from './components/Conversation';
import { useDebounce } from '../../hook/useDebounce';
import { FetchSearchUser } from '../../store/ducks/user/actions';
import { UserType } from '../../store/ducks/user/contracts/state';
import AvatarComponent from '../../components/avatar';
const Messages = () => {
    const dispatch = useDispatch()
    const classes = useStylesMessages()
    // state
    const [open, setOpen] = useState(false);
    const [search, setSearch] = React.useState<string>("");
    // 
    const scrollRef = useRef<HTMLDivElement>(null);

    // state
    const handleClose = () => {
        setOpen(false);
    };
    const searchNewPerson = () => {
        setOpen(true);
    }

    const user = useSelector(selectData)
    const params: { "*"?: string } = useParams()
    const [conversations, setConversations] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io("ws://twitterchat-node-2020.herokuapp.com/"));
    const [onlineUsers, setOnlineUsers] = useState([]);
    // https://twitterchat-node-2020.herokuapp.com/
    // socket
    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
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
                const res = await istance.get("/conversation/" + user._id);
                setConversations(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

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
        (member) => member !== user._id
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

    let handleChange = (search) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);
    useEffect(() => {

    })

    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
    };

    const userData = useSelector(selectSearchUser)

    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
    }, [search])

    console.log(currentChat)

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
        // event.stopPropagation()
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

    return (
        <>
            <Grid item xs={11} md={3.75} >
                <Box style={{ borderLeft: '1px solid #EFF3F4', height: '100vh' }}>
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
                            return <div onClick={() => openChat(item)}>
                                <Conversation setCurrentChat={setCurrentChat} conversations={item} currentUser={user._id} index={index} onlineUsers={onlineUsers} deleteConversation={deleteConversation} />
                            </div>
                        })
                        }
                    </Box>
                </Box>

            </Grid>
            <Grid item xs={11} md={5.75} style={{ borderLeft: '1px solid #EFF3F4', borderRight: '1px solid #EFF3F4', height: '100vh', }} >
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
                                return <div ref={scrollRef} className={classNames(classes.messageWrapper, { [classes.messageWrapperOwn]: item.sender === user._id })} >
                                    <Message text={item.text} own={item.sender === user._id} createdAt={item.createdAt} />
                                </div>
                            })}
                        </Box>
                        <MessageForm handleSubmit={handleSubmit} setNewMessage={setNewMessage} newMessage={newMessage} />
                    </Box>
                }

            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth scroll={'paper'} className={classes.dialog}>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle style={{ padding: 10, fontWeight: 600 }}>Новое сообщение</DialogTitle>
                </Box>
                <div style={{ padding: '0 0 20px 0' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="email"
                        placeholder="Поиск людей"
                        onChange={handleChangeSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" style={{ padding: '0 0 0 16px' }}>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        style={{ marginTop: '10px' }}
                        variant="standard"
                    />
                    <div>

                    </div>
                </div>
                <div>
                    {userData !== undefined && userData?.length > 0 && userData.map((item: UserType) => {
                        return <Box className={classes.searchUser} onClick={() => addConversations(item)}>
                            <AvatarComponent user={item} />
                            <Box className={classes.userinfo}>
                                <Typography variant="body1" className={classes.fullname}>{item?.fullname}</Typography>
                                <Typography variant="body1" className={classes.username}>@{item?.username}</Typography>
                            </Box>
                        </Box>
                    })}
                </div>
            </Dialog>
        </>
    )
}

export default Messages

