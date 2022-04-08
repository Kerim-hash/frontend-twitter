import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();


  console.log(name, callAccepted, myVideo, userVideo, callEnded, stream, call)
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;