import React, {useState} from 'react';
import axios from "axios";

function Profile({user, setUser}) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isToChangePass, setIsToChangePass] = useState(false);
    // const [errorCode, setErrorCode] = useState(null);
    // const [success, setSuccess] = useState(false);

    const checkEmail = () => {
        if ((email !== user.email) &&
            (email.includes('@') && email.includes('.') && (email.indexOf('@') > 0) && (email.lastIndexOf('.') - email.indexOf('@') > 1))){
            return true;
        }
        return false;
    }

    const checkPassword = () => {
        if ((currentPassword === user.password) && (newPassword.length >= 8) && (newPassword === repeatPassword) && (currentPassword !== newPassword)) {
            return true;
        }
        return false;
    }

    // const update = (category) => {
    //     axios.get("http://localhost:9124/change-profile",
    //         {
    //             params: {
    //                 category: category,
    //                 toChange: [category],
    //                 secret: user.secret
    //             }
    //         })
    //         .then(response => {
    //             setUser(response.data);
    //             // setSuccess(response.data.success)
    //             // setErrorCode(response.data.errorCode)
    //         }).catch(()=>{
    //         // setErrorCode(9)
    //     })
    // }

    const updateEmail = () => {
        axios.get("http://localhost:9124/change-profile",
            {
                params: {
                    category: "email",
                    toChange: email,
                    secret: user.secret
                }
            })
            .then(response => {
                setUser(response.data);
                // setSuccess(response.data.success)
                // setErrorCode(response.data.errorCode)
            }).catch(()=>{
            // setErrorCode(9)
        })
    }

    const updateUsername = () => {
        axios.get("http://localhost:9124/change-profile",
            {
                params: {
                    category: "username",
                    toChange: username,
                    secret: user.secret
                }
            })
            .then(response => {
                setUser(response.data);
                // setSuccess(response.data.success)
                // setErrorCode(response.data.errorCode)
            }).catch(()=>{
            // setErrorCode(9)
        })
    }

    const updatePassword = () => {
        axios.get("http://localhost:9124/change-profile",
            {
                params: {
                    category: "password",
                    toChange: newPassword,
                    secret: user.secret
                }
            })
            .then(response => {
                setUser(response.data);
                // setSuccess(response.data.success)
                // setErrorCode(response.data.errorCode)
            }).catch(()=>{
            // setErrorCode(9)
        })
        resetChangePassword();
    }

    const resetChangePassword = () => {
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
        setIsToChangePass(false);
    }

    return (
        <div>
            <h2>Profile</h2>
            <div>
                Your username: {
                <input value={username} placeholder={user.username} onChange={(event) => {
                    setUsername(event.target.value)
                }}/>
            }
                <button disabled={(username === user.username)} onClick={updateUsername}>save</button>
            </div>
            <div>
                Your email: {
                <input value={email} placeholder={user.email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            }
                <button disabled={!checkEmail()} onClick={updateEmail}>save</button>
            </div>
            {
                isToChangePass ?
                    <div>
                        <div>
                            Current password:
                            <input value={currentPassword} onChange={(event) => {
                                setCurrentPassword(event.target.value)
                            }}/>
                        </div>
                        <div>
                            New password:
                            <input value={newPassword} onChange={(event) => {
                                setNewPassword(event.target.value)
                            }}/>
                        </div>
                        <div>
                            Repeat password:
                            <input value={repeatPassword} onChange={(event) => {
                                setRepeatPassword(event.target.value)
                            }}/>
                        </div>
                        <button disabled={!checkPassword()} onClick={updatePassword}>SAVE</button>
                        <button onClick={resetChangePassword}>CANCEL</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => {
                            setIsToChangePass(true)
                        }}>Change Password
                        </button>
                    </div>
            }
            {/*<div>{user.username}</div>*/}
            {/*<div>{user.email}</div>*/}
            {/*<div>{user.password}</div>*/}
        </div>
    );
}

export default Profile;