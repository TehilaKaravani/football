import axios from "axios";
import {useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {MIN_PASS_LENGTH} from './constants';
import {errorMessages} from "./ErrorMessages.jsx";
function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [success, setSuccess] = useState(false);


    const signUp = () => {
        axios.post("http://localhost:9124/sign-up",null,
            {
                params: {
                    username: username,
                    email: email,
                    password: password,
                    password2: password2
                }
            })
            .then(response => {
                setSuccess(response.data.success)
                if (response.data.success) {
                    toast.success("Sign up successful")
                } else {
                    toast.error(errorMessages[response.data.errorCode] || "An unknown error occurred");
                }
            }).catch(() => {
            toast.error("Server Error")
        })
    }

    return (
        <main>
            <div className="container">
                {success ?
                    <div>
                        <h2>success</h2>
                    </div>
                    :
                    <div>
                        <h2>Sign up</h2>
                        <div className='form-section'>
                            <div>
                                username:
                            </div>

                            <input className='form-input' value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>

                        </div>
                        <div className='form-section'>
                            <div>
                                email:
                            </div>

                            <div>
                                <input className='form-input' value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                        </div>

                        <div className='form-section'>
                            <div>
                                password:
                            </div>
                            <div>
                                <input className='form-input' type='password' value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className='form-section'>
                            <div>
                                repeat password:
                            </div>
                            <div>
                                <input className='form-input' type='password' value={password2} onChange={(e) => {
                                    setPassword2(e.target.value)
                                }}/>
                            </div>
                            <div className='gray-text'>
                                *The password must be 8 characters or longer
                            </div>
                        </div>


                        <button className='btn' onClick={signUp}
                                disabled={username.length === 0 || password.length === 0 || email.length === 0 || password !== password2 || password.length < MIN_PASS_LENGTH}>sign
                            up
                        </button>
                    </div>}
            </div>
            <ToastContainer position='top-center'/>
        </main>

    );
}

export default SignUp;