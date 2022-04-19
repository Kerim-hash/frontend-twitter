import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesProfile = makeStyles((theme: Theme) => ({
    profileHeader: {
        height: 200,
        background: '#CFD9DE',
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: -70,
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
        alignItems: 'center'
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