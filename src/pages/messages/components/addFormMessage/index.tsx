import React, { ReactElement, useState } from 'react'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import UploadImage from '../../../../components/uploadImage';
import { useStylesMessages } from '../../theme';
import { fileImg } from '../../../../components/AddTweetForm';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Picker from 'emoji-picker-react';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { selectData } from '../../../../store/ducks/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

interface MessageFormProps {
    newMessage: string, 
    setNewMessage:  any,
    callMeVideo: () => void,
    handleSubmit: (e: any) => Promise<void>
}

const MessageForm :React.FC<MessageFormProps> = ({newMessage, setNewMessage , handleSubmit, callMeVideo}: MessageFormProps): ReactElement => {
    const classes = useStylesMessages()
    const [images, setImages] = useState<fileImg[]>([] || undefined)
    const [showPicker, setShowPicker] = useState<boolean>(false)
    const onEmojiClick = (_, emojiObject) => {
        setNewMessage(prevInput => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }
    const handleChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.currentTarget) {
            setNewMessage(event.currentTarget.value)
        }
    }
    return (
        <Box className={classes.messageForm}>
            <UploadImage setImages={setImages} images={images} />
            <div className="emojiIcon">
            {showPicker && <Picker onEmojiClick={onEmojiClick} />}
            </div>
            <OutlinedInput
                fullWidth
                className={classes.outlinedInput}
                placeholder="Напишите сообщение"
                value={newMessage}
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPicker(true)}
                            edge="end"
                        >
                            <SentimentSatisfiedAltOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <IconButton onClick={handleSubmit}>
                <SendOutlinedIcon color="primary" />
            </IconButton>
            <NavLink to="/messages/video">
            <IconButton onClick={callMeVideo}>
                <CallOutlinedIcon color="primary" />
            </IconButton>
            </NavLink>
        </Box>
    )
}

export default MessageForm
