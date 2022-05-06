import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropImage'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ModalBlock } from '../Modal';
import DialogActions from '@mui/material/DialogActions';
import Crop169Icon from '@mui/icons-material/Crop169';
import Crop32Icon from '@mui/icons-material/Crop32';
import CropDinIcon from '@mui/icons-material/CropDin';
import { Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useStylesCrop } from './theme';
interface CropProps {
    image: string,
    aspectSize?: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    open: boolean,
    setCroppedImage: (CroppedImageFor: any) => Promise<void>,
}

function Crop({ image, setOpen, open, aspectSize, setCroppedImage }: CropProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(2);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);


    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(croppedImageUrl);
    };
    const handleChange = (event: Event, newValue: number | number[]) => {
        setZoom(newValue as number);
    };
    const classes = useStylesCrop();
    return (
        <ModalBlock title="Обрезать медиафайл" visible={open} onClose={() => setOpen(false)} dialogContent={true}>
            <div className={classes.wrapper}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={!aspectSize ? aspect : aspectSize}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom} />

                <Button color="inherit" size="small" variant="contained" onClick={onCrop} className={classes.button}>Сохранить</Button>
            </div>

            <DialogActions>
                {!aspectSize && <Box display="flex" mr={1}>
                    <IconButton onClick={() => setAspect(4)}><Crop169Icon color="inherit" /></IconButton>
                    <IconButton onClick={() => setAspect(4 / 3)}><Crop32Icon color="inherit" /></IconButton>
                    <IconButton onClick={() => setAspect(0.6)}><CropDinIcon color="inherit" /></IconButton>
                </Box>}
                <Slider aria-label="Volume" value={zoom} onChange={handleChange} min={1} max={5} />
            </DialogActions>
        </ModalBlock>
    );
}

export default Crop
