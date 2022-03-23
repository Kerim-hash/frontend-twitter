import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useStylesAuth } from '../../pages/Auth/theme';
import DialogActions from '@mui/material/DialogActions';
import { ModalBlock } from '../../components/Modal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSignUp, setUserLoadingState } from '../../store/ducks/user/actions';
import { selectData, selectLink, selectLoadingState } from '../../store/ducks/user/selectors';
import { LoadingState } from '../../store/ducks/user/contracts/state';

interface SignUpProps {
    open: boolean;
    onClose: () => void;
}

export interface RegisterFormProps {
    email: string
    username: string
    fullname: string
    password: string
    password2: string
}


const RegisterFormSchema = yup.object({
    fullname: yup.string().required('Введите полное имя'),
    username: yup.string().required('Введите имя'),
    email: yup.string().email('электронная почта должна быть действительной электронной почтой').required('Введите E-mail'),
    password: yup.string().min(8).required('Пароль должен состоять не менее чем из 8 символов и не более 30 символов'),
    password2: yup.string().min(8).required().oneOf([yup.ref('password')], 'Пароли не совпадают'),


}).required();

const SignUp = ({ open, onClose }: SignUpProps) => {
    const classes = useStylesAuth()
    const dispatch = useDispatch()

    const data = useSelector(selectData)
    const link = useSelector(selectLink)
    const loadingData = useSelector(selectLoadingState)


    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    });

    const [snackbarState, setSnackbarState] = useState<{ text: string, type: 'error' | 'success' }>()

    const onSubmit = (data: RegisterFormProps) => {
        dispatch(FetchSignUp({email: data.email,  username: data.username, fullname: data.fullname, password: data.password , password2: data.password2}))
    };

    const handleClose = () => {
        dispatch(setUserLoadingState(LoadingState.NEVER))
    }



    React.useEffect(() => {
        if (loadingData === LoadingState.SUCCESS) {
            setSnackbarState({ text: 'регистрация прошла успешно', type: 'success' })
        }
        else if (loadingData === LoadingState.ERROR) {
            setSnackbarState({ text: 'регистрация неуспешна', type: 'error' })
        }
    }, [loadingData])
    React.useEffect(() => {
        return () => {
            handleClose()
        }
    }, [])



    return (
        <ModalBlock title="Создайте учетную запись" onClose={onClose} visible={open}>

            <Snackbar open={loadingData === LoadingState.ERROR || loadingData === LoadingState.SUCCESS} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={snackbarState?.type} sx={{ width: '100%' }}>
                    {snackbarState?.text}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    {...register("username")}
                />
                   <p>{errors.username?.message}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="fullname"
                    label="fullname"
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={!!errors.fullname}
                    {...register("fullname")}
                />
                   <p>{errors.fullname?.message}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={!!errors.email}
                    {...register("email")}
                />
                <p>{errors.email?.message}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    error={!!errors.password}
                    {...register("password")}
                />
                 <p>{errors.password?.message}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password2"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    error={!!errors.password2}
                    {...register("password2")}
                />
                <p>{errors.password2?.message}</p>
                <DialogActions>
                    <LoadingButton
                        loading={loadingData === LoadingState.LOADING}
                        type="submit"
                        size="small"
                        variant="contained"
                        fullWidth
                    >
                        Зарегистрироваться
                              </LoadingButton>
                </DialogActions>
                {link?.link && <Alert severity="success"> Для того, чтобы подтвердить аккаунт, перейдите по этой ссылке <a href={link?.link}>{link?.link}</a> </Alert>}
              
            </form>
        </ModalBlock>
    )
}

export default SignUp
