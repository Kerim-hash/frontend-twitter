import React, { ReactElement } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import VideoChat from '../videoSidebar';
import { UserType } from '../../../../store/ducks/user/contracts/state';
interface VideoDialogProps {
    open: boolean,
    setOpenVideoChat: (boolean) => void,
    user: UserType,
    participantID: string,
    receiverId: string, 
    senderID: string,
}

const VideoDialog: React.FC<VideoDialogProps> = ({open, setOpenVideoChat,user, participantID, receiverId, senderID }: VideoDialogProps): ReactElement=> {
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
              <VideoChat  user={user} participantID={participantID} receiverId={receiverId} senderID={senderID} />
             </DialogContentText>
         </DialogContent>
     </Dialog>
    )
}

export default VideoDialog
