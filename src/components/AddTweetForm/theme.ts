import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesAddForm = makeStyles((theme: Theme) => ({
    addTweetForm: {
        display: 'flex',
    },
    tweetHeaderForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginLeft: 20,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 5,
        },
    },
    textarea: {
        border: 'none',
        outline: 'none',
        width: '100%',
        resize: 'none',
        fontSize: 20,
        fontFamily: "inherit",
        color: theme.palette.text.secondary,
        fontWeight: 500,
        backgroundColor : theme.palette.secondary.dark,
        "&::placeholder": {
            color: theme.palette.text.secondary,
            fontWeight: 500,
        }
    },
    iconButton: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 5px',
        },
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
    ImagesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%) !important',
        gridTemplateRows: 'repeat(2, 50%) !important',
        gridGap: '10px',
        maxHeight: 300,
        marginBottom: '5px',
    },
    image: {
        width: '100%',
        height: '140px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        backgroundPosition: 'center',
        borderRadius: 10
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        width: '30px',
        height: '30px',
        right: -5,
        background: 'rgb(143 143 143 / 81%) !important'
    },
    button: {
        height: '35px',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 8,
        },

    }
}));
