import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0(); 

    return(
        <div className="profile">
            <h3>{isAuthenticated ? "Hi, " + user.given_name : "Guest"}</h3>
        </div>
    )
}

export default Profile