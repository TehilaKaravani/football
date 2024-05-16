import {useEffect, useState} from 'react';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import PropTypes from 'prop-types';
import Constants from "./Constants";

function Profile({userSecret}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isToChangePass, setIsToChangePass] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:9124/get-user-by-secret",
            {
                params: {
                    secret: userSecret
                }
            })
            .then(response => {
                setUser(response.data.user);
                if (response.data.success) {
                    setUsername(response.data.user.username);
                    setEmail(response.data.user.email);
                }
            }).catch(()=>{
            toast.error("Error 9");
        })
    }, []);
    const checkEmail = () => {
        return (email !== user.email) &&
            (email.includes('@') && email.includes('.') && (email.indexOf('@') > 0) && (email.lastIndexOf('.') - email.indexOf('@') > 1));

    }

    const checkUsername = () => {
        return (username === user.username || username === "");
    }

    const checkPassword = () => {
        return (newPassword.length >= Constants.MIN_PASS_LENGTH) && (newPassword === repeatPassword) && (currentPassword !== newPassword);

    }

    const updateEmail = () => {
        axios.get("http://localhost:9124/change-username-or-email",
            {
                params: {
                    category: "email",
                    toChange: email,
                    secret: user.secret
                }
            })
            .then(response => {
                setUser(response.data.user);
                setUsername(response.data.user.username);
                setEmail(response.data.user.email);

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
        axios.get("http://localhost:9124/change-username-or-email",
            {
                params: {
                    category: "username",
                    toChange: username,
                    secret: user.secret
                }
            })
            .then(response => {
                setUser(response.data.user);
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
        if (currentPassword === user.password) {
            axios.get("http://localhost:9124/change-password",
                {
                    params: {
                        toChange: newPassword,
                        currentPassword: currentPassword,
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
                    <div className='balance'>
                        balance= {(user.balance).toFixed(2)}₪
                    </div>
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


Profile.propTypes = {
    userSecret: PropTypes.string,
};


export default Profile;