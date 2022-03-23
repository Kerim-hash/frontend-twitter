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
        marginLeft: 16
    },
    tab: {
        '& .MuiBox-root': {
            padding: '0px',
        },
    },
}))