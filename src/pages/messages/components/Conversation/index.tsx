import React, { ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useStylesMessageUser } from './theme'
import { istance } from '../../../../core/axios';
import { ConversationType } from '../../../../store/ducks/Messages/contracts/state'
import { UserType } from '../../../../store/ducks/user/contracts/state';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../store/ducks/user/selectors';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
interface conversationProps {
    conversations?: ConversationType,
    currentUser?: string,
    setCurrentChat?: any,
    index: number,
    onlineUsers: any[]
}

const Conversation: React.FC<conversationProps> = ({ setCurrentChat, conversations, onlineUsers, index, }: conversationProps): ReactElement => {
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


    React.useEffect(() => {
        const friendId = conversations && conversations.members.find(m => m !== userData._id)
        const getUser = async () => {
            try {
                const res = await istance.get(`users/withoutDetails/${friendId}`)
                setUser(res.data.data)
            } catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [userData, conversations])


    console.log(conversations);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));




    return (
        <Box className={classes.wrapper}>
            <Box className={classes.item}>
                {user?._id === onlineUsers[index]?.userId ? <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="M.D" src="https://twitter.com/DavidWells/photo" />
                </StyledBadge> : <Avatar alt="M.D" src="https://twitter.com/DavidWells/photo" />}
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
                <MoreHorizOutlinedIcon />
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

export default React.memo(Conversation)
