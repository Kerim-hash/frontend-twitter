import React, { useContext, useRef, useEffect } from 'react';
import { Container, Paper, Button, Theme } from '@mui/material';
import { SocketContext } from '../../../../Context';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { istance } from '../../../../core/axios';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import AvatarComponent from '../../../../components/avatar';
import { useDispatch } from 'react-redux';
import { deleteNotificationByType } from '../../../../store/ducks/Notification/actions';
import {useStylesMessages} from '../../theme'
const VideoChat = ({ user, receiverId, setOpenVideoChat }) => {
  const dispatch = useDispatch()
  const { userVideo,answerCall, call, callAccepted, callEnded, leaveCall, callUser, setStream, setCallAccepted, setCallEnded, setCall, receiver } = useContext(SocketContext);
  const classes = useStylesMessages();
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
        <Grid className={classes.element} item xs={12} sm={5.8}  md={5.5}>
          <Box display="flex" alignItems="center" mb={1}>
            <AvatarComponent size={40} user={user} />
            <Typography variant="h5" gutterBottom ml={1}>{user?.username}</Typography>
          </Box>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
        </Grid>
        {callAccepted && !callEnded && (
          <Grid className={classes.element} item xs={12} sm={5.8} md={5.5} >
            <Box display="flex" alignItems="center" mb={1}>
              <AvatarComponent size={40} avatar={receiver?.avatar ? receiver?.avatar : receiverUser?.avatar} />
              <Typography variant="h5" ml={1} gutterBottom>{receiver?.senderName ? receiver?.senderName : receiverUser?.username}</Typography>
            </Box>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        )}
      </Grid>
     
    </Container >
  );
};

export default VideoChat;