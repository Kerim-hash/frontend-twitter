import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
export const useStylesImgList = makeStyles((theme: Theme) => ({
    ImagesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%) !important',
        gridTemplateRows: 'repeat(2, 50%) !important',
        maxHeight: 300,
        marginTop: 10,
        marginBottom: 10,
        maxWidth: '100%',
        gridGap: '2px',
    },
    ImagesListEdit: {
        gridGap: '7px',
    },
    image: {
        width: '100%',
        height: '140px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        borderRadius: 20,
        backgroundPosition: 'center',
    },
    singleImage: {
        width: '500px',
        height: '280px',
    },
    coupleImage: {
        width: 'auto',
        height: '280px',
        "&:nth-child(1)": {
            borderRadius: '20px 0 0 20px',
        },
        "&:nth-child(2)": {
            borderRadius: '0 20px 20px 0',
        }
    },
    coupleImageEdit: {
        width: 'auto',
        height: '280px',
    },
    treeImage: {
        "&:nth-child(1)": {
            borderRadius: '20px 0 0 0',
            height: '150px'
        },
        "&:nth-child(3)": {
            borderRadius: '0 0 0 20px',
            height: '145.3px',
        },
        "&:nth-child(2)": {
            height: '295px',
            borderRadius: '0 20px 20px 0',
        }
    },
    FullImage: {
        "&:nth-child(1)": {
            borderRadius: '20px 0 0 0',
        },
        "&:nth-child(3)": {
            borderRadius: '0 0 0 20px',
        },
        "&:nth-child(2)": {
            borderRadius: '0 20px 0 0',
        },
        "&:nth-child(4)": {
            borderRadius: '0 0 20px 0',
        }
    },
    treeImageEdit: {
        "&:nth-child(1)": {
            height: '147px',
        },
        "&:nth-child(3)": {
            height: '147px%',
        },
        "&:nth-child(2)": {
            height: '297px',
        }
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
