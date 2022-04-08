import React, { ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useStylesMessageUser } from './theme'
import { istance } from '../../../../core/axios';
import {ConversationType} from '../../../../store/ducks/Messages/contracts/state'
import { UserType } from '../../../../store/ducks/user/contracts/state';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../store/ducks/user/selectors';

interface conversationProps {
    conversations?: ConversationType,
    currentUser?: string,
    setCurrentChat?: any
}

const Conversation: React.FC<conversationProps> = ({setCurrentChat, conversations}: conversationProps): ReactElement => {
    const classes = useStylesMessageUser()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<UserType>(null)
    const userData = useSelector(selectData)
    const open = Boolean(anchorEl);

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };


     React.useEffect( () => {
        const friendId = conversations && conversations.members.find(m => m !== userData._id) 
        const getUser = async () => {
            try{
                const res = await istance.get(`users/withoutDetails/${friendId}`)
                setUser(res.data.data)
            }catch(e){
                console.log(e)
            }
        }
        getUser()
    }, [userData, conversations])


console.log(conversations);



    return (
        <Box  className={classes.wrapper}>
            <Box className={classes.item}>
            <Avatar alt="M.D" src="https://twitter.com/DavidWells/photo" />
            <Typography variant="body1" className={classes.username}>{user?.username}</Typography>
            </Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                className={classes.menuIcon}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
               
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem sx={{ color: '#EA5561' }}>
                    <DeleteOutlinedIcon sx={{ color: '#EA5561' }} />  Удалить переписку
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default  React.memo(Conversation) 
