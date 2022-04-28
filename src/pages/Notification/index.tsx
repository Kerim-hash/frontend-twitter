import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotifications } from '../../store/ducks/Notification/selectors'
import AvatarComponent from '../../components/avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { NavLink } from 'react-router-dom'
import { useStylesNotification } from './theme'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResetNotification } from '../../store/ducks/Notification/actions'
const Notification = () => {
    const notifications = useSelector(selectNotifications)
    const classes = useStylesNotification()
    const sm = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(ResetNotification())
        }
    }, [])
    return (
        <div>
            <Typography variant="body1" style={{ fontWeight: 800, fontSize: 19, padding: '15px 20px' }}>Уведомления</Typography>
            <div>
                {notifications.length <= 0 ? <div style={{ width: sm ? 270 : 320, margin: '40px auto 0', height: '90vh' }}>
                    <Typography variant="h4" style={{ lineHeight: 1.1 }}>Пока нет информации</Typography>
                    <Typography variant="body2" color="#5B6B78" style={{ fontWeight: 500, fontSize: 15, marginTop: 10 }}> Ретвиты, отметки «Нравится» и многое другое — здесь будут показаны все взаимодействия с контентом.</Typography>
                </div>
                 : notifications?.map((item, index) => {
                    return <Paper color="action.main" variant="outlined" className={classes.paper}>
                        <NavLink to={item.type === 3 ? '/messages' : `/home/tweet/${item?.tweetId}`} className={classes.link}>
                            <Box display="flex" flexDirection="column" style={{ marginLeft: 10, marginTop: 10 }}>
                                <AvatarComponent avatar={item?.avatar} />
                                <Box display="flex" mt={1} mb={1}>
                                    <Typography variant="body1">@{item?.senderName}</Typography>
                                    <Typography variant="body1" ml={1}>{item.type === 1 ? 'нравится ваш твит' : item.type === 1  ? ' прокомментировал ваш пост': "Звонит"}</Typography>
                                </Box>
                            </Box>
                        </NavLink>
                    </Paper>
                })
                }
            </div>
        </div>
    )
}

export default Notification
