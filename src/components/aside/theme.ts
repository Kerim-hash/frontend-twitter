import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesAside = makeStyles((theme: Theme) => ({
    search: {
        background: "#EFF3F4",
        padding: '10px',
        borderRadius: '20px'
    },
    outlinedInput: {
        borderRadius: '30px !important',
        fontWeight: '400 !important',
        margin: '10px 0',
        height: 45,
        position: 'relative',
        background: theme.palette.secondary.light,
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
    },
    listUsers: {
        background: theme.palette.secondary.light,
        padding: '15px 10px 0 10px',
        borderRadius: 10,
        boxShadow: 'rgb(149 157 171 / 30%) 0px -4px 9px',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 1,
    },
    listUsersFooter: {
        background: theme.palette.secondary.light,
        borderRadius: 10,
        marginTop: '20px',
        boxShadow: 'none',
        padding: '15px 10px 0 10px',
    },
    user: {
        display: 'flex',
        color: 'inherit',
        textDecoration: 'none',
        alingItems: 'center',
        marginBottom: '15px'
    },
    userinfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
    username: {
    },
    fullname: {
    },


}));
