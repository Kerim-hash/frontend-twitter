import React, { ReactElement, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useStylesImgList } from './theme';
import { fileImg } from '../AddTweetForm';
import classnames from 'classnames'
import Crop from '../Crop';
import { ModalBlock } from '../Modal'

interface imgListProps {
    edit?: boolean,
    images: fileImg[] | string[],
    setImages?: (callback: (prev: fileImg[]) => fileImg[]) => void,
    setToggle?: (event: React.MouseEvent<HTMLElement>, i?: number) => any
}


const ImgList: React.FC<imgListProps> = ({ edit = false, images, setImages, setToggle }: imgListProps): ReactElement | null => {
    const classes = useStylesImgList()
    const [crop, setCrop] = useState(false)
    const [selectedImage, setSelectedImage] = useState<{ image: string, id: number }>({ image: '', id: null });
    const removeImg = (url: string) => {
        setImages(prev => prev.filter(obj => obj.url !== url))
    }

    if (images && images.length === 0) {
        return null
    }

    const selectedIMageCrop = (image, i) => {
        setSelectedImage({ image, id: i });
        setCrop(true)
    }

    const setCroppedImage = async (CroppedImageFor) => {
        let blob = await fetch(CroppedImageFor).then(r => r.blob());
        const file = new File([blob], "https://bit.ly/3vsUaOe", {
            type: blob.type,
        });
        const arr: fileImg = images[selectedImage.id]
        arr.url = CroppedImageFor
        arr.file = file
        setSelectedImage(null);
        setCrop(false)
    };

    return (
        <div className={classnames({ [classes.ImagesListEdit]: edit, [classes.ImagesList]: images.length >= 2 })}>
            {images.map((obj, i) => {
                return (
                    <div key={i} onClick={(e) => setToggle(e, i)}
                        className={classnames(classes.image, { [classes.coupleImage]: images.length === 2 && !edit, [classes.FullImage]: images.length === 4 && !edit, [classes.FullImageEdit]: images.length === 4 && edit, [classes.singleImage]: images.length === 1, [classes.treeImage]: images.length === 3 && !edit, [classes.coupleImageEdit]: images.length === 2, [classes.treeImageEdit]: images.length === 3 && edit })} style={{ backgroundImage: `url(${obj?.url ? obj.url : obj})` }}>
                        {edit && <IconButton color="inherit" className={classes.closeIcon} onClick={() => removeImg(obj.url)}>
                            <CloseIcon />
                        </IconButton>}
                        {edit && <Button color="inherit" className={classes.changeIcon} onClick={() => selectedIMageCrop(obj.url ? obj.url : obj, i)}>
                            Изменить
                        </Button>}
                    </div>
                )
            })}
            <Crop image={selectedImage?.image} setCroppedImage={setCroppedImage} setOpen={setCrop} open={crop}/>
        </div>
    )
}

export default ImgList
