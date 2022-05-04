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
import { selectData } from '../../store/ducks/user/selectors';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { Button } from '@mui/material';
import Conversation from './components/Conversation';
import { SocketContext } from '../../Context';
import VideoDialog from './components/VideoDialog';
import AddConversationDialog from './components/addConversation';
import { FetchConversation, FetchConversationById, FetchMessage, setAddMessage } from '../../store/ducks/Messages/actions';
import { selectConversation, selectCurrentConversation, selectMessages } from '../../store/ducks/Messages/selectors';
import useMediaQuery from '@mui/material/useMediaQuery';

const Messages = () => {
    const dispatch = useDispatch()
    const classes = useStylesMessages()
    const md = useMediaQuery('(max-width:900px)');
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
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const params = useParams()
    // socket  
    const { socket, call, callAccepted } = useContext(SocketContext);
    // useSelector
    const conversations = useSelector(selectConversation)
    const messages = useSelector(selectMessages)
    const CurrentConversation = useSelector(selectCurrentConversation)
    useEffect(() => {
        if (params["*"]) {
            dispatch(FetchConversationById(params["*"]))
        }
        // eslint-disable-next-line
    }, [params["*"]])
    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        socket.on("getUsers", (users) => {
            setOnlineUsers(
                users
            );
        });
        dispatch(FetchConversation(user?._id))
        // eslint-disable-next-line
    }, [user?._id]);
    useEffect(() => {
        arrivalMessage &&
            CurrentConversation?.members.includes(arrivalMessage.sender) &&
            dispatch(setAddMessage(arrivalMessage));
        // eslint-disable-next-line
    }, [arrivalMessage, CurrentConversation]);

    useEffect(() => {
        dispatch(FetchMessage(CurrentConversation?._id))
        // eslint-disable-next-line
    }, [CurrentConversation]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const receiverId = Array.isArray(CurrentConversation?.members) && CurrentConversation?.members?.find((member) => member !== user?._id);
    // video chat
    const [openVideoChat, setOpenVideoChat] = React.useState(false);

    const callMeVideo = () => {
        setOpenVideoChat(true)
    }
    useEffect(() => {
        if(call.isReceivingCall && !callAccepted) {
            callMeVideo()
        }
    }, [call.isReceivingCall && !callAccepted])
    return (
        <>
            {(md ? !CurrentConversation : true) && <Grid item xs={10.20} md={3.75} >
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
                            return <div key={item._id}>
                                <Conversation conversations={item} currentUser={user._id} index={index} onlineUsers={onlineUsers} />
                            </div>
                        })
                        }
                    </Box>
                </Box>
            </Grid>}
            {(md ? CurrentConversation && params["*"] : true) && <Grid item xs={10.20} md={5.75} className={classes.itemMessage} >
                {!CurrentConversation ?
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
                                return <div ref={scrollRef} key={item._id} className={classNames(classes.messageWrapper, { [classes.messageWrapperOwn]: item.sender === user._id })} >
                                    <Message text={item.text} own={item.sender === user._id} createdAt={item.createdAt} />
                                </div>
                            })}
                        </Box>
                        <MessageForm CurrentConversation={CurrentConversation?._id} receiverId={receiverId} user={user} callMeVideo={callMeVideo} />
                    </Box>
                }
            </Grid>}
            <VideoDialog open={openVideoChat} setOpenVideoChat={setOpenVideoChat} user={user} receiverId={receiverId} />
            <AddConversationDialog open={open} handleClose={handleClose} userID={user?._id} conversations={conversations} />
        </>
    )
}
export default Messages




