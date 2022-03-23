import { imageListClasses } from "@mui/material"
import { istance } from "../core/axios"


interface UploadImageReturnProps {
    height: number,
    width: number,
    url: string
}

export const uploadImage = async (image: any): Promise<UploadImageReturnProps> => {
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await istance.post('/uploud', formData)
    return data
}