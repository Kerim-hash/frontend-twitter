import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useStylesProfile } from '../../theme';
import { Avatar, IconButton } from '@mui/material';
import { fileImg } from '../../../../components/AddTweetForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useForm } from "react-hook-form";
import { uploadImage } from '../../../../utils/uploadImage';
import { FetchUserUpdate, setUserLoadingState } from '../../../../store/ducks/user/actions';
import { selectLoadingState } from '../../../../store/ducks/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState, UserType } from '../../../../store/ducks/user/contracts/state';
import { selectData } from '../../../../store/ducks/user/selectors';
import LoadingButton from '@mui/lab/LoadingButton';

export interface SettingsFormProps {
    avatar: string
    about: string
    location: string
    fullname: string
    website: string
}

interface SettingsProps {
    params: string,
}

const Settings: React.FC<SettingsProps> = ({ params }: SettingsProps): ReactElement => {
    const classes = useStylesProfile()
    const dispatch = useDispatch()
    const loading = useSelector(selectLoadingState)
    const [images, setImages] = React.useState<fileImg[]>([] || undefined)
    const [bg, setBg] = React.useState<fileImg[]>([] || undefined)

    const inputRef = React.useRef<HTMLInputElement>(null)
    const inputBgRef = React.useRef<HTMLInputElement>(null)

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    const handleClickBgImage = () => {
        if (inputBgRef.current) {
            inputBgRef.current.click()
        }
    }

    const handleChangeFileInput = React.useCallback(async (event: Event) => {
        if (event.target) {
            const target = (event.target as HTMLInputElement)
            const file = target.files[0]
            if (file) {
                const fileObj = new Blob([file])
                setImages((prev) => [...prev, {
                    url: URL.createObjectURL(fileObj),
                    file
                }])
            }
        }
    }, [])
    const handleChangeFileInputBg = React.useCallback(async (event: Event) => {
        if (event.target) {
            const target = (event.target as HTMLInputElement)
            const file = target.files[0]
            if (file) {
                const fileObj = new Blob([file])
                setBg((prev) => [...prev, {
                    url: URL.createObjectURL(fileObj),
                    file
                }])
            }
        }
    }, [])

    React.useEffect(() => {
        inputRef.current.addEventListener('change', handleChangeFileInput)
        inputBgRef.current.addEventListener('change', handleChangeFileInputBg)
        return () => {
            inputRef.current.removeEventListener('change', handleChangeFileInput)
            inputBgRef.current.removeEventListener('change', handleChangeFileInputBg)
        }
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormProps>();

    const onSubmit = async (data: SettingsFormProps) => {
        dispatch(setUserLoadingState(LoadingState.LOADING))
        const { url } = images.length >= 1 && await uploadImage(images[0]?.file)
        const { url: urlBg } = bg.length >= 1 && await uploadImage(bg[0]?.file)
        const obj = { fullname: data?.fullname, about: data?.about, location: data?.location, website: data?.website, id: params, avatar: url, bgImage: urlBg }
        const res = obj && Object.keys(obj).reduce((acc, key) => {
            const _acc = acc;
            if (obj[key] !== '' && obj[key] !== undefined) _acc[key] = obj[key];
            return _acc;
        }, {})
        dispatch(FetchUserUpdate(res))
    }



    const user = useSelector(selectData)


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.settingsWrapper}>
            <div className={classes.backgroundPhoto} onClick={() => handleClickBgImage()} style={{ backgroundImage: `url(${bg[0] ? bg[0]?.url : user?.bgImage})` }}>
                <IconButton>
                    <AddAPhotoIcon />
                </IconButton>
            </div>
            <input ref={inputBgRef} type="file" hidden />
            <Avatar className={classes.avatarSettings} sx={{ width: 112, height: 112 }} onClick={() => handleClickImage()} src={images[0] ? images[0]?.url : user?.avatar}> <IconButton>
                <AddAPhotoIcon />
            </IconButton></Avatar>
            <input ref={inputRef} type="file" hidden />
            <TextField id="outlined-basic" label="Имя" variant="outlined" className={classes.TextFieldSettings} defaultValue={user?.fullname} {...register("fullname")} />
            <TextareaAutosize
                className={classes.textarea}
                aria-label="empty textarea"
                placeholder="О себе"
                minRows={4}
                defaultValue={user?.about}
                {...register("about")}
            />
            <TextField id="outlined-basic" label="Местоположение" variant="outlined" className={classes.TextFieldSettings} defaultValue={user?.location}  {...register("location")} />
            <TextField id="outlined-basic" label="Веб-сайт" variant="outlined" className={classes.TextFieldSettings} defaultValue={user?.website}   {...register("website")} />

            {/* <Button color="inherit" variant="contained" type="submit" > Сохранить </Button> */}
            <LoadingButton
                loading={loading === LoadingState.LOADING}
                color={loading === LoadingState.LOADING ?  'secondary' : 'inherit'}
                 variant="contained" 
                 type="submit"
            >
                Сохранить
                              </LoadingButton>
           
        </form>
    )
}

export default Settings
