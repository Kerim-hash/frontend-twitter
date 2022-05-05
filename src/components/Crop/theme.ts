import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesCrop = makeStyles((theme: Theme) => ({
    wrapper:{
        width: 600,
        height: 500,
        [theme.breakpoints.down('sm')]: {
            minHeight: '350px',
            maxWidth: 450
        },
    },
    button: {
        position: 'absolute', zIndex: 999, right: '10px', top: '10px'
    }
}));
