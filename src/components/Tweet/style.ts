import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const TweetStyle = makeStyles((theme: Theme) => ({
    tweets: {
        height: '100vh'
    },
    tweetsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
    },
    tweetsHeaderLink: {
        display: 'flex',
        color: 'inherit',
        alignItems: 'center',
        textDecoration: 'none',
        "& .MuiTypography-body1:hover":{
            textDecoration: 'underline'
        }
    },
    tweetHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    addTweetForm: {
        display: 'flex',
    },
    tweetHeaderForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginLeft: 20
    },
    textarea: {
        border: 'none',
        outline: 'none',
        width: '100%',
        resize: 'none',
        fontSize: 22,
        fontFamily: "Rubik",

        "&:placeholder": {
            fontSize: 22,
            fontWeight: 500,
        }
    },

    tweetHeaderFormActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        overflowWrap: 'anywhere',
        borderLeft: 'none !important',
        borderRight: 'none !important',
        "&:hover": {
            background: "rgb(245, 248, 250)"
        },
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
        margin: 0,
        lineHeight: 2,
        wordBreak: 'break-word'
    },
    img: {
        width: 120,
        height: 120,
        objectFit: 'contain'
    },
    icon: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },

}));
