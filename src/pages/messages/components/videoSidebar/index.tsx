import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, Paper, Button, Theme } from '@mui/material';
import { SocketContext } from '../../../../Context';
import { makeStyles } from '@mui/styles';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicOffIcon from '@mui/icons-material/MicOff';
import { istance } from '../../../../core/axios';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import AvatarComponent from '../../../../components/avatar';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useDispatch } from 'react-redux';
import { deleteNotificationByType } from '../../../../store/ducks/Notification/actions';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  gridContainer: {
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid #359BF0',
    borderRadius: '25px',
  },
  video: {
    maxWidth: '480px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '280px',
      height: '170px'
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '280px',
    }
  },


}));

const VideoChat = ({ user, receiverId, setOpenVideoChat }) => {
  const dispatch = useDispatch()
  const { userVideo, stream, answerCall, call, callAccepted, callEnded, leaveCall, callUser, setStream, setCallAccepted, setCallEnded, setCall, receiver } = useContext(SocketContext);
  const classes = useStyles();
  // const [micro, setMicro] = useState<boolean>(false)
  const myVideo = useRef<HTMLVideoElement>();


  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
  }, []);


  const [receiverUser, setReceiverUser] = React.useState<UserType>(null)
  useEffect(() => {
    if (receiverId !== undefined) {
      const getUser = async () => {
        try {
          const res = await istance.get(`users/withoutDetails/${receiverId}`)
          setReceiverUser(res.data.data)
        } catch (e) {
          console.log(e)
        }
      }
      getUser()
    }
  }, [receiverId])

  useEffect(() => {
    if (callEnded) {
      setOpenVideoChat(false)
      setCallAccepted(false)
      setCall({})
      dispatch(deleteNotificationByType(3))
      setCallEnded(false)
    }
  }, [callEnded])



  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer} mb={3}>
        <Paper className={classes.paper}>
          <Grid item xs={6} md={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <AvatarComponent size={40} user={user}/>
              <Typography variant="h5" gutterBottom ml={1}>{user?.username}</Typography>
            </Box>

            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            {/* {!stream ? <video playsInline muted ref={myVideo} autoPlay className={classes.video} /> : <Box display="flex" justifyContent="center" alignItems="center" className={classes.videoPre}><AvatarComponent size={120} user={user} /> </Box>} */}
          </Grid>
        </Paper>
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={6} md={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <AvatarComponent size={40}  avatar={receiver?.avatar ? receiver?.avatar : receiverUser.avatar} />
              <Typography variant="h5" ml={1} gutterBottom>{receiver?.senderName ? receiver?.senderName : receiverUser?.username}</Typography>
            </Box>
              <video playsInline ref={userVideo} autoPlay className={classes.video} />
              {/* {!!userVideo?.current ? <video playsInline ref={userVideo} autoPlay className={classes.video} /> :  <Box display="flex" justifyContent="center" alignItems="center" className={classes.videoPre}><AvatarComponent size={120} user={receiverUser}/></Box>} */}
            </Grid>
          </Paper>
        )}
      </Grid>
      <Paper className={classes.paper}>
        {call.isReceivingCall && !callAccepted && <Typography variant="h5">Звонит: {receiver?.senderName ? receiver?.senderName : receiverUser?.username} </Typography>}
        <form className={classes.root} noValidate autoComplete="off">
          {callAccepted && !callEnded ?
            <Button variant="contained" color="error" size="small" onClick={() => leaveCall(receiverId)} >
              <CallEndIcon />
            </Button>
            :
            !call.isReceivingCall && (
              <Button variant="contained" color="primary" size="small" onClick={() => callUser(user.username, user.avatar, receiverId, user._id)}>
                Call
              </Button>)
          }
          {call.isReceivingCall && !callAccepted && (
            <Button variant="contained" color="success" size="small" onClick={answerCall}>
              <PhoneCallbackIcon />
            </Button>
          )}
        </form>
      </Paper>
    </Container >
  );
};

export default VideoChat;