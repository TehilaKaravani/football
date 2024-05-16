import {useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import {ToastContainer, toast} from 'react-toastify';
import PropTypes from "prop-types";

const MIN_PASS_LENGTH = 8;



const SignIn = ({userSecret, setUserSecret}) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = () => {
        axios.get("http://localhost:9124/login",
            {
                params:{
                    email: email,
                    password: password
                }

            })
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    const cookies2 = new Cookies(null, {path: '/'})
                    cookies2.set('secret', response.data.user.secret);
                    setUserSecret(response.data.user.secret);
                    toast.success('Login Success');
                } else {
                    toast.error("Error " + response.data.errorCode);
                }
            }).catch(() => {
            toast.error("Server error");
        })
    }

    return (
        <main>
            <div>
                {
                    userSecret ?
                        <div className='container'>
                            <h2>successfully logged in</h2>
                        </div>
                        :
                        <div className="container">
                            <h2>Sign in</h2>
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

                            <button className='btn' onClick={login}
                                    disabled={password.length < MIN_PASS_LENGTH || email.length === 0}>Login
                            </button>
                        </div>
                }
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