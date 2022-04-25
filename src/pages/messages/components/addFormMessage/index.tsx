import React, { ReactElement, useState, useContext } from 'react'
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
import { useDispatch} from 'react-redux';
import { SocketContext } from '../../../../Context';
import { sendMessage } from '../../../../store/ducks/Messages/actions';
import { UserType } from '../../../../store/ducks/user/contracts/state';

interface MessageFormProps {
    callMeVideo: () => void,
    user: UserType,
    receiverId: string,
    CurrentConversation?: string
}

const MessageForm: React.FC<MessageFormProps> = ({callMeVideo, user, receiverId, CurrentConversation}: MessageFormProps): ReactElement => {
    const classes = useStylesMessages()
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext);
    const [images, setImages] = useState<fileImg[]>([] || undefined)
    const [showPicker, setShowPicker] = useState<boolean>(false)
    const [newMessage, setNewMessage] = useState("");

    const onEmojiClick = (_, emojiObject) => {
        setNewMessage(prevInput => prevInput + emojiObject.emoji)
        setShowPicker(false)
    }
    const handleChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.currentTarget) {
            setNewMessage(event.currentTarget.value)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = await {
            sender: user._id,
            text: newMessage,
            conversationId: CurrentConversation,
        };
        await socket.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        dispatch(sendMessage(message))
        setNewMessage("");
    };
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
            <IconButton onClick={(e) => handleSubmit(e)}>
                <SendOutlinedIcon color="primary" />
            </IconButton>
            <IconButton onClick={callMeVideo}>
                <CallOutlinedIcon color="primary" />
            </IconButton>
        </Box>
    )
}

export default MessageForm
