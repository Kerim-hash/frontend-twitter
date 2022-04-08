import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useStylesMessages } from '../../theme';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const MessageTop = () => {
    const classes = useStylesMessages()
    const navigate = useNavigate()

    const toUserInfo = () => {
        navigate('/messages/info')
    }

    

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{padding: '10px 10px'}}>
            <Box display="flex" alignItems="center">
            <Avatar alt="M.D" src="https://twitter.com/DavidWells/photo"  sx={{ width: 24, height: 24 }}/>
            <Box display="flex" flexDirection="column" style={{marginLeft: 10}}>
            <Typography variant="body1" className={classes.fullname}>Алёнкааа</Typography>
            <Typography variant="body2" className={classes.username}>@3_AlenKa_3</Typography>
            </Box>
            </Box>
            <IconButton onClick={toUserInfo}>
            <InfoOutlinedIcon />
            </IconButton>
        </Box>
    )
}

export default MessageTop
