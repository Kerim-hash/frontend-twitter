import React, { ReactElement } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useStylesImgList } from './theme';
import { fileImg } from '../AddTweetForm';

interface imgListProps{
    edit: boolean,
    obj: {url: string},
    setImages: (callback: (prev: fileImg[]) => fileImg[]) => void
}


const ImgList: React.FC<imgListProps> = ({edit =false,obj, setImages }: imgListProps): ReactElement => {
    const classes = useStylesImgList()

    const removeImg = (url: string) => {
        setImages(prev => prev.filter(obj => obj.url !== url))
    }
    return (
        <div key={obj.url} className={classes.image} style={{ backgroundImage: `url(${obj.url})` }}>
            <IconButton color="inherit" className={classes.closeIcon} onClick={() => removeImg(obj.url)}>
                <CloseIcon />
            </IconButton>
        </div>
    )
}

export default ImgList
