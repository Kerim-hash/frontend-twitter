import React, { ReactElement } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchFollow } from '../../store/ducks/user/actions';
import { useStylesReadUser } from './theme';
import { NavLink } from 'react-router-dom';
import AvatarComponent from '../avatar';
interface ReadUserProps {
    user: {
        fullname: string;
        username: string;
        desk?: string;
        followers: string[];
        followings: string[];
        _id: string;
    }
}

const ReadUser: React.FC<ReadUserProps> = ({ user }: ReadUserProps): ReactElement => {
    const params: { id?: string } = useParams()
    const dispatch = useDispatch()
    const classes = useStylesReadUser()

    const handleFollow = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchFollow({ id: user._id, userID: params.id, followState: 'follow' }))
    }
    const handleUnFollow = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(fetchFollow({ id: user._id, userID: params.id, followState: 'unfollow' }))
    }


    return (
        <NavLink to={`/profile/${user._id}`} className={classes.wrapper}>
            <Box display="flex">
                <AvatarComponent user={user} />
                <Box display="flex" flexDirection="column" style={{ marginLeft: 10 }}>
                    <Typography variant="body1">{user?.fullname}</Typography>
                    <Typography variant="body2">@{user?.username}</Typography>
                    <Typography variant="subtitle2" className={classes.about}>{user?.about}</Typography>
                </Box>
            </Box>
            {user._id !== params.id && <>
                {user.followings.includes(params.id) ? <Button onClick={handleUnFollow} color="inherit" size="small" variant="outlined" style={{ marginTop: 10 }}>Читаемые</Button> : <Button onClick={handleFollow} color="inherit" size="small" variant="contained" style={{ marginTop: 10 }}>Читать</Button>}
            </>}

        </NavLink>
    )
}

export default ReadUser
