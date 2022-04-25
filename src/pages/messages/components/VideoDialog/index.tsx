import React, { ReactElement } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import VideoChat from '../videoSidebar';
interface VideoDialogProps {
    open: boolean,
    setOpenVideoChat: (boolean) => void,
    name: string,
    participantID: string
}

const VideoDialog: React.FC<VideoDialogProps> = ({open, setOpenVideoChat,name, participantID }: VideoDialogProps): ReactElement=> {
    return (
        <Dialog
        fullWidth
         maxWidth="lg"
         open={open}
         onClose={() => setOpenVideoChat(false)}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
     >
         <DialogTitle id="alert-dialog-title">
             <Typography variant="h2" align="center">Video Chat</Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText id="alert-dialog-description">
              <VideoChat  name={name} participantID={participantID} />
             </DialogContentText>
         </DialogContent>
     </Dialog>
    )
}

export default VideoDialog
