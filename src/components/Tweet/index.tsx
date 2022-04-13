import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import RepeatIcon from '@mui/icons-material/RepeatRounded';
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { formaDate } from '../../utils/formatDate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TweetStyle } from './style';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookmarks, fetchDeleteTweet, fetchLikeToggleTweet, setBookmarksState } from '../../store/ducks/tweets/actionCreators';
import { selectData } from '../../store/ducks/user/selectors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImgList from '../imgList';
import Carousel, { Modal, ModalGateway } from 'react-images'
import { BookmarksState, Comment, Tweet } from '../../store/ducks/tweets/contracts/state';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import { istance } from '../../core/axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { selectBookmarksState } from '../../store/ducks/tweets/selectors';
import AvatarComponent from '../avatar';
import { UserType } from '../../store/ducks/user/contracts/state';

interface TweetProps {
    user?: UserType,
    createdAt?: string,
    text?: string | any
    _id: string,
    images?: string[] | any,
    likes?: string[],
    comment?: string[] | Comment[],
    fullname?: string,
    username?: string,
    bookmarks?: string[] | Tweet[]
}

export const TweetComponent: React.FC<TweetProps> = ({ text, user, _id, createdAt, images, likes, comment, fullname, username, bookmarks}: TweetProps): React.ReactElement => {
    const classes = TweetStyle()
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userData = useSelector(selectData)
    const bookmarksStateData = useSelector(selectBookmarksState)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [shareEl, setShareEl] = React.useState<null | HTMLElement>(null);
    const shareOpen = Boolean(shareEl);

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleCloseShare = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setShareEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setShareEl(event.currentTarget);
    };

    const deleteTweetById = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchDeleteTweet(_id))
    }
    const onClickLike = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchLikeToggleTweet({ id: _id, userID: userData._id, liked: likes?.includes(userData._id)}))
    }

    const [toggle, setToggle] = React.useState<boolean>(false);
    const [sIndex, setSIndex] = React.useState<number>(0);

    // alert
    const [snackbarState, setSnackbarState] = React.useState<{ text: string, type: 'error' | 'info' }>()


    React.useEffect(() => {
        if (bookmarksStateData === BookmarksState.BOOKMARKSED) {
            setSnackbarState({ text: 'Твит добавлен в закладки', type: 'info' })
        }
        else if (bookmarksStateData === BookmarksState.UNBOOKMARKSED) {
            setSnackbarState({ text: 'Твит удален из закладок', type: 'info' })
        }

    }, [bookmarksStateData])

    const handleCloseAlert = (event) => {
        event.preventDefault()
        event.stopPropagation();
        // dispatch(setBookmarksState(BookmarksState.NEVER))
    }

    // Handler
    const handleClicToggleModal = (event: React.MouseEvent<HTMLElement> | React.SyntheticEvent<HTMLButtonElement>, i?: number) => {
        event.preventDefault()
        event.stopPropagation();
        setToggle(!toggle)
        i && setSIndex(i)
    }

    const imagesList = images && images.map((obj: any) => ({
        source: obj.url ? obj.url : obj
    }));

    const copyShare = (event) => {
        event.preventDefault()
        event.stopPropagation();
        navigator.clipboard.writeText(`${window.location.href}/tweet/${_id}`)
        setShareEl(null);
    }

    const navigateToTweet = () => {
        !fullname && navigate(`/home/tweet/${_id}`)
    }

    const navigateToProfile = (event) => {
        event.preventDefault()
        event.stopPropagation();
        navigate(`/home/profile/${user._id}`)
    }

    const bookmarksAdd = (event) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchBookmarks({ userID: user?._id, tweetID: _id }))
    }
    const bookmarksRemove = (event) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchBookmarks({ userID: user?._id, tweetID: _id }))
    }

    console.log(user)
    return (
        <div onClick={() => navigateToTweet()} >
            <Snackbar open={bookmarksStateData === BookmarksState.BOOKMARKSED || bookmarksStateData === BookmarksState.UNBOOKMARKSED} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity={snackbarState?.type} sx={{ width: '100%' }}>
                    {snackbarState?.text}
                </Alert>
            </Snackbar>
            <Paper variant="outlined" className={classNames(classes.tweet)}>

                <AvatarComponent fullname={fullname} user={user}  />

                <Box style={{ marginLeft: 20, flex: 1, maxWidth: '75%' }}>
                    <div onClick={navigateToProfile} className={classes.tweetsHeaderLink}><Typography variant="body1">{user?.fullname ? user?.fullname : fullname} </Typography><Typography variant="body2" className={classes?.tweetUserName}>@{user?.username ? user?.username : username }</Typography><span>·</span><Typography variant="caption" className={classes.tweettimeUploded}>{formaDate(new Date(createdAt))}</Typography></div>
                    <Typography variant="body2" color="text.primary" style={{ marginTop: 5, wordBreak: 'break-word' }}>
                        {text}
                    </Typography>
                    <Box>
                        {images && <ImgList images={images} setToggle={handleClicToggleModal} />}

                        <ModalGateway>
                            {toggle ? (
                                <Modal onClose={handleClicToggleModal} >
                                    <Carousel currentIndex={sIndex} views={imagesList} />
                                </Modal>
                            ) : null}
                        </ModalGateway>

                    </Box>

                    {!fullname && <Box className={classes.tweetActions}>
                        <div>
                            <IconButton>
                                <ModeCommentOutlinedIcon sx={{ ":hover": { color: '#3CA3F1' } }} className={classes.icon} />
                            </IconButton>
                            <span>{comment?.length}</span>
                        </div>
                        <div>
                            <IconButton>
                                <RepeatIcon sx={{ ":hover": { color: '#7FDCBD' } }} className={classes.icon} />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton onClick={onClickLike}>
                                {likes?.includes(userData._id) ? <FavoriteIcon sx={{ color: '#E8467F' }} className={classes.likeIcon} /> : <LikeIcon sx={{ ":hover": { color: '#E8467F' } }} className={classes.icon} />}
                            </IconButton>
                            <span>{likes?.length}</span>
                        </div>
                        <div>
                            <IconButton onClick={handleClickShare}
                                aria-label="more"
                                id="long-button"
                                aria-controls={shareOpen ? 'long-menu' : undefined}
                                aria-expanded={shareOpen ? 'true' : undefined}
                                aria-haspopup="true">
                                <ShareIcon sx={{ ":hover": { color: '#3CA3F1' } }} className={classes.icon} />
                            </IconButton>
                        </div>
                    </Box>}

                </Box>

                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={shareEl}
                    open={shareOpen}
                    onClose={handleCloseShare}
                >
                    <MenuItem onClick={copyShare}>
                        <ContentCopyIcon style={{ marginRight: 10, fontSize: 16 }} />  Копировать ссылку на твит
                    </MenuItem>

                    {/* {bookmarksState.join() === 'false' ?
                        <MenuItem onClick={bookmarksRemove}>
                            <BookmarkRemoveOutlinedIcon style={{ marginRight: 10, fontSize: 20 }} />  Удалить твит из закладок
                        </MenuItem>
                        :
                        <MenuItem onClick={bookmarksAdd}>
                            <BookmarkAddIcon style={{ marginRight: 10, fontSize: 20 }} />  Закладка
                         </MenuItem>
                    } */}
                </Menu>

                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ height: 35, marginLeft: 'auto' }}
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
                    {userData._id === user?._id && <MenuItem onClick={(e) => deleteTweetById(e)} sx={{ color: '#EA5561' }}>
                        <DeleteOutlinedIcon sx={{ color: '#EA5561' }} />  Удалить твит
                    </MenuItem>}
                    <MenuItem onClick={handleClose}>
                        Подробнее
                    </MenuItem>
                </Menu>
            </Paper>
        </div>
    )
}