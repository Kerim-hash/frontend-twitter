import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import GifIcon from '@mui/icons-material/GifBoxOutlined';
import Avatar from '@mui/material/Avatar';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddFormLoadingState } from '../../store/ducks/tweets/actionCreators';
import { selectAddFormState} from '../../store/ducks/tweets/selectors';
import { AddFormState } from '../../store/ducks/tweets/contracts/state';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import UploadImage from '../uploadImage';
import { useStylesAddForm } from './theme'
import { uploadImage } from '../../utils/uploadImage';
import Picker from 'emoji-picker-react';
import ImgList from '../imgList';
import { selectData } from '../../store/ducks/user/selectors'
import AvatarComponent from '../avatar';

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
    const userData = useSelector(selectData) 
    const [Textarea, setTextarea] = useState<string>("")
    const textLimitParsent = Math.round(Textarea.length / 280 * 100)

    const [images, setImages] = useState<fileImg[]>([] || undefined)
    
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget) {
            setTextarea(event.currentTarget.value)
        }
    }

    const handleClickAddTweet = async () => {
        dispatch(setAddFormLoadingState(AddFormState.LOADING))
        let result = []
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file
            const { url } = await uploadImage(file)
            result.push(url)
        }
        dispatch(fetchAddTweet({ text: Textarea, images: result }))
        setTextarea('')
        images.length = 0
    }

    const onEmojiClick = (_, emojiObject) => {
        setTextarea(prevInput => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }


    return (
        <Box>
            <Box className={classes.addTweetForm}>
                <AvatarComponent user={userData}  />
                <div className={classes.tweetHeaderForm}>
                    <TextareaAutosize
                        className={classes.textarea}
                        placeholder="Что происходит?"
                        minRows={minRows}
                        maxRows={maxRows}
                        onChange={handleChange}
                        value={Textarea}
                        required
                    />
                    {images && <ImgList images={images} setImages={setImages} edit />}
                    <Box className={classes.tweetHeaderFormActions} style={{ position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <UploadImage setImages={setImages} images={images}/>

                            <IconButton color="primary">
                                <GifIcon className={classes.icon}/>
                            </IconButton>

                            {showPicker && <Picker onEmojiClick={onEmojiClick} />}


                            <IconButton color="primary" onClick={() => setShowPicker(true)}>
                                <SentimentSatisfiedAltOutlinedIcon className={classes.icon}/>
                            </IconButton>


                            <IconButton color="primary">
                                <EventOutlinedIcon className={classes.icon}/>
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ position: 'relative', alignItems: 'self-end', }}>
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
                                size="small"
                                variant="contained"
                                className={classes.button}
                                disabled={textLimitParsent >= 100}
                                onClick={handleClickAddTweet}
                            >
                                Твитнуть
                              </LoadingButton>
                        </Box>
                    </Box>
                </div>
            </Box>
            {addFormState === AddFormState.ERROR && <Alert severity="error" sx={{ marginTop: '10px' }}>Что-то пошло не так, но не беспокойтесь — давайте попробуем еще раз.</Alert>}
        </Box>
    )
}
