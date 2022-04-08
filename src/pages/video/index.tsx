import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@emotion/react';
import { AppBar, Typography } from '@mui/material';
import Sidebar from '../../components/videoSidebar';
import Notifications from '../../components/Notifications';
import VideoPlayer from '../../components/VideoPlayer';
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Video = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default Video;