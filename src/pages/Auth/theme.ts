
import { makeStyles } from '@mui/styles';
import blueSideBg from '../../assets/img/blueSideImg.png'
export const useStylesAuth: any = makeStyles((theme: any) => ({
    wrapper: {
        display: 'flex',
        justifyContent: "space-between",
        height: "100vh"
    },
   
    blueSide: {
        background: `url(${blueSideBg})`,
        width: "53%",
        height: "100%",
        backgroundSize: 'cover',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: "460px !important",
        height: 'fit-content !important',
        padding: '32px',
    },
    loginSide: {
        marginTop: '35px',
        marginLeft: '35px',
    },
    title: {
        margin: '40px 0 50px !important',
    },
    buttons: {
        margin: '40px 0 0 !important',
        display: 'flex',
        flexDirection: 'column',
        width: '300px'
    }
}));
