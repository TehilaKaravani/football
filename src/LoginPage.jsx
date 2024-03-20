import {useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";

const LoginPage = ({setHaveAccount}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState(null);
    const [success, setSuccess] = useState(false);


    const login = () => {
        setErrorCode(null);
        axios.get("http://localhost:9124/login",
            {
                params: {
                    username: username,
                    password: password
                }
            })
            .then(response => {
                if (response.data.success) {
                    const cookies = new Cookies(null, {path: '/'})
                    cookies.set('secret', response.data.secret);
                    setSuccess(true);
                } else {
                    setErrorCode(response.data.errorCode)
                }
            })
    }

    return (
        <div>
            {
                success?
                    <div>
                        <h2>successfully logged in</h2>
                    </div>
                    :
                    <div>
                        <h2>Sign in</h2>
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
                                    <button onClick={login} disabled={username <= 0 || password <= 0}>Login</button>
                                </td>
                            </tr>
                        </table>
                        <div>
                            {errorCode != null && <div>Error {errorCode}</div>}
                        </div>
                        <div>
                            I don't have an account <button onClick={() => setHaveAccount(false)}>sign up</button>
                        </div>

                    </div>
            }

        </div>
    )
}

export default LoginPage;