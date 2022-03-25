import React, {useState} from 'react'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsTweetLoaded, selectTweetData } from '../../../store/ducks/tweet/selectors'
import { useParams } from 'react-router'
import { fetchTweet, setTweet } from '../../../store/ducks/tweet/actionCreators'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import RepeatIcon from '@mui/icons-material/RepeatRounded';
import classNames from 'classnames'
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import ruLand from 'date-fns/locale/ru'
import { TweetStyle } from '../../../components/Tweet/style'
import ImgList from '../../../components/imgList'
import Carousel, { Modal, ModalGateway } from 'react-images'


export const FullTweet: React.FC = (): React.ReactElement | null => {
    const dispatch = useDispatch()
    const params: { id?: string } = useParams()

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

    const imagesList = tweetData.images.map((obj: any) =>  ({
        source: obj.url ? obj.url : obj
    }));

    return (
        <>
            <Paper variant="outlined" className={classNames(classes.tweet)}>
                <Box>
                    <Box display="flex">
                        <Avatar alt={tweetData.user.avatarUrl} src="/static/images/avatar/1.jpg" />
                        <Box className={classes.tweetFullHeader}><Typography variant="body1">{tweetData.user.fullname}</Typography><Typography variant="body2" className={classes.tweetFullUserName}>@{tweetData.user.username}</Typography></Box>
                    </Box>

                    <Box>
                        <p className={classes.tweetFullDescription} >
                            {tweetData.text}
                        </p>


                        {tweetData.images && <ImgList images={tweetData.images} setToggle={handleClicToggleModal}/>}

                        <ModalGateway>
                            {toggle ? (
                                <Modal onClose={handleClicToggleModal} >
                                    <Carousel currentIndex={sIndex} views={imagesList} />
                                </Modal>
                            ) : null}
                        </ModalGateway>

                        <Box display="flex" >
                            <Typography variant="body1" color={'#7F8C95'}>{format(new Date(tweetData.createdAt), 'H:mm', { locale: ruLand })}</Typography>
                            <Typography variant="body1" color={'#7F8C95'}>{format(new Date(tweetData.createdAt), 'dd MMM yyyy г.', { locale: ruLand })}</Typography>
                        </Box>

                        <Box className={classes.tweetActions} style={{ width: 400 }}>
                            <div>
                                <IconButton>
                                    <ModeCommentOutlinedIcon />
                                </IconButton>
                                <span>5</span>
                            </div>
                            <div>
                                <IconButton>
                                    <RepeatIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <LikeIcon />
                                </IconButton>
                                <span>6</span>
                            </div>
                            <div>
                                <IconButton>
                                    <ShareIcon />
                                </IconButton>
                            </div>
                        </Box>
                    </Box>
                </Box>

            </Paper>
        </>
    )
}


