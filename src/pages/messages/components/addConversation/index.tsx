import React, { ReactElement } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useStylesMessages } from '../../theme';
import IconButton from '@mui/material/IconButton';
import AvatarComponent from '../../../../components/avatar';
import SearchIcon from '@mui/icons-material/Search';
import { UserType } from '../../../../store/ducks/user/contracts/state';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchUser } from '../../../../store/ducks/user/selectors';
import { useDebounce } from '../../../../hook/useDebounce';
import { FetchSearchUser } from '../../../../store/ducks/user/actions';
import { FetchAddConversation } from '../../../../store/ducks/Messages/actions';
import { ConversationType } from '../../../../store/ducks/Messages/contracts/state';
import classnames from 'classnames'

interface AddConversationDialogProps {
    handleClose: () => void,
    open: boolean,
    userID: string, 
    conversations: ConversationType[]
}

const AddConversationDialog: React.FC<AddConversationDialogProps> = ({handleClose, open, userID, conversations}: AddConversationDialogProps): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesMessages()
    const userData = useSelector(selectSearchUser)
    const [search, setSearch] = React.useState<string>("");
    let handleChange = (search: string) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceChange(e.target.value);
    };
    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
        // eslint-disable-next-line
    }, [search])

    const addConversations = (item: UserType) => {
        dispatch(FetchAddConversation({ senderId: userID, receiverId: item._id }))
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth scroll={'paper'} className={classes.dialog}>
        <Box display="flex" alignItems="center">
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <DialogTitle style={{ padding: 10, fontWeight: 600 }}>Новое сообщение</DialogTitle>
        </Box>
        <div style={{ padding: '0 0 20px 0' }}>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                type="email"
                placeholder="Поиск людей"
                onChange={handleChangeSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" style={{ padding: '0 0 0 16px' }}>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                style={{ marginTop: '10px' }}
                variant="standard"
            />
            <div>

            </div>
        </div>
        <div>
            {userData !== undefined && userData?.length > 0 && userData.map((item: UserType, index) => {
                return <Box className={classnames(classes.searchUser, {[classes.desabled]: Array.isArray(conversations) && conversations[index]?.members.includes(item?._id)})} onClick={() => addConversations(item)}>
                    <AvatarComponent user={item} />
                    <Box className={classes.userinfo}>
                        <Typography variant="body1" className={classes.fullname}>{item?.fullname}</Typography>
                        <Typography variant="body1" className={classes.username}>@{item?.username}</Typography>
                    </Box>
                </Box>
            })}
        </div>
    </Dialog>
    )
}

export default AddConversationDialog
