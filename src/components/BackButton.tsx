import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
const BackButton: React.FC = () :React.ReactElement => {
    const navigate = useNavigate();
    return (
        <IconButton  onClick={() => navigate(-1)} style={{marginRight: 23}}>
            <ArrowBackIcon color="icon" />
        </IconButton>
    )
}

export default BackButton
