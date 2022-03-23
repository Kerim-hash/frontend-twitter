import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets, setAddFormLoadingState } from '../../store/ducks/tweets/actionCreators';
import { selectIsTweetDeleted, selectIsTweetLoading, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { AddFormState, Tweet } from '../../store/ducks/tweets/contracts/state';
import { useStylesHome } from './theme'
import { Sidebar } from '../../components/Sidebar'
import { TweetComponent } from "../../components/Tweet"
import { AddTweetForm } from '../../components/AddTweetForm'
import { fetchTags } from '../../store/ducks/tags/actionCreators';
import { Tags } from '../../components/tags';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';
import { OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Profile from './components/Profile';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Home = () => {
    const dispatch = useDispatch()
    const classes = useStylesHome()
    const tweets = useSelector(selectTweetsItems)
    const loading = useSelector(selectIsTweetLoading)
    const isDeleted = useSelector(selectIsTweetDeleted)


    const [snackbarState, setSnackbarState] = useState<{ text: string, type: 'error' | 'success' | 'info' }>()

    React.useEffect(() => {
        
        dispatch(fetchTweets())

    }, [])

    React.useEffect(() => {
        if (isDeleted) {
            setSnackbarState({ text: 'Ваш твит удален', type: 'info' })
        }
    }, [isDeleted])

    const handleClose = () => {
        dispatch(setAddFormLoadingState(AddFormState.NEVER))
    }

    return (
        <section className={classes.wrapper}>
            <Snackbar open={isDeleted} autoHideDuration={3000} onClose={handleClose}   anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert  onClose={handleClose}severity={snackbarState?.type} sx={{ width: '100%' }}>
                    {snackbarState?.text}
                </Alert>
            </Snackbar>
            <Grid container spacing={1}>
                <Grid item xs={1} md={2.3} >
                    <Sidebar />
                </Grid>
                <Grid item xs={7} md={6.3} style={{ padding: "0 20px 0 30px" }}>
                    <Paper className={classes.tweets} variant="outlined">
                        <Paper variant="outlined">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <div className={classes.tweetsHeader}>
                                                <Typography variant="h6" style={{ fontWeight: 800, fontSize: 22 }}>Главная</Typography>
                                                <IconButton>
                                                    <AutoAwesomeIcon />
                                                </IconButton>
                                            </div>
                                            <div style={{ padding: 10 }}>
                                                <AddTweetForm />
                                            </div>
                                        </>
                                    }
                                />
                                <Route path="/tweet/*" element={<Box display='flex' alignItems="center" style={{ padding: 3 }} >
                                    <BackButton /> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>Твит</Typography>
                                </Box>} />

                            </Routes>
                            <Routes>
                                <Route
                                    index
                                    element={
                                        loading ? <div style={{ textAlign: 'center', marginTop: 50 }}><CircularProgress disableShrink /></div> : Array.isArray(tweets) && tweets.map((tweet: Tweet) => {
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
                                />

                                <Route path="/tweet/:id" element={<FullTweet />} />
                                <Route path="/profile/:id" element={<Profile />} />
                            </Routes>

                        </Paper>
                    </Paper>
                </Grid>

                <Grid item xs={4} md={3.4} style={{ position: 'sticky' }}>
                    <OutlinedInput
                        fullWidth
                        className={classes.outlinedInput}
                        placeholder="Поиск в Твитерре"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Tags classes={classes} />
                    <Paper elevation={3} sx={{ padding: '7px 10px 20px', borderRadius: 5, background: "#f7f9f9", marginTop: '20px', boxShadow: 'none' }}>
                        <Typography variant="h5">Кого читать</Typography>
                        <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">R</Avatar>}
                                action={<Button variant="outlined" size="small" color="info" >Читать</Button>}
                                title="Shrimp "
                                subheader="@Shrimp"
                            />
                        </Card>
                        <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">R</Avatar>}
                                action={<Button variant="outlined" size="small" >Читать</Button>}
                                title="Shrimp "
                                subheader="@Shrimp"
                            />
                        </Card>
                        <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">R</Avatar>}
                                action={<Button variant="outlined" size="small" >Читать</Button>}
                                title="Shrimp "
                                subheader="@Shrimp"
                            />
                        </Card>
                        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Link color="text.lightBlue" variant="body2" >Показать ёще</Link>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </section>
    )
}

export default Home