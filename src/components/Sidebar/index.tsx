import React, { useState } from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { ModalBlock } from '../Modal';
import { Link } from 'react-router-dom'
import { AddTweetForm } from '../AddTweetForm';
import { useStylesSidebar } from './theme';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { signOut } from '../../store/ducks/user/actions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material';
import AvatarComponent from '../avatar';
import { selectIsTweetAdded } from '../../store/ducks/tweets/selectors';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import SettingTheme from './setting';
import { UserType } from '../../store/ducks/user/contracts/state';

interface sidebarProps {
    user: UserType
}

const Sidebar: React.FC<sidebarProps> = ({ user }: sidebarProps): React.ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesSidebar()
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));


    const stateForm = useSelector(selectIsTweetAdded)

    const [visibleAddTweetModal, setVisibleAddTweetModal] = useState<boolean>(false)
    const handleToggleClick = () => {
        setVisibleAddTweetModal(!visibleAddTweetModal)
    }
    const [visibleSettingTheme, setVisibleSettingTheme] = useState<boolean>(false)
    const handleToggleSettingTheme = () => {
        setVisibleSettingTheme(!visibleSettingTheme)
        visibleSettingTheme === true && setMoreEl(false)
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClickProfile = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [moreEL, setMoreEl] = React.useState(null);
    const openMore = Boolean(moreEL);
    const handleClickMore = (event) => {
        setMoreEl(event.currentTarget);
    };
    const handleCloseMore = () => {
        setMoreEl(null);
    };

    const signOutClick = () => {
        dispatch(signOut())
    }

    React.useEffect(() => {
        if (stateForm) {
            setVisibleAddTweetModal(null)
        }
    }, [stateForm])

    return (
        <>
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
                            <svg width="24" height="22" className={classes.icon} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.58 6.34999L12.475 0.896993C12.178 0.736993 11.821 0.736993 11.525 0.896993L1.425 6.34999C0.938999 6.61399 0.757999 7.21999 1.02 7.70599C1.2 8.04099 1.545 8.23099 1.9 8.23099C2.06 8.23099 2.224 8.19299 2.375 8.11099L3.109 7.71499L4.699 18.965C4.915 20.179 6.009 21.027 7.359 21.027H16.641C17.991 21.027 19.085 20.179 19.303 18.939L20.891 7.71399L21.628 8.11199C22.113 8.37499 22.72 8.19399 22.982 7.70799C23.245 7.22199 23.062 6.61499 22.578 6.35299L22.58 6.34999ZM12 14.435C10.205 14.435 8.75 12.98 8.75 11.185C8.75 9.38999 10.205 7.93499 12 7.93499C13.795 7.93499 15.25 9.38999 15.25 11.185C15.25 12.98 13.795 14.435 12 14.435Z" fill="#fff" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Главная</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div>
                            <svg width="20" height="20" className={classes.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 5.337H15.07L15.442 1.065C15.478 0.652997 15.172 0.289997 14.76 0.252997C14.343 0.222997 13.984 0.522997 13.948 0.935997L13.565 5.336H7.245L7.615 1.066C7.652 0.652997 7.345 0.289997 6.935 0.252997C6.515 0.222997 6.158 0.522997 6.122 0.935997L5.74 5.336H1.782C1.368 5.336 1.032 5.673 1.032 6.086C1.032 6.499 1.368 6.836 1.782 6.836H5.61L5.06 13.163H1C0.586 13.163 0.25 13.499 0.25 13.913C0.25 14.327 0.586 14.663 1 14.663H4.93L4.558 18.935C4.522 19.347 4.828 19.71 5.24 19.747L5.306 19.75C5.691 19.75 6.018 19.455 6.052 19.064L6.435 14.664H12.755L12.385 18.934C12.349 19.347 12.655 19.71 13.067 19.747L13.133 19.75C13.518 19.75 13.845 19.455 13.879 19.064L14.261 14.664H18.218C18.631 14.664 18.968 14.327 18.968 13.914C18.968 13.501 18.631 13.164 18.218 13.164H14.39L14.94 6.837H19C19.414 6.837 19.75 6.501 19.75 6.087C19.75 5.673 19.414 5.337 19 5.337ZM12.885 13.163H6.565L7.115 6.837H13.435L12.885 13.163Z" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Обзор</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/video`}>
                            <svg width="20" height="21" className={classes.icon} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.697 15.468C19.677 15.452 17.557 13.828 17.594 9.438C17.614 6.906 16.782 4.656 15.247 3.103C13.872 1.71 12.01 0.94 10.005 0.93H9.992C7.988 0.94 6.126 1.71 4.75 3.104C3.216 4.657 2.382 6.906 2.404 9.438C2.441 13.768 0.384001 15.405 0.302002 15.468C0.0420015 15.661 -0.0639986 15.998 0.0370014 16.306C0.139001 16.614 0.427002 16.821 0.749002 16.821H5.669C5.771 19.131 7.666 20.981 9.999 20.981C12.332 20.981 14.225 19.131 14.326 16.821H19.248C19.57 16.821 19.858 16.615 19.958 16.307C20.061 16 19.955 15.662 19.695 15.469L19.697 15.468ZM10 19.478C8.495 19.478 7.27 18.301 7.172 16.82H12.828C12.728 18.3 11.505 19.48 10 19.48V19.478ZM2.38 15.32C3.12 14.188 3.928 12.292 3.904 9.424C3.886 7.264 4.548 5.442 5.817 4.157C6.91 3.05 8.397 2.437 10 2.43C11.603 2.438 13.087 3.05 14.18 4.158C15.45 5.443 16.113 7.264 16.095 9.425C16.071 12.293 16.88 14.19 17.62 15.321H2.38V15.32Z" fill="#D9D9D9" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Уведомления</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/messages`}>
                            <svg width="20" height="19" className={classes.icon} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.25 0.0180016H2.75C1.233 0.0180016 0 1.252 0 2.77V15.265C0 16.783 1.233 18.018 2.75 18.018H17.25C18.767 18.018 20 16.783 20 15.265V2.77C20 1.252 18.767 0.0180016 17.25 0.0180016ZM2.75 1.518H17.25C17.94 1.518 18.5 2.078 18.5 2.768V3.482L10.45 8.849C10.177 9.029 9.824 9.031 9.55 8.847L1.5 3.482V2.768C1.5 2.078 2.06 1.518 2.75 1.518ZM17.25 16.516H2.75C2.06 16.516 1.5 15.956 1.5 15.266V5.24L8.74 10.07C9.123 10.326 9.562 10.454 10 10.454C10.44 10.454 10.877 10.326 11.26 10.071L18.5 5.241V15.263C18.5 15.953 17.94 16.513 17.25 16.513V16.516Z" fill="#D9D9D9" />
                            </svg>


                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Сообщения</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/bookmarks`}>
                            <svg width="18" height="21" className={classes.icon} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.9 20.5C16.743 20.5 16.588 20.45 16.458 20.356L9 14.928L1.542 20.358C1.314 20.522 1.012 20.548 0.759999 20.418C0.509999 20.291 0.349998 20.033 0.349998 19.751V2.6C0.349998 1.36 1.36 0.35 2.6 0.35H15.398C16.638 0.35 17.648 1.36 17.648 2.6V19.75C17.648 20.032 17.49 20.29 17.238 20.418C17.132 20.473 17.015 20.5 16.898 20.5H16.9ZM9 13.25C9.155 13.25 9.31 13.298 9.44 13.394L16.15 18.277V2.6C16.15 2.188 15.813 1.85 15.4 1.85H2.6C2.187 1.85 1.85 2.188 1.85 2.6V18.277L8.56 13.394C8.69 13.298 8.845 13.25 9 13.25Z" fill="#D9D9D9" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Закладки</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div>
                            <svg width="20" height="20" className={classes.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.75 20H2.25C1.01 20 0 18.99 0 17.75V2.25C0 1.01 1.01 0 2.25 0H17.75C18.99 0 20 1.01 20 2.25V17.75C20 18.99 18.99 20 17.75 20ZM2.25 1.5C1.836 1.5 1.5 1.837 1.5 2.25V17.75C1.5 18.163 1.836 18.5 2.25 18.5H17.75C18.164 18.5 18.5 18.163 18.5 17.75V2.25C18.5 1.837 18.164 1.5 17.75 1.5H2.25Z" fill="#D9D9D9" />
                                <path d="M15 6.64H5C4.586 6.64 4.25 6.303 4.25 5.89C4.25 5.477 4.586 5.14 5 5.14H15C15.414 5.14 15.75 5.475 15.75 5.89C15.75 6.305 15.414 6.64 15 6.64ZM15 10.75H5C4.586 10.75 4.25 10.414 4.25 10C4.25 9.586 4.586 9.25 5 9.25H15C15.414 9.25 15.75 9.586 15.75 10C15.75 10.414 15.414 10.75 15 10.75ZM10 14.86H5C4.586 14.86 4.25 14.525 4.25 14.11C4.25 13.695 4.586 13.36 5 13.36H10C10.414 13.36 10.75 13.697 10.75 14.11C10.75 14.523 10.414 14.86 10 14.86Z" fill="#D9D9D9" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Списки</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={`/profile/${user?._id}`}>
                            <svg width="18" height="21" className={classes.icon} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 10.816C10.355 10.816 11.872 10.666 12.84 9.56C13.654 8.63 13.918 7.192 13.646 5.168C13.266 2.343 11.529 0.655998 9 0.655998C6.471 0.655998 4.734 2.343 4.354 5.17C4.082 7.192 4.346 8.63 5.16 9.56C6.128 10.667 7.645 10.816 9 10.816V10.816ZM5.84 5.368C6.002 4.168 6.627 2.156 9 2.156C11.373 2.156 11.998 4.169 12.16 5.368C12.367 6.918 12.217 7.995 11.71 8.573C11.255 9.093 10.444 9.316 9 9.316C7.556 9.316 6.745 9.093 6.29 8.573C5.783 7.995 5.633 6.917 5.84 5.368ZM17.28 18.236C16.403 14.71 12.998 12.246 9 12.246C5.002 12.246 1.597 14.71 0.720001 18.236C0.548001 18.928 0.692 19.636 1.115 20.176C1.523 20.696 2.155 20.996 2.848 20.996H15.152C15.845 20.996 16.477 20.696 16.885 20.176C17.309 19.636 17.452 18.929 17.279 18.236H17.28ZM15.704 19.252C15.578 19.412 15.388 19.498 15.152 19.498H2.848C2.613 19.498 2.422 19.413 2.296 19.252C2.159 19.078 2.116 18.84 2.176 18.598C2.886 15.743 5.693 13.748 9 13.748C12.307 13.748 15.114 15.742 15.824 18.598C15.884 18.84 15.841 19.078 15.704 19.252V19.252Z" fill="#D9D9D9" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Профиль</Typography>
                            </Hidden>
                        </Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <div onClick={(e) => handleClickMore(e)}>
                            <svg width="24" height="24" className={classes.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z" fill="#D9D9D9" />
                                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="#D9D9D9" />
                                <path d="M7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5Z" fill="#D9D9D9" />
                                <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12C1.25 6.072 6.072 1.25 12 1.25C17.928 1.25 22.75 6.072 22.75 12C22.75 17.928 17.928 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="#D9D9D9" />
                            </svg>

                            <Hidden mdDown>
                                <Typography variant="h6" color="text.secondary">Еще</Typography>
                            </Hidden>
                        </div>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Button onClick={handleToggleClick} variant="contained" fullWidth style={{minWidth: !matches && '15px' }}>{matches ? 'Твитнуть' : <svg width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.7764 3.02957C3.97191 3.02957 4.13041 3.18806 4.13041 3.38357V5.86163H6.60846C6.80397 5.86163 6.96247 6.02012 6.96247 6.21563C6.96247 6.41115 6.80397 6.56964 6.60846 6.56964H4.13041V9.0477C4.13041 9.24321 3.97191 9.4017 3.7764 9.4017C3.58089 9.4017 3.42239 9.24321 3.42239 9.0477V6.56964H0.94434C0.748827 6.56964 0.590332 6.41115 0.590332 6.21563C0.590332 6.02012 0.748827 5.86163 0.94434 5.86163L3.42239 5.86163V3.38357C3.42239 3.18806 3.58089 3.02957 3.7764 3.02957Z" fill="white" />
                            <path d="M20.9322 0.551471C7.4254 3.25282 3.20454 16.3094 2.36037 22.4999C4.89289 13.2141 9.95792 12.3699 12.4904 12.3699C15.023 12.3699 17.5555 9.83736 15.8671 9.83736C13.275 9.83736 12.7169 8.14902 13.3346 8.14902C21.4387 6.79834 24.511 -0.164254 20.9322 0.551471Z" fill="white" />
                        </svg>
                        }</Button>
                    </li>
                </ul>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={moreEL}
                    open={openMore}
                    PaperProps={{
                        sx: {
                            borderRadius: '10px',
                        },
                    }}
                    onClose={handleCloseMore}
                    transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <MenuItem onClick={handleToggleSettingTheme}><FormatColorFillIcon sx={{ marginRight: '10px' }} /> Оформление</MenuItem>
                </Menu>
                <Box className={classes.profile} onClick={handleClickProfile}>
                    {user && <Box display="flex" alignItems="center">
                        <AvatarComponent size={34} user={user} />
                        {matches && <div className={classes.profileInfo}>
                            <Typography variant="body1" color="text.secondary" style={{ fontSize: 14, fontWeight: 500 }}>{user.fullname}</Typography>
                            <Typography variant="body2" className={classes.tweetUserName} >@{user.username}</Typography>
                        </div>}
                    </Box>}
                    {matches && <MoreHorizIcon sx={{ marginLeft: '80px' }} />}
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
                            maxWidth: 250,
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
                        <Link to={`/profile/${user?._id}`}>
                            <Avatar /> Профиль
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => signOutClick()} className={classes.menuItem}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                                 Выйти
                        </MenuItem>
                </Menu>

            </div>

            <SettingTheme handleToggleClick={handleToggleSettingTheme} visibleAddTweetModal={visibleSettingTheme} />

            <ModalBlock title="" visible={visibleAddTweetModal} onClose={handleToggleClick}>
                <div style={{ width: 540 }}>
                    <AddTweetForm maxRows={15} minRows={4} />
                </div>
            </ModalBlock>
        </>
    )
}


export default React.memo(Sidebar)