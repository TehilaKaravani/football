import {useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import {ToastContainer, toast} from 'react-toastify';


const LoginPage = ({user, setUser}) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = () => {
        axios.get("http://localhost:9124/login",
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
                    setUser(response.data.user);
                    toast.success('Login Success');
                } else {
                    setErrorCode(response.data.errorCode)
                    toast.error("Error " + response.data.errorCode);
                }
            }).catch(() => {
            toast.error("Error 9");
        })
    }

    return (
        <main>
            <div>
                {
                    user ?
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
                                    disabled={password.length === 0 || email.length === 0}>Login
                            </button>

                        </div>
                }
            </div>


            <ToastContainer position='top-center'/>
        </main>

    )
}

export default LoginPage;