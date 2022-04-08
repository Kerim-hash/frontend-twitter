import React from 'react'
import { Routes , Route} from 'react-router';
import ProfileFollowers from './components/followers';
import Index from './components/Index';

const Profile = () => {
    return (
        <Routes>
            <Route index  element={<Index />} />
            <Route path="/followers" element={<ProfileFollowers />} />
        </Routes>
    )
}

export default Profile
