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
        marginTop: -80,
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
    }
}))