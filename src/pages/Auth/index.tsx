import { useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Signing from '../../components/auth/Signing';
import SignUp from '../../components/auth/SignUp';
import { useStylesAuth } from './theme'

const Auth: React.FC = () => {
    const classes = useStylesAuth()
    const [open, setOpen] = useState<"signing" | "signup">();

    const handleClickOpenSignIn = () => {
        setOpen('signing');
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
                <TwitterIcon className={classes.icon} style={{ fill: '#fff' }} />
            </div>
            <div className={classes.loginSide}>
                <TwitterIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography className={classes.title} variant="h2" color="text.secondary" >В курсе происходящего</Typography>
                <Typography className={classes.desc} variant="h4" color="text.secondary" >Присоединяйтесь к Твиттеру прямо сейчас!</Typography>
                <div className={classes.buttons}>
                    <Button onClick={handleClickOpenSignUp} style={{ marginBottom: 20 }} variant="contained" color="primary">Зарегистрироваться</Button>
                    <Button onClick={handleClickOpenSignIn} variant="outlined">Войти</Button>
                    <Signing open={open === 'signing'} onClose={handleClose} />
                    <SignUp open={open === 'signup'} onClose={handleClose} />
                </div>
            </div>
        </div>
    )
}

export default Auth