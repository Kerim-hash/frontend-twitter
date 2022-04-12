import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesMessageUser = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
        transition: 'all .2s',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        "&:hover": {
            background: '#eee',
          
        }
    },
    wrappeActive: {
        borderRight: '1px solid blue'
    },
    item: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    username: {
        marginLeft: '10px !important',
        fontWeight: '600 !important',
        // fontSize: 
    },
    menuIcon: {
        height: 35, 
        marginLeft: 'auto',
    }
}));
