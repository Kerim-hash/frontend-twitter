import React, { ReactElement } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchFollow } from '../../store/ducks/user/actions';
import { ClassNames } from '@emotion/react';
import { useStylesReadUser } from './theme';
import { NavLink } from 'react-router-dom';

interface ReadUserProps {
    user: {
        fullname: string,
        username: string,
        desk?: string,
        follwers: string[],
        followings: string[],
        _id: string
    }
}


const ReadUser: React.FC<ReadUserProps> = ({ user }: ReadUserProps): ReactElement => {
    const params: { id?: string } = useParams()
    const dispatch = useDispatch()
    const classes = useStylesReadUser()
    
    const handleFollow = () => {
        dispatch(fetchFollow({ id: params.id, userID: user._id, followState: 'follow' }))
    }
    const handleUnFollow = () => {
        dispatch(fetchFollow({ id: params.id, userID: user._id, followState: 'unfollow' }))
    }


    return (
        <NavLink to={`/profile/${user._id}`} className={classes.wrapper}>
            <Box display="flex">
                <Avatar alt={user.fullname} src="/static/images/avatar/1.jpg" />
                <Box display="flex" flexDirection="column"  style={{marginLeft: 10}}>
                    <Typography variant="body1">{user.fullname}</Typography>
                    <Typography variant="body2">{user.username}</Typography>
                    <Typography variant="body2">{user?.desk}</Typography>
                </Box>
            </Box>

            {user._id !== params.id && <>
                {!user.followings.includes(params.id) ? <Button onClick={handleFollow} color="inherit" size="small" variant="contained" style={{ marginTop: 10 }}>Читать</Button> :
                    <Button onClick={handleUnFollow} color="inherit" size="small" variant="outlined" style={{ marginTop: 10 }}>Читаемые</Button>}
            </>}

        </NavLink>
    )
}

export default ReadUser
