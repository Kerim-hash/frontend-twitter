import React, { useContext, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchTweet, setTweet } from '../../../../store/ducks/tweets/actionCreators'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import RepeatIcon from '@mui/icons-material/RepeatRounded';
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import ruLand from 'date-fns/locale/ru'
import { TweetStyle } from '../../../../components/Tweet/style'
import ImgList from '../../../../components/imgList'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { selectIsTweetLoaded, selectTweetData } from '../../../../store/ducks/tweets/selectors'
import { fetchLikeToggleTweet } from '../../../../store/ducks/tweets/actionCreators'
import { selectData } from '../../../../store/ducks/user/selectors'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddCommentForm } from '../../../../components/addCommentForm'
import { TweetComponent } from '../../../../components/Tweet'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AvatarComponent from '../../../../components/avatar'
import BackButton from '../../../../components/BackButton'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse';
import { SocketContext } from '../../../../Context'

export const FullTweet: React.FC = (): React.ReactElement | null => {
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext);
    const params: { id?: string } = useParams()
    const userData = useSelector(selectData)
    const [shareEl, setShareEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        dispatch(fetchTweet(params.id || ""))
        return () => {
            dispatch(setTweet(undefined))
        }
    }, [dispatch, params.id])

    const tweetData = useSelector(selectTweetData)
    const loaded = useSelector(selectIsTweetLoaded)
    const classes = TweetStyle()
    const [toggle, setToggle] = useState<boolean>(false);
    const [sIndex, setSIndex] = useState<number>(0);

    if (!tweetData || !loaded) {
        return <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div>
    }

    // Handler
    const handleClicToggleModal = (event: React.MouseEvent<HTMLElement> | React.SyntheticEvent<HTMLButtonElement>, i?: number) => {
        event.preventDefault()
        event.stopPropagation();
        setToggle(!toggle)
        i && setSIndex(i)
    }

    const onClickLike = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchLikeToggleTweet({ id: tweetData?._id, userID: userData?._id, liked: !tweetData.likes.includes(userData?._id) }))
        tweetData.likes?.includes(userData._id) || tweetData.user._id !== userData._id && socket.emit("sendNotification", {
            senderName: userData.username,
            receiverID: tweetData.user._id,
            type: 1,
            tweetId: tweetData._id,
            avatar: userData.avatar
        });
    }

    const imagesList = tweetData.images.map((obj: any) => ({
        source: obj.url ? obj.url : obj
    }));



    const shareOpen = Boolean(shareEl);

    const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setShareEl(event.currentTarget);
    };
    const handleCloseShare = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        setShareEl(null);
    };

    const copyShare = (event) => {
        event.preventDefault()
        event.stopPropagation();
        navigator.clipboard.writeText(`${window.location.href}`)
        setShareEl(null);
    }

    return (
        <Box style={{ width: '-webkit-fill-available', minHeight: '100vh' }}>
            <div style={{ padding: 10, display: "flex", alignItems: 'center', top: 0, backdropFilter: 'blur(9px)', position: 'sticky', zIndex: 1 }} >
                <BackButton /> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>Твит</Typography>
            </div>
            <Box style={{ width: '-webkit-fill-available', padding: '20px 13px' }}>
                <Link to={`/profile/${tweetData.user._id}`} className={classes.tweetsHeaderLink}>
                    <AvatarComponent user={tweetData.user} />
                    <Box className={classes.tweetFullHeader}><Typography variant="body1">{tweetData.user.fullname}</Typography><Typography variant="body2" className={classes.tweetFullUserName}>@{tweetData.user.username}</Typography></Box>
                </Link>

                <Box style={{ marginBottom: 20 }}>
                    <p className={classes.tweetFullDescription}>
                        {tweetData.text}
                    </p>


                    {tweetData.images && <ImgList images={tweetData.images} setToggle={handleClicToggleModal} />}

                    <ModalGateway>
                        {toggle ? (
                            <Modal onClose={handleClicToggleModal} >
                                <Carousel currentIndex={sIndex} views={imagesList} />
                            </Modal>
                        ) : null}
                    </ModalGateway>

                    <Box display="flex" >
                        <Typography variant="body1" color={'#7F8C95'}>{format(new Date(tweetData.createdAt), 'H:mm ', { locale: ruLand })}</Typography>
                        <Typography variant="body1" color={'#7F8C95'} style={{ marginLeft: 3 }}>{format(new Date(tweetData.createdAt), 'dd MMM yyyy г.', { locale: ruLand })}</Typography>
                    </Box>

                    <Box className={classes.tweetActions} style={{ maxWidth: '100%', borderTop: '1px solid #EFF3F4', borderBottom: '1px solid #EFF3F4', padding: '7px 40px' }}>
                        <div>
                            <IconButton>
                                <ModeCommentOutlinedIcon sx={{ ":hover": { color: '#3CA3F1' } }} />
                            </IconButton>
                            <span>{tweetData.comment?.length}</span>
                        </div>
                        <div>
                            <IconButton>
                                <RepeatIcon sx={{ ":hover": { color: '#7FDCBD' } }} />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton onClick={onClickLike}>
                                {tweetData.likes.includes(userData?._id) ? <FavoriteIcon sx={{ color: '#E8467F' }} /> : <LikeIcon sx={{ ":hover": { color: '#E8467F' } }} />}
                            </IconButton>
                            <span>{tweetData.likes.length}</span>
                        </div>
                        <div>
                            <IconButton onClick={handleClickShare}
                                aria-label="more"
                                id="long-button"
                                aria-controls={shareOpen ? 'long-menu' : undefined}
                                aria-expanded={shareOpen ? 'true' : undefined}
                                aria-haspopup="true">
                                <ShareIcon sx={{ ":hover": { color: '#3CA3F1' } }} />
                            </IconButton>
                        </div>
                    </Box>

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

                </Menu>
                <AddCommentForm id={params.id} fullname={userData?.fullname} username={userData?.username} avatar={userData?.avatar} socket={socket} receiverID={tweetData.user._id} />

            </Box>
            {Array.isArray(tweetData.comment) && <TransitionGroup style={{ display: 'flex', flexDirection: 'column-reverse' }}>{tweetData.comment.map((item) => {
                return <Collapse key={item._id} >
                    <TweetComponent
                        _id={item._id}
                        text={item.text}
                        createdAt={item.createdAt}
                        images={item?.images}
                        username={item.username}
                        avatar={item.avatar}
                        fullname={item.fullname}
                        user={item.user}
                    />
                </Collapse>
            })}
            </TransitionGroup>}
        </Box>
    )
}



