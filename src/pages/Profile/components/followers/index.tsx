import React, { useCallback } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectData, selectProfile } from '../../../../store/ducks/user/selectors';
import { fetchTweets } from '../../../../store/ducks/tweets/actionCreators';
import { selectIsTweetLoading, selectTweetsItems } from '../../../../store/ducks/tweets/selectors';
import BackButton from '../../../../components/BackButton';
import { fetchProfile, fetchFollow } from '../../../../store/ducks/user/actions';
import { useStylesProfile } from '../../theme';
import ReadUser from '../../../../components/readUser';
const ProfileFollowers = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectData)
    const profile = useSelector(selectProfile)
    const loading = useSelector(selectIsTweetLoading)
    const params: { id?: string } = useParams()
    const classes = useStylesProfile()

    React.useEffect(() => {
        dispatch(fetchProfile(params.id || ""))
    }, [params.id])


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



    return (
        <div>
            <Box display='flex' alignItems="center" style={{ padding: 10 }} >
                <BackButton /><Box display="flex" flexDirection="column"> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>{profile?.fullname}</Typography> <Typography variant="caption" style={{ fontWeight: 300, fontSize: 14, lineHeight: 1 }}>@{profile.username}</Typography></Box>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.TabsFullWidth}>
                    <Tab label="Читателей" {...a11yProps(0)} />
                    <Tab label="Читаемые" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel className={classes.tab} value={value} index={0}>
                {profile.followers?.map((item => {
                    return <ReadUser user={item} />
                }))}
            </TabPanel>
            <TabPanel className={classes.tab} value={value} index={1}>
                {profile.followings?.map((item => {
                    return <ReadUser user={item} />
                }))}
            </TabPanel>

        </div>
    )
}

export default ProfileFollowers
