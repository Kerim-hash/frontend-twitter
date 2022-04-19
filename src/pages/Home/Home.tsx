import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStylesHome } from './theme'
import Sidebar from '../../components/Sidebar'
import { Route, Routes } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';
import Profile from '../Profile';
import Index from './components/Index/indx';
import Bookmarks from '../Bookmarks';
import Aside from '../../components/aside';
import { useDispatch } from 'react-redux';
import { FetchGetMe } from '../../store/ducks/user/actions';
import Layout from '../../layout';

const Home = () => {
    const classes = useStylesHome()
    return (
        <section className={classes.wrapper}>
            <Routes>
                
            </Routes>
        </section>
    )
}

export default Home