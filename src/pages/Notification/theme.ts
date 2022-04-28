import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStylesNotification = makeStyles((theme: Theme) => ({
    paper: {
        "&:hover": { background: theme.palette.tonalOffset },
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
        "&:hover": { background: theme.palette.tonalOffset },
    }

}))