import React, { ReactElement, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import OutlinedInput from '@mui/material/OutlinedInput';
import Hidden from '@mui/material/Hidden';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../hook/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollow,FetchSearchUser, fetchUsers, setFollowState, SetSearchUser } from '../../store/ducks/user/actions';
import { selectFollowState, selectSearchUser, selectUsers } from '../../store/ducks/user/selectors';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStylesAside } from './theme';
import { FollowState, UserType } from '../../store/ducks/user/contracts/state';
import AvatarComponent from '../avatar'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
interface asideProps {
    user: UserType
}

const Aside: React.FC<asideProps> = ({user}: asideProps): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesAside()
    const navigate = useNavigate()
    const [search, setSearch] = React.useState<string>("");
    let handleChange = (search) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);
    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
    };

    const userData = useSelector(selectSearchUser)
    const users = useSelector(selectUsers)
    const followState = useSelector(selectFollowState)

    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
        // eslint-disable-next-line
    }, [search])

    React.useEffect(() => {
        if (search) {
            dispatch(SetSearchUser([]))
        }
        // eslint-disable-next-line
    }, [window.location.pathname, search === ''])

    React.useEffect(() => {
        dispatch(fetchUsers())
        // eslint-disable-next-line
    }, [])

    const [focus, setFocus] = useState<boolean>(false)
    const rootEl = React.useRef(null);

    React.useEffect(() => {
        if (focus) {
            const onClick = e => rootEl.current.contains(e.target) || setFocus(false)
            document.addEventListener('click', onClick);
        }
    }, [focus]);

    const handleFollow = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        dispatch(fetchFollow({ id: id, userID: user._id, followState: 'follow' }))
    }
    const handleUnFollow = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        dispatch(fetchFollow({ id: id, userID: user._id, followState: 'unfollow' }))
    }
    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`)
    }

    const handleCloseAlert = () => {
        dispatch(setFollowState(FollowState.NEVER))
    }

    return (
        <Hidden mdDown>
             <Snackbar open={followState === FollowState.ERROR} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                Что-то пошло не так, но не беспокойтесь — давайте попробуем еще раз.
                </Alert>
            </Snackbar>
            <Grid item lg={3.4} md={4} >
                <div style={{ position: 'sticky', top: 0 }}>
                    <div ref={rootEl} >
                        <OutlinedInput
                            fullWidth
                            className={classes.outlinedInput}
                            placeholder="Поиск в Твитерре"
                            onChange={handleChangeSearch}
                            onFocus={() => setFocus(true)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                        {focus && <Box className={classes.listUsers}>
                            {userData !== undefined && userData?.length > 0 ? userData.map((item: UserType) => {
                                return <NavLink className={classes.user} to={`/profile/${item?._id}`}>
                                    <AvatarComponent user={item} />
                                    <Box className={classes.userinfo}>
                                        <Typography variant="body1" color="text.secondary">{item?.fullname}</Typography>
                                        <Typography variant="body1" color="text.secondary">@{item?.username}</Typography>
                                    </Box>
                                </NavLink>
                            }) : <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', fontWeight: 600, paddingBottom: 30 }}>Попробуйте поискать людей, темы или ключевые слова</Typography>}
                        </Box>
                        }
                    </div>



                    <Paper elevation={3} className={classes.listUsersFooter}>
                        <Typography variant="h5" ml={2}>Кого читать</Typography>
                        {users !== undefined && users?.map((item) => {
                            return <Card key={item._id}  className={classes.card} onClick={() => navigateToProfile(item._id)}>
                                <CardHeader
                                    avatar={<AvatarComponent user={item} />}
                                    action={!user?.followers?.includes(item._id) ? <Button disabled={followState === FollowState.LOADING} onClick={(e) => handleFollow(e, item._id)} color="inherit" size="small" variant="contained" style={{ marginTop: 10 }}>Читать</Button> :
                                        <Button disabled={followState === FollowState.LOADING} onClick={(e) => handleUnFollow(e, item._id)} color="inherit" size="small" variant="outlined" style={{ marginTop: 10 }}>Читаемые</Button>}
                                    title={<Typography color="text.secondary">{item?.fullname}</Typography>}
                                    subheader={<Typography color="text.grey.light">@{item?.username}</Typography>}
                                />
                            </Card>
                        })}
                    </Paper>
                </div>
            </Grid>
        </Hidden>
    )
}

export default React.memo(Aside)
