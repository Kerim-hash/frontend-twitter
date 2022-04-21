import React, { ReactElement, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import VideoChat from '../videoSidebar';
import { SocketContext } from '../../../../Context';
interface VideoDialogProps {
    open: boolean,
    setOpenVideoChat: (boolean) => void,
}

const VideoDialog: React.FC<VideoDialogProps> = ({open, setOpenVideoChat, }: VideoDialogProps): ReactElement=> {
    return (
        <Dialog
        fullWidth
         maxWidth="lg"
         open={true}
         onClose={() => setOpenVideoChat(false)}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
     >
         <DialogTitle id="alert-dialog-title">
             <Typography variant="h2" align="center">Video Chat</Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText id="alert-dialog-description">
              <VideoChat  />
             </DialogContentText>
         </DialogContent>
     </Dialog>
    )
}

export default VideoDialog
