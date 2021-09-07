import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0(); 

    return(
        isAuthenticated && (
            <div className="profile">
                <h3>Hi, {user.given_name}</h3>
            </div> 
        )
    )
}

export default Profile