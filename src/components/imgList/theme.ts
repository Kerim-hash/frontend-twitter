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
        [theme.breakpoints.down('sm')]: {
            maxHeight: 160,
            marginTop: 5,
            marginBottom: 0,
        },
    },
    ImagesListEdit: {
        gridGap: '7px',
    },
    image: {
        width: '100%',
        minHeight: '140px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        borderRadius: 20,
        backgroundPosition: 'center',
    },
    singleImage: {
        marginTop: 20,
        maxWidth: '500px',
        minHeight: '480px',
        [theme.breakpoints.down('sm')]: {
            minHeight: '280px',
        },
    },
    coupleImage: {
        width: 'auto',
        height: '280px',
        [theme.breakpoints.down('sm')]: {
            height: '160px',
        },
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
        [theme.breakpoints.down('sm')]: {
            height: '160px',
        },
    },
    treeImage: {
        "&:nth-child(1)": {
            borderRadius: '20px 0 0 0',
            height: '150px',
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        },
        "&:nth-child(3)": {
            borderRadius: '0 0 0 20px',
            height: '145.3px',
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        },
        "&:nth-child(2)": {
            height: '295px',
            borderRadius: '0 20px 20px 0',
            [theme.breakpoints.down('sm')]: {
                height: '160px',
            },
         
        }
    },
    FullImageEdit: {
        "&:nth-child(1)": {
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        },
        "&:nth-child(3)": {
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        },
        "&:nth-child(2)": {
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        },
        "&:nth-child(4)": {
            [theme.breakpoints.down('sm')]: {
                height: '80px',
            },
        }
    },
    FullImage: {
        "&:nth-child(1)": {
            borderRadius: '20px 0 0 0',
            [theme.breakpoints.down('sm')]: {
                minHeight: '80px',
            },
        },
        "&:nth-child(3)": {
            borderRadius: '0 0 0 20px',
            [theme.breakpoints.down('sm')]: {
                minHeight: '80px',
            },
        },
        "&:nth-child(2)": {
            borderRadius: '0 20px 0 0',
            [theme.breakpoints.down('sm')]: {
                minHeight: '80px',
            },
        },
        "&:nth-child(4)": {
            borderRadius: '0 0 20px 0',
            [theme.breakpoints.down('sm')]: {
                minHeight: '80px',
            },
        }
    },
    treeImageEdit: {
        "&:nth-child(1)": {
            height: '147px',
            [theme.breakpoints.down('sm')]: {
                height: '74px',
            },
        },
        "&:nth-child(3)": {
            height: '147px',
            [theme.breakpoints.down('sm')]: {
                height: '73px',
            },
        },
        "&:nth-child(2)": {
            height: '297px',
            [theme.breakpoints.down('sm')]: {
                height: '160px',
            },
        }
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        width: '30px',
        height: '30px',
        left: '10px',
        background: 'rgb(143 143 143 / 81%) !important'
    },
    changeIcon: {
        position: 'absolute',
        bottom: 5,
        height: '30px',
        right: '10px',
        background: 'rgb(143 143 143 / 81%) !important' 
    }
}));
