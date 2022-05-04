import React, { ReactElement, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import VideoChat from '../videoSidebar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useStylesMessages} from '../../theme'
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { SocketContext } from '../../../../Context';
interface VideoDialogProps {
    open: boolean,
    setOpenVideoChat: (boolean) => void,
    user: UserType,
    receiverId: string,
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VideoDialog: React.FC<VideoDialogProps> = ({ open, setOpenVideoChat, user, receiverId }: VideoDialogProps): ReactElement => {
    const sm = useMediaQuery('(max-width:600px)');
    const classes = useStylesMessages()
    const { userVideo,answerCall, call, callAccepted, callEnded, leaveCall, callUser, setStream, setCallAccepted, setCallEnded, setCall, receiver } = useContext(SocketContext);
    return (
        <Dialog
            fullScreen={sm ? true : false}
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={() => setOpenVideoChat(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton style={{ marginRight: 5, marginLeft: -5 }}>
                    <CloseIcon onClick={() => setOpenVideoChat(false)} />
                </IconButton>
                <Typography variant="h2" align="center">Video Chat</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <VideoChat user={user} receiverId={receiverId} setOpenVideoChat={setOpenVideoChat} />
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{disply: 'block'}}>
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
            </DialogActions>
        </Dialog>
    )
}

export default VideoDialog
