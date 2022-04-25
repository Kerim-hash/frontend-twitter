import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { selectData } from '../../store/ducks/user/selectors';
import { useDispatch, useSelector } from 'react-redux'
import { Tweet } from '../../store/ducks/tweets/contracts/state';
import { TweetComponent } from '../../components/Tweet';
import { useMediaQuery } from '@mui/material';

const Bookmarks = () => {
    const user = useSelector(selectData)
    const sm = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Box display='flex' alignItems="flex-start" flexDirection="column" style={{ padding: 15,  }} >
                <Typography variant="body1" style={{ fontWeight: 800, fontSize: 19, lineHeight: 1 }}>Закладки</Typography>
                <Typography variant="body2" color="#536471" style={{ fontWeight: 500, fontSize: 14, }}>@{user?.username}</Typography>
            </Box>
            {
                true ? <div style={{ width: sm ? 270 : 320, margin: '40px auto 0', height: '90vh' }}>
                    <img src="https://abs.twimg.com/sticky/illustrations/empty-states/book-in-bird-cage-400x200.v1.png" alt="book in bird" style={{ width: 'inherit', marginBottom: '30px' }} />
                    <Typography variant="h4" style={{ lineHeight: 1.1 }}>Сохраняйте твиты на потом</Typography>
                    <Typography variant="body2" color="#5B6B78" style={{ fontWeight: 500, fontSize: 15, marginTop: 10 }}>Не теряйте из виду хорошие твиты! Добавляйте их в закладки, чтобы без труда возвращаться в ним в будущем.</Typography>
                </div> : user?.bookmarks.map((tweet: Tweet) => {
                    return <TweetComponent
                        key={tweet._id}
                        user={tweet.user}
                        _id={tweet._id}
                        text={tweet.text}
                        createdAt={tweet.createdAt}
                        images={tweet.images}
                        likes={tweet.likes}
                        comment={tweet.comment}
                       bookmarks={tweet.bookmarks}
                    />
                })
            }
        </>
    )
}
export default Bookmarks
