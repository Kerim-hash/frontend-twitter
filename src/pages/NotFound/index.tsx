import Typography from '@mui/material/Typography';
import React from 'react'
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Typography color={'#14518D'} variant="h2">404</Typography>
            <Typography color={'#14518D'} variant="h5">Page not found </Typography>
            <NavLink style={{color: "#4518D", fontSize: 23, textDecoration: 'none'}} to="/home">Back to home</NavLink>
        </div>
    )
}

export default NotFound
