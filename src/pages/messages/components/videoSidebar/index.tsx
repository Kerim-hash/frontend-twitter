import React, { useContext, useRef, useEffect } from 'react';
import { Container,  Paper, Button, Theme } from '@mui/material';
import { SocketContext } from '../../../../Context';
import { makeStyles } from '@mui/styles';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MicOffIcon from '@mui/icons-material/MicOff';
import { istance } from '../../../../core/axios';
import { UserType } from '../../../../store/ducks/user/contracts/state';
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
    borderRadius: '25px'
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

const VideoChat = ({user, participantID, receiverId, senderID}) => {
  const { userVideo, stream, answerCall ,call, callAccepted, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const classes = useStyles();
  const myVideo = useRef<HTMLVideoElement>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;
      });
  }, []);

  const [receiverUser, setReceiverUser] = React.useState<UserType>(null)
  React.useEffect(() => {
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

  return (
    <Container className={classes.container}>
        <Grid container className={classes.gridContainer} mb={3}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={6} md={6}>
            <Typography variant="h5" gutterBottom>{user?.username}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={6} md={6}>
            <Typography variant="h5" gutterBottom>{receiverUser?.username}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
      <Paper className={classes.paper}>
    {call.isReceivingCall && !callAccepted  &&  <Typography variant="h5">Звонит: {receiverUser?.username} </Typography>}
        <form className={classes.root} noValidate autoComplete="off">
          {callAccepted && !callEnded ? (
            <Button variant="contained" color="error" size="small" onClick={leaveCall} >
              <CallEndIcon />
            </Button>
          ) : (
            !call.isReceivingCal && <Button variant="contained" color="primary" size="small" onClick={() => callUser(user.username, user.avatar,  receiverId, senderID)}>
              Call
            </Button>
          )}
          {call.isReceivingCall && !callAccepted && (
            <Button variant="contained" color="success" size="small" onClick={answerCall}>
              <PhoneCallbackIcon />
            </Button>
          )}
          {/* {callAccepted && !callEnded  && (
            <Button variant="contained" color="success" size="small" onClick={off}>
              <MicOffIcon />
            </Button>
          )} */}
        </form>
      </Paper>
    </Container>
  );
};

export default VideoChat;