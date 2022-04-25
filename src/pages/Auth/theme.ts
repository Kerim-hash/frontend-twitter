
import { makeStyles } from '@mui/styles';
import blueSideBg from '../../assets/img/blueSideImg.png'
export const useStylesAuth: any = makeStyles((theme: any) => ({
    wrapper: {
        display: 'flex',
        justifyContent: "space-between",
        minHeight: "100vh",
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        },
    },
    blueSide: {
        background: `url(${blueSideBg})`,
        width: "53%",
        height: "100%",
        backgroundSize: 'cover',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            width: "100%",
            height: '47vh'
        },
    },
    icon: {
        width: "460px !important",
        height: 'fit-content !important',
        padding: '32px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: "200px !important",
        },
    },
    loginSide: {
        marginTop: '35px',
        marginLeft: '35px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            marginLeft: '15px',
        },
    },
    title: {
        margin: '40px 0 50px !important',
        [theme.breakpoints.down('sm')]: {
            margin: '0 !important',
            lineHeight: '50px',
        },
    },
    buttons: {
        margin: '40px 0 0 !important',
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    }
}));
