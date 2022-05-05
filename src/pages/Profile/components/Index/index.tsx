import React, { useCallback } from 'react'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, useParams } from 'react-router';
import { fetchFollow, fetchProfile } from '../../../../store/ducks/user/actions';
import { selectData, selectFollowState, selectProfile } from '../../../../store/ducks/user/selectors';
import { fetchTweets } from '../../../../store/ducks/tweets/actionCreators';
import { selectIsTweetLoading, selectTweetsItems } from '../../../../store/ducks/tweets/selectors';
import { TweetComponent } from '../../../../components/Tweet';
import CircularProgress from '@mui/material/CircularProgress';
import { Tweet } from '../../../../store/ducks/tweets/contracts/state';
import BackButton from '../../../../components/BackButton';
import { NavLink } from 'react-router-dom';
import { useStylesProfile } from '../../theme';
import format from 'date-fns/format';
import ruLand from 'date-fns/locale/ru'
import Settings from '../settings';
import { ModalBlock } from '../../../../components/Modal';
import Location from '@mui/icons-material/LocationOnOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { FollowState } from '../../../../store/ducks/user/contracts/state';
const Index = () => {
    const dispatch = useDispatch()
    const classes = useStylesProfile()
    const user = useSelector(selectData)
    const profile = useSelector(selectProfile)
    const tweets = useSelector(selectTweetsItems)
    const loading = useSelector(selectIsTweetLoading)
    const params: { id?: string } = useParams()
    const followState = useSelector(selectFollowState)
    // modal 
    const [open, setOpen] = React.useState(false);

    const handleSettings = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        dispatch(fetchProfile(params.id || ""))
        dispatch(fetchTweets(params.id || ""))
    }, [dispatch, params.id])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, [value])

    const handleFollow = () => {
        dispatch(fetchFollow({ id: params.id, userID: user?._id, followState: 'follow' }))
    }
    const handleUnFollow = () => {
        dispatch(fetchFollow({ id: params.id, userID: user?._id, followState: 'unfollow' }))
    }

    return (
        <div>
            <Box display='flex' alignItems="center" style={{ padding: 10, top: 0, backdropFilter: 'blur(9px)', position: 'sticky', zIndex: 1 }} >
                <BackButton /><Box display="flex" flexDirection="column"> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>{profile?.fullname}</Typography> <Typography variant="caption" style={{ fontWeight: 300, fontSize: 14, lineHeight: 1 }}>{tweets?.length} твит</Typography></Box>
            </Box>
            <div className={classes.profileHeader} style={{backgroundImage: `url(${profile?.bgImage})`}}></div>
            <Box display='flex' justifyContent="space-between" style={{ padding: '0 15px', position: 'relative' }}>
               {profile !== undefined &&  <Box className={classes.profileInfo}>
                    <Avatar className={classes.avatar} src={profile.avatar} />
                    <Typography variant="body1" style={{ fontWeight: 800, fontSize: 20, marginTop: 25 }}>{profile?.fullname}</Typography>
                    <Typography variant="caption" style={{ fontWeight: 500, fontSize: 14, color: '#536471', lineHeight: 1, }}>@{profile?.username}</Typography>
                    <Typography variant="caption" style={{ fontWeight: 500, fontSize: 14, marginTop: 15 }}>{profile?.about}</Typography>
                    <Box display="flex" alignItems="center" style={{ marginTop: 15 }} > <EventOutlinedIcon sx={{ fill: '#536471', marginRight: '5px', fontSize: 18 }} /><Typography variant="caption" style={{ fontWeight: 400, fontSize: 14, color: '#536471' }}>Регистрация: {profile?.createdAt && format(new Date(profile?.createdAt), 'MMMM yyyy г.', { locale: ruLand })}</Typography></Box>
                    {profile.location && <Box display="flex" alignItems="center" style={{ marginTop: 15 }} > <Location sx={{ fill: '#536471', marginRight: '5px', fontSize: 18 }} /><Typography variant="caption" style={{ fontWeight: 400, fontSize: 14, color: '#536471' }}>{profile.location}</Typography></Box>}
                    {profile?.website && <Box display="flex" alignItems="center" style={{ marginTop: 15 }} > <PublicOutlinedIcon sx={{ fill: '#536471', marginRight: '5px', fontSize: 18 }} /><Typography variant="caption" style={{ fontWeight: 400, fontSize: 14, color: '#536471' }}><a style={{ color: "#359BF0" }} href={profile.website}  target="_blank" rel="noopener noreferrer">{profile.website}</a></Typography></Box>}
                    <Box display="flex" alignItems="center" style={{ marginTop: 15 }} ><NavLink className={classes.link} to={`/profile/${params.id}/followers`}><Typography variant="subtitle1" color="text.secondary" style={{display: 'inline', marginRight: 5}}>{profile?.followings?.length}</Typography>в читаемых</NavLink> <NavLink to={`/profile/${params.id}/followers`} className={classes.link} style={{ marginLeft: 10 }}><Typography variant="subtitle1" color="text.secondary" style={{display: 'inline', marginRight: 5}}>{profile?.followers?.length}</Typography>читателя</NavLink>  </Box>
                </Box>}
                {user?._id !== params.id ? <>
                    {!user?.followers?.includes(params.id) ? <Button disabled={followState === FollowState.LOADING} onClick={handleFollow} color="inherit" size="small" variant="contained" style={{ marginTop: 10 }} className={classes.settingsButton}>Читать</Button> :
                        <Button disabled={followState === FollowState.LOADING} onClick={handleUnFollow} color="inherit" size="small" variant="outlined" style={{ marginTop: 10 }} className={classes.settingsButton}>Читаемые</Button>}
                </> : <Button onClick={handleSettings} color="inherit" size="small" variant="outlined" className={classes.settingsButton}>Изменить профиль</Button>}
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.Tabs}>
                    <Tab label="Твиты" {...a11yProps(0)} />
                    <Tab label="Твиты и ответы" {...a11yProps(1)} />
                    <Tab label="Медиа" {...a11yProps(2)} />
                    <Tab label="Нравится" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel className={classes.tab} value={value} index={0}>
                {
                    loading ? <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div> :
                        Array.isArray(tweets) && tweets.map((tweet: Tweet) => {
                            return <TweetComponent
                                key={tweet._id}
                                user={tweet.user}
                                _id={tweet._id}
                                text={tweet.text}
                                createdAt={tweet.createdAt}
                                images={tweet.images}
                                likes={tweet.likes}
                                bookmarks={tweet.bookmarks}
                            />
                        })
                }
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={1}>
                {
                    loading ? <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div> :
                        Array.isArray(tweets) && tweets.map((tweet: Tweet) => {
                            return <TweetComponent
                                key={tweet._id}
                                user={tweet.user}
                                _id={tweet._id}
                                text={tweet.text}
                                createdAt={tweet.createdAt}
                                images={tweet.images}
                                likes={tweet.likes}
                            />
                        })
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
        </TabPanel>
            <TabPanel value={value} index={3} className={classes.tab}>
                {
                    loading ? <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div> :
                        Array.isArray(profile?.liked) && profile?.liked?.map((tweet: Tweet) => {
                            return <TweetComponent
                                key={tweet._id}
                                user={tweet.user}
                                _id={tweet._id}
                                text={tweet.text}
                                createdAt={tweet.createdAt}
                                images={tweet.images}
                                likes={tweet.likes}
                            />
                        })
                }
            </TabPanel>


            <ModalBlock title="Изменить профиль" visible={open} onClose={handleClose}>
                   
                <div style={{ width: 540 }}>
                    <Settings params={params.id} />
                </div>
            </ModalBlock>
        </div>
    )
}

export default Index
