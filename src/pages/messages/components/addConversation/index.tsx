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

interface AddConversationDialogProps {
    handleClose: () => void,
    open: boolean,
    addConversations: (any) => void
}

const AddConversationDialog: React.FC<AddConversationDialogProps> = ({handleClose, open, addConversations}: AddConversationDialogProps): ReactElement => {
    const dispatch = useDispatch()
    const classes = useStylesMessages()
    const userData = useSelector(selectSearchUser)
    const [search, setSearch] = React.useState<string>("");
    let handleChange = (search) => setSearch(search)
    const debounceChange = useDebounce(handleChange, 500);

    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
    };
    React.useEffect(() => {
        if (search) {
            dispatch(FetchSearchUser(search))
        }
    }, [search])

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
            {userData !== undefined && userData?.length > 0 && userData.map((item: UserType) => {
                return <Box className={classes.searchUser} onClick={() => addConversations(item)}>
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
