import React, { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTags } from '../store/ducks/tags/actionCreators'
import { selectTagsItems, selectIsTagsLoaded } from '../store/ducks/tags/selectors'
import { TagsState } from '../store/ducks/tags/contracts/state';
import { useStylesHome } from '../pages/Home/theme';
import { Link } from 'react-router-dom'

interface tagsProps {
    classes: ReturnType<typeof useStylesHome>;
    items?: TagsState['items'],
}

export const Tags: React.FC<tagsProps> = ({ classes, items }: tagsProps): React.ReactElement | null => {
    const dispatch = useDispatch()
    const tags = useSelector(selectTagsItems)
    const loading = useSelector(selectIsTagsLoaded)

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])
    // if()
    return (
        <Paper elevation={3} sx={{ padding: '0 10px 20px', borderRadius: 5, background: "#f7f9f9", boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="h5">Актуальные темы для вас</Typography>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </Box>
            {Array.isArray(tags)  && tags.map(item => {
                return <React.Fragment key={item._id}>
                 <Link to={`/home/search?q=${item.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Актуальные темы: {item.name}</Typography>
                            <Typography variant="body1">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">Твитов: {item.count}</Typography>
                        </Box>
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                </Link>
                </React.Fragment>
            })}

            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', }}>
                {/* <Link color="text.lightBlue" variant="body2" >Показать ёще</Link> */}
            </Box>
        </Paper>
    )
}

