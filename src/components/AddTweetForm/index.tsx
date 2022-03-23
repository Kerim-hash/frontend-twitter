import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import GifIcon from '@mui/icons-material/GifBoxOutlined';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddFormLoadingState } from '../../store/ducks/tweets/actionCreators';
import { selectAddFormState, selectIsTweetLoading } from '../../store/ducks/tweets/selectors';
import { AddFormState } from '../../store/ducks/tweets/contracts/state';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import UploadImage from '../uploadImage';
import { useStylesAddForm } from './theme'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../utils/uploadImage';
import Picker from 'emoji-picker-react';


interface AddTweetFormProps {
    maxRows?: number,
    minRows?: number
}


export interface fileImg {
    url: string;
    file: File;
}


export const AddTweetForm: React.FC<AddTweetFormProps> = ({ maxRows, minRows = 2 }: AddTweetFormProps): React.ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesAddForm()
    const addFormState = useSelector(selectAddFormState)
    const isTweetLoading = useSelector(selectIsTweetLoading)
    const [Textarea, setTextarea] = useState<string>("")
    const textLimitParsent = Math.round(Textarea.length / 280 * 100)

    const [images, setImages] = useState<fileImg[]>([] || undefined)
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const removeImg = (url: string) => {
        setImages(prev => prev.filter(obj => obj.url !== url))
    }



    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget) {
            setTextarea(event.currentTarget.value)
        }
    }

    const handleClickAddTweet = async () => {
        dispatch(setAddFormLoadingState(AddFormState.LOADING))
        let result = []
        for (let i = 0; i < images.length; i++) {
            const file= images[i].file
            const { url } = await uploadImage(file)
            result.push(url)
        }
        dispatch(fetchAddTweet({text: Textarea, images: result}))
        setTextarea('')
        images.length = 0
    }

    const onEmojiClick = (_, emojiObject) => {
        setTextarea(prevInput => prevInput +  emojiObject.emoji)
        setShowPicker(false)
    }


    return (
        <Box >
            <Box className={classes.addTweetForm}>
               
                <Avatar alt="K N" src="/static/images/avatar/1.jpg" />
                <div className={classes.tweetHeaderForm}>
                    <TextareaAutosize
                        className={classes.textarea}
                        aria-label="empty textarea"
                        placeholder="Что происходит?"
                        minRows={minRows}
                        maxRows={maxRows}
                        onChange={handleChange}
                        value={Textarea}
                    />

                    <div className={classes.ImagesList}>
                        {images.map((obj, i) => {
                            return (
                                <>
                                    <div key={obj.url} className={classes.image} style={{ backgroundImage: `url(${obj.url})` }}>
                                        <IconButton color="inherit" className={classes.closeIcon} onClick={() => removeImg(obj.url)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                    <Box className={classes.tweetHeaderFormActions} style={{position: 'relative'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <UploadImage setImages={setImages} />
                            <IconButton color="primary">
                                <GifIcon />
                            </IconButton>

                            {showPicker && <Picker onEmojiClick={onEmojiClick} />}


                            <IconButton color="primary" onClick={() => setShowPicker(true)}>
                                <SentimentSatisfiedAltOutlinedIcon />
                            </IconButton>


                            <IconButton color="primary">
                                <EventOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ position: 'relative' }}>
                            <Box className={classes.Progress}>
                                <CircularProgress
                                    variant="determinate"
                                    size={22}
                                    thickness={4}
                                    value={textLimitParsent >= 100 ? 100 : textLimitParsent}
                                    style={{ color: textLimitParsent >= 100 ? 'red' : undefined }}
                                />
                                <CircularProgress
                                    variant="determinate"
                                    size={22}
                                    thickness={4}
                                    value={100}
                                    style={{ color: 'rgba(0,0,0, 0.1)' }}
                                />
                            </Box>
                            <LoadingButton
                                loading={addFormState === AddFormState.LOADING}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                size="small" variant="contained"
                                style={{ marginLeft: 20, height: 35 }}
                                disabled={textLimitParsent >= 100}
                                onClick={handleClickAddTweet}
                            >
                                Твитнуть
                              </LoadingButton>
                        </Box>
                    </Box>
                </div>
            </Box>
            {addFormState === AddFormState.ERROR && <Alert severity="error">Ошибка при добавлении твита :(</Alert>}
        </Box>
    )
}
