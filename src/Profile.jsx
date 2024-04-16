import React from 'react';

function Profile({user, setUser}) {
    return (
        <div>
            <h2>Profile</h2>
            <div>Your username: {user.username}</div>
            <div>Your email: {user.email}</div>

        </div>
    );
}

export default Profile;