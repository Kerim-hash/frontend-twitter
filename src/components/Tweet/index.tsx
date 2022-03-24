import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import RepeatIcon from '@mui/icons-material/RepeatRounded';
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { formaDate } from '../../utils/formatDate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TweetStyle } from './style';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteTweet, fetchLikeToggleTweet } from '../../store/ducks/tweets/actionCreators';
import { selectData } from '../../store/ducks/user/selectors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImgList from '../imgList';
interface TweetProps {
    user: {
        username: string,
        fullname: string,
        avatarUrl: string,
        _id: string
    },
    createdAt: string,
    text: string
    _id: string,
    images: string[],
    likes: string[]
}

export const TweetComponent: React.FC<TweetProps> = ({ text, user, _id, createdAt, images,likes }: TweetProps): React.ReactElement => {
    const classes = TweetStyle()
    const dispatch = useDispatch()
    const userData = useSelector(selectData)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

    const deleteTweetById = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchDeleteTweet(_id))
    }

    const onClickLike = (event: React.MouseEvent<HTMLElement>) =>{
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchLikeToggleTweet({id: _id, userID: userData._id }))
    }
    console.log(likes.includes(userData._id))

    return (
        <Link to={`/home/tweet/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Paper variant="outlined" className={classNames(classes.tweet)}>
                <Avatar alt={user.fullname} src="/static/images/avatar/1.jpg" />
                <Box style={{ marginLeft: 20, flex: 1, maxWidth: '75%' }}>
                    <Box className={classes.tweetHeader}><Typography variant="body1">{user.fullname}</Typography><Typography variant="body2" className={classes.tweetUserName}>@{user.username}</Typography><span>·</span><Typography variant="caption" className={classes.tweettimeUploded}>{formaDate(new Date(createdAt))}</Typography></Box>
                    <Typography variant="body2" color="text.primary" style={{ marginTop: 5, wordBreak: 'break-word' }}>
                        {text}
                    </Typography>
                    <Box>
                    {images && <ImgList images={images} />}
                    </Box>
                    <Box className={classes.tweetActions}>
                        <div>
                            <IconButton>
                                <ModeCommentOutlinedIcon sx={{ ":hover": {color: '#3CA3F1'}} } />
                            </IconButton>
                            <span>3</span>
                        </div>
                        <div>
                            <IconButton>
                                <RepeatIcon sx={{ ":hover": {color: '#7FDCBD'}} }/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton onClick={onClickLike}>
                                {likes.includes(userData._id) ?  <FavoriteIcon sx={{color: '#E8467F'}} />:  <LikeIcon sx={{ ":hover": {color: '#E8467F'}} }/>}
                            </IconButton>
                            <span>{likes.length}</span>
                        </div>
                        <div>
                            <IconButton>
                                <ShareIcon sx={{ ":hover": {color: '#3CA3F1'}} }/>
                            </IconButton>
                        </div>
                    </Box>
                </Box>



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
                    {userData._id === user._id && <MenuItem onClick={(e) => deleteTweetById(e)} sx={{ color: '#EA5561' }}>
                        <DeleteOutlinedIcon sx={{ color: '#EA5561' }} />  Удалить твит
                    </MenuItem>}
                    <MenuItem onClick={handleClose}>
                        Подробнее
                    </MenuItem>

                </Menu>
            </Paper>
        </Link>
    )
}


