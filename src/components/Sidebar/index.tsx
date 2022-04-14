import React, { useState } from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import { ModalBlock } from '../Modal';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import { AddTweetForm } from '../AddTweetForm';
import { useStylesSidebar } from './theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from '../../store/ducks/user/selectors'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { signOut } from '../../store/ducks/user/actions'
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material';
import AvatarComponent from '../avatar';
export const Sidebar: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch()
    const classes = useStylesSidebar()
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const user = useSelector(selectData)
    const [visibleAddTweetModal, setVisibleAddTweetModal] = useState<boolean>(false)

    const handleToggleClick = () => {
        setVisibleAddTweetModal(!visibleAddTweetModal)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickProfile = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOutClick = () => {
        dispatch(signOut())
    }
    
    return (
        <div>
            <div className={classes.wrapper}>
                <ul className={classes.sidebarList}>
                    <li>
                        <Link to="/home">
                            <IconButton color="primary">
                                <TwitterIcon fontSize="large" className={classes.logo} color="primary" />
                            </IconButton>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to="/home">
                            <img src="https://cdn3.iconfinder.com/data/icons/twitter-20/512/165_Birdhouse_Tweet_Twitter-512.png" alt="home" className={classes.icon} />
                         
                            <Hidden lgDown>
                                <Typography variant="h6">Главная</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div>
                        <img src="https://cdn3.iconfinder.com/data/icons/twitter-20/512/162_Follow_Hash_tag_Tweet_Twitter-512.png" alt="explore" className={classes.icon} />
                            <Hidden lgDown>
                                <Typography variant="h6">Обзор</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/video`}>
                            <img src="https://cdn3.iconfinder.com/data/icons/twitter-20/512/167_Bell_Sign_Twitter-512.png" alt="notifications" className={classes.icon} />
                            <Hidden lgDown>
                                <Typography variant="h6">Уведомления</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/messages`}>
                            <img src="https://cdn3.iconfinder.com/data/icons/twitter-20/512/168_Twitter_Mail_Sms_Chat-256.png" alt="messages" style={{width:24, height: 26}} />
                           
                            <Hidden lgDown>
                                <Typography variant="h6">Сообщения</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/home/bookmarks`}>
                            <img src="https://cdn0.iconfinder.com/data/icons/basic-ui-108/24/Save-256.png" alt="bookmarks" style={{width:24, height: 26}} />
                            <Hidden lgDown>
                                <Typography variant="h6">Закладки</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div>
                        <img src="https://cdn3.iconfinder.com/data/icons/twitter-20/512/152_Twitter_Text_Chat-512.png" alt="list" className={classes.icon} />
                            <Hidden lgDown>
                                <Typography variant="h6">Списки</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/home/profile/${user._id}`}>
                            <img src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/user4-256.png" alt="home" className={classes.icon} />
                            <Hidden lgDown>
                                <Typography variant="h6">Профиль</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div>
                        <img src="https://cdn2.iconfinder.com/data/icons/essential-web-5/50/more-dot-tripple-circle-detail-256.png" alt="home" className={classes.icon} />
                            <Hidden lgDown>
                                <Typography variant="h6">Еще</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Button onClick={handleToggleClick} variant="contained" fullWidth >{matches ? 'Твитнуть' : <AddIcon />}</Button>
                    </li>
                </ul>

                <Box className={classes.profile} onClick={handleClickProfile}>
                    <Box display="flex" alignItems="center">
                       <AvatarComponent size={34} user={user} />
                        {matches && <div className={classes.profileInfo}>
                            <Typography variant="body1" style={{ fontSize: 14, fontWeight: 500 }}>{user.fullname}</Typography>
                            <Typography variant="body2" className={classes.tweetUserName} >@{user.username}</Typography>
                        </div>}
                    </Box>
                    {matches && <MoreHorizIcon sx={{marginLeft: '80px'}}/>}
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: -2,
                            padding: '9px 9px',
                            borderRadius: '20px',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: -14,
                                left: '50%',
                                width: 15,
                                height: 15,
                                bgcolor: 'background.paper',
                                transform: 'translate(-50%, -50%)rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    className={classes.menuWrapper}

                >
                    <MenuItem className={classes.menuItem}>
                        <Link to={`/home/profile/${user._id}`}>
                            <Avatar /> Profile
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => signOutClick()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                                 Logout
                        </MenuItem>
                </Menu>

            </div>


            <ModalBlock title="" visible={visibleAddTweetModal} onClose={handleToggleClick}>
                <div style={{ width: 540 }}>
                    <AddTweetForm maxRows={15} minRows={4} />
                </div>
            </ModalBlock>
        </div>
    )
}

