import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import GifIcon from '@mui/icons-material/GifBoxOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddCommnetTweet, setAddFormCommnetTweet } from '../../store/ducks/tweets/actionCreators';
import { selectAddCommentState, selectIsTweetLoading } from '../../store/ducks/tweets/selectors';
import { AddCommentState } from '../../store/ducks/tweets/contracts/state';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadImage from '../uploadImage';
import { useStylesAddForm } from './theme'
import { uploadImage } from '../../utils/uploadImage';
import Picker from 'emoji-picker-react';
import ImgList from '../imgList';
import { selectData } from '../../store/ducks/user/selectors'
import AvatarComponent from '../avatar';

interface AddTweetFormProps {
    maxRows?: number,
    minRows?: number,
    id: string,
    fullname: string,
    username: string
}


export interface fileImg {
    url: string;
    file: File;
}

export const AddComentForm: React.FC<AddTweetFormProps> = ({ maxRows, minRows = 2, id, fullname, username }: AddTweetFormProps): React.ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesAddForm()
    
    const addFormState = useSelector(selectAddCommentState)
    const userData = useSelector(selectData)

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
        let result: string[] = []
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file
            const { url } = await uploadImage(file)
            result.push(url)
        }
        dispatch(fetchAddCommnetTweet({ text: Textarea, images: result, userID: userData._id, tweetID: id, author: { username: username, fullname: fullname } }))
        images.length = 0
        setTextarea('')
    }

    const onEmojiClick = (_, emojiObject) => {
        setTextarea(prevInput => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }

    console.log(addFormState)

    return (
        <Box >
            <Box className={classes.addTweetForm}>

            <AvatarComponent user={userData}  />
                <div className={classes.tweetHeaderForm}>
                    <TextareaAutosize
                        className={classes.textarea}
                        placeholder="Твитуть в ответ"
                        minRows={minRows}
                        maxRows={maxRows}
                        onChange={handleChange}
                        value={Textarea}
                        required
                    />
                    {images && <ImgList images={images} setImages={setImages} edit />}
                    <Box className={classes.tweetHeaderFormActions} style={{ position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <UploadImage setImages={setImages} />
                            <IconButton color="primary">
                                <GifIcon />
                            </IconButton>

                            {showPicker && <Picker onEmojiClick={onEmojiClick} />}


                            <IconButton color="primary" onClick={() => setShowPicker(true)}>
                                <SentimentSatisfiedAltOutlinedIcon />
                            </IconButton>


                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ position: 'relative' }}>
                            <LoadingButton
                                loading={addFormState === AddCommentState.LOADING}
                                size="small" variant="contained"
                                style={{ marginLeft: 20, height: 35 }}
                                disabled={textLimitParsent >= 100}
                                onClick={handleClickAddTweet}
                            >
                                Ответить
                              </LoadingButton>
                        </Box>
                    </Box>
                </div>
            </Box>
            {addFormState === AddCommentState.ERROR && <Alert severity="error" sx={{ marginTop: '10px' }}>Ошибка при добавлении твита :(</Alert>}
        </Box>
    )
}
