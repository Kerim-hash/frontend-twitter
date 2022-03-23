import { useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ModalBlock } from '../../components/Modal';
import Signin from '../../components/auth/Signin';
import SignUp from '../../components/auth/SignUp';
import  {useStylesAuth} from './theme'

export const Auth: React.FC = () => {
    const classes = useStylesAuth()

    const [open, setOpen] = useState<"signin" | "signup">();

    const handleClickOpenSignIn = () => {
        setOpen('signin');
    };
    const handleClickOpenSignUp = () => {
        setOpen('signup');
    };

    const handleClose = () => {
        setOpen(undefined);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.blueSide}>
                <TwitterIcon className={classes.icon} sx={{ fontSize: 160 }} color="action" />
            </div>
            <div className={classes.loginSide}>
                <TwitterIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography className={classes.title} variant="h2">В курсе происходящего</Typography>
                <Typography className={classes.desc} variant="h4">Присоединяйтесь к Твиттеру прямо сейчас!</Typography>
                <div className={classes.buttons}>
                    <Button onClick={handleClickOpenSignUp} style={{ marginBottom: 20 }} variant="contained" color="primary">Зарегистрироваться</Button>
                    <Button onClick={handleClickOpenSignIn} variant="outlined">Войти</Button>
                    <Signin open={open === 'signin'} onClose={handleClose} />
                    <SignUp open={open === 'signup'} onClose={handleClose} />
                </div>
            </div>
        </div>
    )
}

