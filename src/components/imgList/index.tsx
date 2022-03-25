import React, { ReactElement } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useStylesImgList } from './theme';
import { fileImg } from '../AddTweetForm';
interface imgListProps {
    edit?: boolean,
    images: fileImg[] | string[],
    setImages?: (callback: (prev: fileImg[]) => fileImg[]) => void,
    setToggle?: (event: React.MouseEvent<HTMLElement>, i?: number) => any
}


const ImgList: React.FC<imgListProps> = ({ edit = false, images, setImages, setToggle }: imgListProps): ReactElement | null => {
    const classes = useStylesImgList()

    const removeImg = (url: string) => {
        setImages(prev => prev.filter(obj => obj.url !== url))
    }

    if (images && images.length === 0) {
        return null
    }
    const imagesList = images.map((obj) => ({
        src: obj.url ? obj.url : obj
    }));

    return (
        <div className={classes.ImagesList}>
            {images.map((obj, i) => {
                return (
                    <div key={i} onClick={(e) => setToggle(e, i)}  className={classes.image} style={{ backgroundImage: `url(${obj.url ? obj.url : obj})` }}>
                        {edit && <IconButton color="inherit" className={classes.closeIcon} onClick={() => removeImg(obj.url)}>
                            <CloseIcon />
                        </IconButton>}
                    </div>
                )
            })}
        </div>
    )
}

export default ImgList
