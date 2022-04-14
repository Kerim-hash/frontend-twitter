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
import { FetchSearchUser, fetchUsers, SetSearchUser } from '../../store/ducks/user/actions';
import { selectSearchUser, selectUsers } from '../../store/ducks/user/selectors';
import { NavLink } from 'react-router-dom';
import { useStylesAside } from './theme';
import { UserType } from '../../store/ducks/user/contracts/state';
import AvatarComponent from '../avatar'

const Aside: React.FC = (): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesAside()
    const [search, setSearch] = React.useState<string>("");
    let handleChange = (search) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);

    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
    };

    const userData = useSelector(selectSearchUser)
    const users = useSelector(selectUsers)

    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
    }, [search])

    React.useEffect(() => {
        dispatch(SetSearchUser([]))
    }, [window.location.pathname, search === ''])

    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const [focus, setFocus] = useState<boolean>(false)

    return (
        <Hidden lgDown>
            <Grid item xs={0} lg={0} md={3.4} >
                <div style={{ position: 'sticky', top: 0 }}>
                    <OutlinedInput
                        fullWidth
                        className={classes.outlinedInput}
                        placeholder="Поиск в Твитерре"
                        onChange={handleChangeSearch}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    {focus &&
                         <Box className={classes.listUsers}>
                            { userData !== undefined && userData?.length > 0 ? userData.map((item: UserType) => {
                                return <NavLink className={classes.user} to={`/home/profile/${item?._id}`}>
                                    <AvatarComponent user={item} />
                                    <Box className={classes.userinfo}>
                                        <Typography variant="body1" className={classes.fullname}>{item?.fullname}</Typography>
                                        <Typography variant="body1" className={classes.username}>@{item?.username}</Typography>
                                    </Box>
                                </NavLink>
                            }) : <Typography variant="body2" style={{textAlign: 'center',fontWeight: 600, paddingBottom: 30}}>Попробуйте поискать людей, темы или ключевые слова</Typography>}
                        </Box>
                    }


                    <Paper elevation={3} sx={{ padding: '7px 10px 20px', borderRadius: 5, background: "#f7f9f9", marginTop: '20px', boxShadow: 'none' }}>
                        <Typography variant="h5">Кого читать</Typography>
                        {users !== undefined && users.map((item) => {
                            return <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', borderColor: 'transparent', cursor: 'pointer', transition: 'background .4s', "&:hover": { background: '#E1E8ED' }, margin: "0 -11px 0 -11px", alignItems: 'center' }}>
                                <CardHeader
                                    avatar={<AvatarComponent user={item} />}
                                    action={<Button color="inherit" size="small" variant="contained" >Читать</Button>}
                                    title={item?.fullname}
                                    subheader={`@${item?.username}`}
                                />
                            </Card>
                        })}
                    </Paper>
                </div>
            </Grid>
        </Hidden>
    )
}

export default Aside
