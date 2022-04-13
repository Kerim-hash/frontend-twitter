import React, { ReactElement } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Tags } from '../../components/tags';
import OutlinedInput from '@mui/material/OutlinedInput';
import Hidden from '@mui/material/Hidden';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../hook/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSearchUser, SetSearchUser } from '../../store/ducks/user/actions';
import { selectSearchUser } from '../../store/ducks/user/selectors';
import { NavLink } from 'react-router-dom';
import { useStylesAside } from './theme';
import { UserType } from '../../store/ducks/user/contracts/state';

interface AsideProps {
    // search: string;
}

const Aside: React.FC = (): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesAside()
    const [search, setSearch] = React.useState<string>("");
    // const [displayValue, setDisplayValue] = React.useState<string>(search);
    let handleChange = (search) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);


    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
        // setDisplayValue(e.target.value);
    };

    const userData = useSelector(selectSearchUser)

    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
    }, [search])

    React.useEffect(() => {
        dispatch(SetSearchUser([]))
    }, [window.location.pathname])

    return (
        <Hidden lgDown>
            <Grid item xs={0} lg={0} md={3.4} >
                <div style={{ position: 'sticky', top: 0 }}>
                <OutlinedInput
                    fullWidth
                    className={classes.outlinedInput}
                    placeholder="Поиск в Твитерре"
                    onChange={handleChangeSearch}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                {userData !== undefined && userData?.length > 0 && <Box className={classes.listUsers}>
                    {userData.map((item: UserType) => {
                        return <NavLink className={classes.user} to={`/home/profile/${item?._id}`}>
                            <Avatar alt={item?.fullname} src={item?.avatar} />
                            <Box className={classes.userinfo}>
                                <Typography variant="body1" className={classes.fullname}>{item?.fullname}</Typography>
                                <Typography variant="body1" className={classes.username}>@{item?.username}</Typography>
                            </Box>
                        </NavLink>
                    })}
                </Box>
                }

                {/* <Tags classes={classes} /> */}
                <Paper elevation={3} sx={{ padding: '7px 10px 20px', borderRadius: 5, background: "#f7f9f9", marginTop: '20px', boxShadow: 'none' }}>
                    <Typography variant="h5">Кого читать</Typography>
                    <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                        <CardHeader
                            avatar={<Avatar aria-label="recipe">R</Avatar>}
                            action={<Button color="inherit" size="small" variant="contained" >Читать</Button>}
                            title="Shrimp "
                            subheader="@Shrimp"
                        />
                    </Card>
                    <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                        <CardHeader
                            avatar={<Avatar aria-label="recipe">R</Avatar>}
                            action={<Button color="inherit" size="small" variant="contained" >Читать</Button>}
                            title="Shrimp "
                            subheader="@Shrimp"
                        />
                    </Card>
                    <Card sx={{ maxWidth: 345, background: 'transparent', boxShadow: 'none', }}>
                        <CardHeader
                            avatar={<Avatar aria-label="recipe">R</Avatar>}
                            action={<Button color="inherit" size="small" variant="contained"  >Читать</Button>}
                            title="Shrimp "
                            subheader="@Shrimp"
                        />
                    </Card>
                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Link color="text.lightBlue" variant="body2" >Показать ёще</Link>
                    </Box>
                </Paper>
                </div>
            </Grid>
        </Hidden>
    )
}

export default Aside
