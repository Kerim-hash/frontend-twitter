import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesImgList = makeStyles((theme: Theme) => ({

    ImagesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%) !important',
        gridTemplateRows: 'repeat(2, 50%) !important',
        gridGap: '5px',
        maxHeight: 300,
        marginBottom: 10,
        maxWidth: '100%'
    },
    image: {
        width: '100%',
        height: '140px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        borderRadius: 10,
        backgroundPosition: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        width: '30px',
        height: '30px',
        right: -5,
        background: 'rgb(143 143 143 / 81%) !important'
    }
}));
