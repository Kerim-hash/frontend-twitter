import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesReadUser = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        color: 'inherit',
        textDecoration: 'none',
        padding: '15px',
    },
    about: {
        maxWidth: 450
    }
}));
