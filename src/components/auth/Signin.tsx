import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { ModalBlock } from '../../components/Modal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSignIn, setUserLoadingState } from '../../store/ducks/user/actions';
import { selectData, selectLoadingState } from '../../store/ducks/user/selectors';
import { LoadingState } from '../../store/ducks/user/contracts/state';

interface SigninProps {
    open: boolean;
    onClose: () => void;
}

export interface LoginFormProps {
    username: string
    password: string
}


const LoginFormSchema = yup.object({
    username: yup.string().required('Введите имя'),
    password: yup.string().min(8).required("пароль должен быть не менее 8 символов"),
}).required();

const Signin = ({ open, onClose }: SigninProps) => {
    const dispatch = useDispatch()
    const loadingData = useSelector(selectLoadingState)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });

    const [snackbarState, setSnackbarState] = useState<{ text: string, type: 'error' | 'success' }>()

    const onSubmit = (data: LoginFormProps) => {
        dispatch(FetchSignIn({ username: data.username, password: data.password }))
    };

    const handleClose = () => {
        dispatch(setUserLoadingState(LoadingState.NEVER))
    }



    React.useEffect(() => {
        if (loadingData === LoadingState.SUCCESS) {
            setSnackbarState({ text: 'авторизация успешно пройдена', type: 'success' })
        }
        else if (loadingData === LoadingState.ERROR) {
            setSnackbarState({ text: 'Неверный логин или пароль', type: 'error' })
        }
       
    }, [loadingData])

    React.useEffect(() => {
        return () => {
            dispatch(setUserLoadingState(LoadingState.NEVER))
        }
    }, [])


    return (
        <ModalBlock title="Вход в Твиттер" onClose={onClose} visible={open}>
            <Snackbar open={loadingData === LoadingState.ERROR || loadingData === LoadingState.SUCCESS} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={snackbarState?.type} sx={{ width: '100%' }}>
                    {snackbarState?.text}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    margin="dense"
                    id="name"
                    label="Email Address or Login"
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    {...register("username")}
                />
                <p>{errors.username?.message}</p>
                <TextField
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
                <DialogActions>
                    <LoadingButton
                        loading={loadingData === LoadingState.LOADING}
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Войти
                              </LoadingButton>
                </DialogActions>
            </form>
        </ModalBlock>
    )
}

export default Signin
