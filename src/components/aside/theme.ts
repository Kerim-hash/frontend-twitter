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
        background: '#EFF3F4',
        fontWeight: '400 !important',
        margin: '10px 0',
        height: 45,
        position: 'relative',
        "&:focus": {
            background: '#fff',
        },
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
    },
    listUsers: {
        background: '#fff',
        padding: '15px 10px 0 10px',
        borderRadius: 10,
        boxShadow: '0px -1px 17px rgb(0 0 0 / 30%)',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 1,
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
