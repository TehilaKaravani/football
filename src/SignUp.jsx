import axios from "axios";
import Cookies from "universal-cookie";
import {useState} from "react";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorCode, setErrorCode] = useState(null);
    const [success, setSuccess] = useState(false);


    const signUp = () => {
        axios.get("http://localhost:9124/sign-up",
            {
                params: {
                    username: username,
                    password: password,
                    password2: password2
                }
            })
            .then(response => {
                setSuccess(response.data.success)
                setErrorCode(response.data.errorCode)
            })
    }

    return (
        <div>
            {success ?
                <div>
                    <h2>success</h2>
                    <button onClick={() => setHaveAccount(true)}>sign in</button>
                </div>
            :
            <div>
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
                            <button onClick={signUp} disabled={username.length === 0 || password.length === 0 || password !== password2}>sign up</button>
                        </td>
                    </tr>
                </table>
                <div>
                    {errorCode != null && <div>Error {errorCode}</div>}
                </div>
            </div>}


        </div>
    );
}

export default SignUp;