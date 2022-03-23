import React from 'react'
import { useStylesProfile } from './theme'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchProfile } from '../../../../store/ducks/user/actions';
import { selectProfile } from '../../../../store/ducks/user/selectors';
import { fetchTweets } from '../../../../store/ducks/tweets/actionCreators';
import { selectIsTweetLoading, selectTweetsItems } from '../../../../store/ducks/tweets/selectors';
import { TweetComponent } from '../../../../components/Tweet';
import CircularProgress from '@mui/material/CircularProgress';
import { Tweet } from '../../../../store/ducks/tweets/contracts/state';
import BackButton from '../../../../components/BackButton';
import { setTweet } from '../../../../store/ducks/tweet/actionCreators';

const Profile = ()=> {
    const dispatch = useDispatch()
    const classes = useStylesProfile()
    const profile = useSelector(selectProfile)
    const tweets = useSelector(selectTweetsItems)
    const loading = useSelector(selectIsTweetLoading)
    const params: { id?: string } = useParams()

    React.useEffect(() => {
        dispatch(fetchProfile(params.id || ""))
        dispatch(fetchTweets(params.id || ""))
    }, [dispatch, params.id])

    React.useEffect(() => {
        return () => {
            dispatch(fetchTweets())
        }
    }, [])

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(tweets)

    // if (!profile || loading) {
    //     return <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div>
    // }
    
    return (
        <div>
            <Box display='flex' alignItems="center" style={{ padding: 10 }} >
                <BackButton /> <Box display="flex" flexDirection="column"> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>{profile?.fullname}</Typography> <Typography variant="caption" style={{ fontWeight: 300, fontSize: 14, lineHeight: 1 }}>{tweets?.length} твит</Typography></Box>
            </Box>
            
            <div className={classes.profileHeader}></div>
            <div className={classes.profileInfo}>
                <Avatar sx={{ width: 133, height: 133 }} />
                <Typography variant="body1" style={{ fontWeight: 800, fontSize: 20, marginTop: 25 }}>{profile?.fullname}</Typography>
                <Typography variant="caption" style={{ fontWeight: 500, fontSize: 14, color: '#536471', lineHeight: 1, }}>@{profile?.username}</Typography>
                <Box display="flex" alignItems="center" style={{ marginTop: 15 }} > <EventOutlinedIcon sx={{ fill: '#536471', marginRight: '5px', fontSize: 18 }} /><Typography variant="caption" style={{ fontWeight: 400, fontSize: 14, color: '#536471' }}>Регистрация: декабрь 2021 г.</Typography></Box>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ justifyContent: 'space-between' }}>
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
                            />
                        })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
        </TabPanel>
            <TabPanel value={value} index={3}>
                Item Three
        </TabPanel>
        </div>
    )
}

export default Profile
