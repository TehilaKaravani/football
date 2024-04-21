import axios from "axios";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';



function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [success, setSuccess] = useState(false);


    const signUp = () => {
        // check email and strong password
        axios.get("http://localhost:9124/sign-up",
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
                }else {
                    toast.error("Error " + response.data.errorCode)
                }
            }).catch(()=>{
            toast.error("error 9")
        })
    }

    return (
        <main>
            <div>
                {success ?
                    <div>
                        <h2>success</h2>
                    </div>
                    :
                    <div className="container">
                        <h2>Sign up</h2>
                        <table>
                            <tr>
                                <td>
                                    username:
                                </td>

                                <td>
                                    <input value={username} onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    email:
                                </td>

                                <td>
                                    <input value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    password:
                                </td>
                                <td>
                                    <input type='password' value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    repeat password:
                                </td>
                                <td>
                                    <input type='password' value={password2} onChange={(e) => {
                                        setPassword2(e.target.value)
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className='btn' onClick={signUp} disabled={username.length === 0 || password.length === 0 || email.length === 0 || password !== password2}>sign up</button>
                                </td>
                            </tr>
                        </table>
                    </div>}


            </div>
            <ToastContainer position='top-center' />
        </main>

    );
}

export default SignUp;