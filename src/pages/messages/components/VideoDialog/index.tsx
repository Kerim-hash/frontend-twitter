import React, { ReactElement } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import VideoChat from '../videoSidebar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
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

const VideoDialog: React.FC<VideoDialogProps> = ({ open, setOpenVideoChat, user,receiverId }: VideoDialogProps): ReactElement => {
    const sm = useMediaQuery('(max-width:600px)');
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
            <DialogTitle id="alert-dialog-title" sx={{display: 'flex', alignItems: 'center'}}>
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
        </Dialog>
    )
}

export default VideoDialog
