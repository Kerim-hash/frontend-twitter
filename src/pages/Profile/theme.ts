// @ts-nocheck
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesProfile = makeStyles((theme: Theme) => ({
    profileHeader: {
        height: 200,
        background: '#CFD9DE',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            height: 120,
          },
    },
    avatar: {
        width: 143,
        height: 143,
        border: '5px solid #fff',
        [theme.breakpoints.down('sm')]: {
            width: 73,
            height: 73,
            border: '2px solid #fff',
          },
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: -70,
        [theme.breakpoints.down('sm')]: {
            marginTop: -25,
          },
    },
    tab: {
        '& .MuiBox-root': {
            padding: '0px',
        },
    },
    Tabs: {
        '& .MuiTabs-scroller .css-heg063-MuiTabs-flexContainer': {
            justifyContent: 'space-between',
            textAlign: 'center'
        }
    },
    TabsFullWidth: {
        '& .MuiTabs-scroller .css-heg063-MuiTabs-flexContainer .MuiButtonBase-root': {
           width: '50%'
        }
    },
    link: {
        color: "#536471",
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'underline',
        },
        "& span":{
            color: '#000',
            marginRight: '3px',
            fontWeight: 600,
            fontSize: 15
        }
    },
    textarea: {
        marginBottom: 30,
        padding: '20px 10px 15px 10px',
        fontSize: '20px',
        resize: 'none',
        backgroundColor : theme.palette.secondary.dark,
        color: theme.palette.text.secondary,
        fontFamily: ['Rubik', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
    settingsWrapper: {
        marginTop: 10,
        display:'flex',
        flexDirection:'column'
    },
    TextFieldSettings: {
        marginBottom: '30px !important',
    },
    backgroundPhoto: {
        height: 200,
        background: '#CFD9DE',
        margin:'-30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    avatarSettings: {
        marginTop: -30,
        marginBottom: 20,
    },
    settingsButton: {
        top: '10px',
        right: '10px !important',
        position: 'absolute !important',
    }
}))