import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import GifIcon from '@mui/icons-material/GifBoxOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddFormLoadingState } from '../../store/ducks/tweets/actionCreators';
import { selectAddFormState} from '../../store/ducks/tweets/selectors';
import { AddFormState } from '../../store/ducks/tweets/contracts/state';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadImage from '../uploadImage';
import { useStylesAddForm } from './theme'
import { uploadImage } from '../../utils/uploadImage';
import Picker from 'emoji-picker-react';
import ImgList from '../imgList';
import { selectData } from '../../store/ducks/user/selectors'
import AvatarComponent from '../avatar';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material';
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
    const textLimitParent = Math.round(Textarea.length / 280 * 100)
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [images, setImages] = useState<fileImg[]>([] || undefined)
    
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget) {
            setTextarea(event.currentTarget.value)
        }
    }

    const handleClickAddTweet = async () => {
        dispatch(setAddFormLoadingState(AddFormState.LOADING))
        let result: string[] = []
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

                            <IconButton color="primary" className={classes.iconButton}>
                                <GifIcon />
                            </IconButton>

                            {showPicker && <Picker onEmojiClick={onEmojiClick} />}


                            {sm && <IconButton color="primary" onClick={() => setShowPicker(true)} className={classes.iconButton}>
                                <SentimentSatisfiedAltOutlinedIcon />
                            </IconButton>}


                            <IconButton color="primary" className={classes.iconButton}>
                                <EventOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ position: 'relative', alignItems: 'self-end', }}>
                            <Box className={classes.Progress}>
                                <CircularProgress
                                    variant="determinate"
                                    size={22}
                                    thickness={4}
                                    value={textLimitParent >= 100 ? 100 : textLimitParent}
                                    style={{ color: textLimitParent >= 100 ? 'red' : undefined }}
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
                                disabled={textLimitParent >= 100 || Textarea === '' }
                                onClick={handleClickAddTweet}
                            >
                             {sm ? 'Твитнуть' : <svg width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.7764 3.02957C3.97191 3.02957 4.13041 3.18806 4.13041 3.38357V5.86163H6.60846C6.80397 5.86163 6.96247 6.02012 6.96247 6.21563C6.96247 6.41115 6.80397 6.56964 6.60846 6.56964H4.13041V9.0477C4.13041 9.24321 3.97191 9.4017 3.7764 9.4017C3.58089 9.4017 3.42239 9.24321 3.42239 9.0477V6.56964H0.94434C0.748827 6.56964 0.590332 6.41115 0.590332 6.21563C0.590332 6.02012 0.748827 5.86163 0.94434 5.86163L3.42239 5.86163V3.38357C3.42239 3.18806 3.58089 3.02957 3.7764 3.02957Z" fill="white" />
                            <path d="M20.9322 0.551471C7.4254 3.25282 3.20454 16.3094 2.36037 22.4999C4.89289 13.2141 9.95792 12.3699 12.4904 12.3699C15.023 12.3699 17.5555 9.83736 15.8671 9.83736C13.275 9.83736 12.7169 8.14902 13.3346 8.14902C21.4387 6.79834 24.511 -0.164254 20.9322 0.551471Z" fill="white" />
                        </svg>
                        }
                              </LoadingButton>
                        </Box>
                    </Box>
                </div>
            </Box>

            {addFormState === AddFormState.ERROR && <Alert severity="error" sx={{ marginTop: '10px' }}>Что-то пошло не так, но не беспокойтесь — давайте попробуем еще раз.</Alert>}
        </Box>
    )
}
