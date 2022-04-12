import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useStylesProfile } from '../../theme';
import { Avatar, Button, IconButton } from '@mui/material';
import { fileImg } from '../../../../components/AddTweetForm';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { uploadImage } from '../../../../utils/uploadImage';
import { FetchUserUpdate } from '../../../../store/ducks/user/actions';
import { useDispatch } from 'react-redux';


export interface SettingsFormProps {
    avatar: string
    about: string
    location: string
    fullname: string
    website: string
}

interface SettingsProps {
    params: string
}


const Settings: React.FC<SettingsProps> = ({params}: SettingsProps): ReactElement => {
    const classes = useStylesProfile()
    const dispatch = useDispatch()
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

    const onSubmit = async (data: SettingsFormProps)  => {
        let result = []
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file
            const { url } = await uploadImage(file)
            result.push(url)
        }
        dispatch(FetchUserUpdate({fullname: data.fullname, about: data.about, location: data.location, website: data.website, avatar: result[0], id: params}))
    };

    

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={classes.settingsWrapper}>
                <div className={classes.backgroundPhoto} onClick={() => handleClickBgImage()} style={{ backgroundImage: `url(${bg[0]?.url})` }}>
                    <IconButton>
                        <AddAPhotoIcon />
                    </IconButton>
                </div>
                <input ref={inputBgRef} type="file" hidden />
                <Avatar className={classes.avatarSettings} sx={{ width: 112, height: 112 }} onClick={() => handleClickImage()} src={images[0]?.url}> <IconButton>
                    <AddAPhotoIcon />
                </IconButton></Avatar>
                <input ref={inputRef} type="file" hidden />
                <TextField id="outlined-basic" label="Имя" variant="outlined" className={classes.TextFieldSettings}  {...register("fullname")}/>
                <TextareaAutosize
                    className={classes.textarea}
                    aria-label="empty textarea"
                    placeholder="О себе"
                    minRows={4}
                    {...register("about")}
                />
                <TextField id="outlined-basic" label="Местоположение" variant="outlined" className={classes.TextFieldSettings}   {...register("location")} />
                <TextField id="outlined-basic" label="Веб-сайт" variant="outlined" className={classes.TextFieldSettings}   {...register("website")}/>

                <Button color="inherit" variant="contained" type="submit"> Сохранить </Button>
            </form>
    )
}

export default Settings
