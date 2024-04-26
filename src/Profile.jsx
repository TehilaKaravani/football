import React, {useState} from 'react';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';


function Profile({user, setUser}) {
    const [username, setUsername] = useState(user?(user.username):"");
    const [email, setEmail] = useState(user?(user.email):"");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isToChangePass, setIsToChangePass] = useState(false);


    const checkEmail = () => {
        if ((email !== user.email) &&
            (email.includes('@') && email.includes('.') && (email.indexOf('@') > 0) && (email.lastIndexOf('.') - email.indexOf('@') > 1))){
            return true;
        }
        return false;
    }

    const checkUsername = () => {
        return (username === user.username);
    }

    const checkPassword = () => {
        if ((newPassword.length >= 8) && (newPassword === repeatPassword) && (currentPassword !== newPassword)) {
            return true;
        }
        return false;
    }

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
                setUser(response.data.user);
                setUsername(response.data.user.username)
                setEmail(response.data.user.email)

                if (response.data.success) {
                    toast.success("The email has changed");
                }else {
                    toast.error("Error " + response.data.errorCode);
                }
            }).catch(()=>{
            toast.error("Error 9");
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
                setUsername(response.data.user.username)
                setEmail(response.data.user.email)
                if (response.data.success) {
                    toast.success("The username has changed");
                }else {
                    toast.error("Error " + response.data.errorCode);
                }
            }).catch(()=>{
                toast.error("Error 9");
        })
    }

    const updatePassword = () => {
        if (currentPassword !== user.password) {
            axios.get("http://localhost:9124/change-profile",
                {
                    params: {
                        category: "password",
                        toChange: newPassword,
                        secret: user.secret
                    }
                })
                .then(response => {
                    setUser(response.data.user);
                    setUsername(response.data.user.username)
                    setEmail(response.data.user.email)
                    if (response.data.success) {
                        toast.success("The password has changed");
                    }else {
                        toast.error("Error " + response.data.errorCode);
                    }
                }).catch(()=>{
                toast.error("Error 9");
            })
            resetChangePassword();
        } else {
            toast.error("Error 3")
        }
    }

    const resetChangePassword = () => {
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
        setIsToChangePass(false);
    }

    return (
        <main>
            {user &&
                <div className='container'>
                    <h2>Profile</h2>
                    <div className='form-section'>
                        Your username: {
                        <input className='form-input' value={username} placeholder={user.username} onChange={(event) => {
                            setUsername(event.target.value)
                        }}/>
                    }
                        <button className='btn' disabled={checkUsername()} onClick={updateUsername}>save</button>
                    </div>
                    <div className='form-section'>
                        Your email: {
                        <input className='form-input' value={email} placeholder={user.email} onChange={(event) => {
                            setEmail(event.target.value)
                        }}/>
                    }
                        <button className='btn' disabled={!checkEmail()} onClick={updateEmail}>save</button>
                    </div>
                    {
                        isToChangePass ?
                            <div>
                                <div>
                                    Current password:
                                    <input className='form-input' value={currentPassword} onChange={(event) => {
                                        setCurrentPassword(event.target.value)
                                    }}/>
                                </div>
                                <div >
                                    New password:
                                    <input className='form-input' value={newPassword} onChange={(event) => {
                                        setNewPassword(event.target.value)
                                    }}/>
                                </div>
                                <div className='form-section'>
                                    Repeat password:
                                    <input className='form-input' value={repeatPassword} onChange={(event) => {
                                        setRepeatPassword(event.target.value)
                                    }}/>
                                </div>
                                <button className='btn' disabled={!checkPassword()} onClick={updatePassword}>SAVE</button>
                                <button className='btn' onClick={resetChangePassword}>CANCEL</button>
                            </div>
                            :
                            <div>
                                <button className='btn' onClick={() => {
                                    setIsToChangePass(true)
                                }}>Change Password
                                </button>
                            </div>
                    }
                </div>
            }
            <ToastContainer position='top-center'/>
        </main>
    );
}

export default Profile;