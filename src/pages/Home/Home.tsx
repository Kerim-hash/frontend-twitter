import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStylesHome } from './theme'
import { Sidebar } from '../../components/Sidebar'
import { Route, Routes } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';
import Profile from '../Profile';
import Index from './components/Index/indx';
import Bookmarks from '../Bookmarks';
import Aside from '../../components/aside';


const Home = () => {
    const classes = useStylesHome()
 
  
    return (
        <section className={classes.wrapper}>
            <Grid container spacing={1}>
                <Grid item xs={1} md={2.29} >
                    <Sidebar />
                </Grid>
                <Grid item xs={9.61} lg={6.31} md={9.61} style={{ padding: "0 20px 0 30px" }}>
                    <Paper className={classes.tweets} variant="outlined">
                        <Paper variant="outlined">
                            <Routes>
                                <Route path="/tweet/*" element={<div style={{ padding: 10, display: "flex", alignItems: 'center', top: 0, backdropFilter: 'blur(9px)', position: 'sticky', zIndex: 1 }} >
                                    <BackButton /> <Typography variant="body1" style={{ fontWeight: 800, fontSize: 18 }}>Твит</Typography>
                                </div>
                                } />
                            </Routes>
                            <Routes>
                                <Route index element={<Index />} />
                                <Route path="/tweet/:id" element={<FullTweet />} />
                                <Route path="/profile/:id/*" element={<Profile />} />
                                <Route path="/bookmarks/" element={<Bookmarks />} />
                            </Routes>
                        </Paper>
                    </Paper>
                </Grid>
                <Aside  />
            </Grid>
        </section>
    )
}

export default Home