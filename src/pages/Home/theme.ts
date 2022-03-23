import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesHome = makeStyles((theme: Theme) => ({
    wrapper: {
        maxWidth: '1230px',
        margin: '0 auto',
    },
    tweets: {
        height: '100vh'
    },
    tweetsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
    },
    tweetHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    addTweetForm: {
        display: 'flex',
    },

    Progress: {
        position: 'relative',
        "& span:nth-child(1)": {
            position: 'absolute',
        }
    },
    tweet: {
        transition: 'all 3s',
        cursor: 'pointer',
        display: 'flex',
        padding: 10,
        justifyContent: 'space-between',
        overflowWrap: 'anywhere',
        "&:hover": {
            background: "rgb(245, 248, 250)"
        }
    },
    tweetUserName: {
        color: '#536471',
        margin: '0 8px 0 5px !important',

    },
    tweettimeUploded: {
        display: 'block',
        color: '#536471',
        marginLeft: '8px !important',
    },
    tweetActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        maxWidth: 430,
        marginTop: 15
    },
    search: {
        background: "#EFF3F4",
        padding: '10px',
        borderRadius: '20px'
    },

    tweetFullHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
    tweetFullUserName: {
        color: '#536471',
    },

    tweetFullDescription: {
        fontSize: 23,
        marginTop: 13,
        lineHeight: 1.3,
    },
    outlinedInput: {
        borderRadius: '30px !important',
        background: '#EFF3F4',
        fontWeight: '400 !important',
        margin: '10px 0',
        height: 45,
        "&:focus": {
            background: '#fff',
        },
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },

    }
}));
