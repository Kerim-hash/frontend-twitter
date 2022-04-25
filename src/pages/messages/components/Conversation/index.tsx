import React, { ReactElement } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useStylesMessageUser } from './theme'
import { istance } from '../../../../core/axios';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from '../../../../store/ducks/user/selectors';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AvatarComponent from '../../../../components/avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { FetchDeleteConversation } from '../../../../store/ducks/Messages/actions';

interface conversationProps {
    conversations?: {
        _id: string,
        members: string[],
        createdAt: string,
        updatedAt: string,
    },
    currentUser?: string,
    setCurrentChat?: any,
    index: number,
    onlineUsers: any[],
}

const Conversation: React.FC<conversationProps> = ({ setCurrentChat, conversations, onlineUsers, index}: conversationProps): ReactElement => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
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


    // console.log(conversations.members)
    React.useEffect(() => {
        const friendId = conversations && conversations.members?.find(m => m !== userData._id)
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


    const deleteConversation = async (id: string) => {
        await dispatch(FetchDeleteConversation({ id }))
        navigate('/messages')
    }
    
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
        <NavLink to={`/messages/${conversations._id}`} className={classes.wrapper}>
            <Box className={classes.item}>
                {onlineUsers?.map(item => item.userId)?.includes(user?._id) ? <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                   <AvatarComponent user={user} />
                </StyledBadge> :  <AvatarComponent user={user} />}
                <Box>
                <Typography variant="body1" color="text.secondary" className={classes.username}>{user?.fullname}</Typography>
                <Typography variant="body2" color="text.grey.light"  className={classes.username}>@{user?.username}</Typography>
                </Box>
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
                <MenuItem sx={{ color: '#EA5561' }} onClick={(e) => deleteConversation(conversations?._id)}>
                    <DeleteOutlinedIcon sx={{ color: '#EA5561' }} />  Удалить переписку
                </MenuItem>
            </Menu>
        </NavLink>
    )
}

export default React.memo(Conversation)
