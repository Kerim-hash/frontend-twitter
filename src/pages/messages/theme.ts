import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStylesMessages = makeStyles((theme: Theme) => ({
    wrapper: {
        maxWidth: '1230px',
        margin: '0 auto',
    },
    dialog: {
        "& .MuiPaper-root": {
            minHeight: 540
        }
    },
    itemConversation: {
        borderLeft: `1px solid  ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : "#EFF3F4" }`,
        height: '100vh'
    },
    itemMessage: {
        borderLeft: `1px solid  ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : "#EFF3F4" }`,
        borderRight: `1px solid  ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : "#EFF3F4"}`,
        height: '100vh',
    },
    messageUsers: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #eee',
    },
    outlinedInput: {
        borderRadius: '30px !important',
        fontWeight: '400 !important',
        margin: '10px 0',
        height: 45,
        background: theme.palette.secondary.light,
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
    },
    item: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    fullname: {
        fontWeight: '800 !important',
        fontSize: '20px !important',
        lineHeight: '1 !important'
    },
    username: {
        fontWeight: '600 !important',
        color: '#586975'
    },
    messageForm: {
        display:"flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        bottom: 0,
        padding: '0'
    },
    messageWrapper: {
        display: 'inline-flex',
        flexDirection: 'column',
    },
    messageWrapperOwn: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: '5px',
    },
    message: {
        backgroundColor: 'rgb(29, 155, 240)',
        padding: '10px 14px',
        width: 'fit-content',
        borderRadius: '15px 15px 15px 0',
        color: '#fff',
    },
    messageOwn: {
        backgroundColor: 'rgb(29, 155, 240)',
        padding: '10px 14px',
        display: 'inline-block',
        borderRadius: '15px 15px 0 15px',
        color: '#fff',
      
    },
    messageDate: {
        color: '#536471',

    },
    searchUser: {
        display: 'flex',
        color: 'inherit',
        textDecoration: 'none',
        alingItems: 'center',
        padding:'10px',
        transition: 'all .2s',
        cursor: 'pointer',
        "&:hover":{
            background: theme.palette.tonalOffset
        }
    },
    userinfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
    desabled: {
        pointerEvents: 'none',
        background: '#16181c69',
    }
}));
