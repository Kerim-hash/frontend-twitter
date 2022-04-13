import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface ModalProps {
    title: string,
    children: React.ReactNode,
    visible?: boolean,
    onClose?: () => void
}

export const ModalBlock: React.FC<ModalProps> = ({ title, children, visible = false, onClose }): React.ReactElement | null => {{
        if(!visible){
            return null;
        }
        return (
            <Dialog open={visible} onClose={onClose}>
                <DialogTitle >
                    <IconButton style={{marginRight: 5, marginLeft: -5}}>
                        <CloseIcon onClick={onClose} />
                    </IconButton>
                    {title} </DialogTitle>
                <DialogContent dividers={true}>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }}