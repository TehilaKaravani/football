import {useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import {ToastContainer, toast} from 'react-toastify';
import PropTypes from "prop-types";
import {MIN_PASS_LENGTH} from './constants';
import {errorMessages} from './errorMessages';
import {useNavigate} from 'react-router-dom';

const SignIn = ({setUserSecret}) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const login = () => {
        axios.post("http://localhost:9124/login", null,
            {
                params: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                if (response.data.success) {
                    const cookies2 = new Cookies(null, {path: '/'})
                    cookies2.set('secret', response.data.user.secret);
                    setUserSecret(response.data.user.secret);
                    toast.success('Login Success');
                    setEmail("");
                    setPassword("");
                    setTimeout(() => {
                        navigate('/score-table');
                    }, 3000);
                } else {
                    toast.error(errorMessages[response.data.errorCode] || "An unknown error occurred");
                }
            }).catch(() => {
            toast.error("Server Error");
        })
    }

    return (
        <main>
                <div className="container">
                    <h2>Sign in</h2>
                    <div className='form-section'>
                        <div className='text'>
                            email:
                        </div>

                        <div>
                            <input className='form-input' value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className='form-section'>
                        <div className='text'>
                            password:
                        </div>
                        <div>
                            <input className='form-input' type='password' value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <button className='btn' onClick={login}
                            disabled={password.length < MIN_PASS_LENGTH || email.length === 0}>Login
                    </button>
                </div>
            <ToastContainer position='top-center'/>
        </main>

    )
}
SignIn.propTypes = {
    userSecret: PropTypes.string,
    setUserSecret: PropTypes.func.isRequired
};

export default SignIn;