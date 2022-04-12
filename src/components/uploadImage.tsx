import React, { ReactElement, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import CollectionsIcon from '@mui/icons-material/Collections';
import {fileImg} from './AddTweetForm/index'
interface UploadImageProps {
    setImages: (callback: (prev: fileImg[]) => fileImg[]) => void,
    images?: fileImg[]
}

const UploadImage: React.FC<UploadImageProps> = ({ setImages , images}: UploadImageProps): ReactElement => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeFileInput = React.useCallback( async (event: Event) => {
        if (event.target) {
            const target = (event.target as HTMLInputElement)
            const file = target.files[0]
            if (file) {
                const fileObj = new Blob([file])
                setImages((prev) => [...prev, {
                    url: URL.createObjectURL(fileObj),
                    file
                }])
            }
        }
    }, [])

    React.useEffect(() => {
        inputRef.current.addEventListener('change', handleChangeFileInput)
        return () => {
            inputRef.current.removeEventListener('change', handleChangeFileInput)
        }
    }, [])

    return (
        <div>
            <IconButton color="primary" onClick={() => handleClickImage()} disabled={images?.length >= 4 }>
                <CollectionsIcon />
            </IconButton>
            <input ref={inputRef} type="file" hidden />

        </div>
    )
}

export default UploadImage
