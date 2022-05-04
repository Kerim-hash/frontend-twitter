import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropImage'
import Button from '@mui/material/Button';


interface CropProps {
    image: string,
    setCroppedImageFor: React.Dispatch<any>
}

const Crop = ({ image, setCroppedImage }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])


    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
        // setCroppedImageFor(croppedImageUrl);
        setCroppedImage(croppedImageUrl)
    };
    return (
        <div style={{ width: '450px', height: '500px', position: 'relative' }}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />

            <Button color="inherit" onClick={onCrop}  style={{ position: 'absolute', zIndex: 999, right: '0px', top: '0px' }}>Crop</Button>
        </div>
    )
}

export default Crop
