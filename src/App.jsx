import {useEffect, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";

import LoginPage from "./LoginPage.jsx";
import SignUp from "./SignUp.jsx";
import HomePage from "./HomePage.jsx";
import PageNotFound from "./PageNotFound.jsx";
import Cookies from "universal-cookie";
import ScoreTable from "./ScoreTable.jsx";
import axios from "axios";
import Profile from "./Profile.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Gambling from "./Gambling.jsx";
// import { ToastContainer, toast } from 'react-toastify';
//
// toast.success('awesome');
// toast.error('error message');

function App() {
    const [user, setUser] = useState(null);
    const [dataFromServer, setDataFromServer] = useState(null);

    useEffect(() => {
        const cookies = new Cookies();
        const secret = cookies.get('secret');
        if (secret !== undefined) {
            axios.get("http://localhost:9124/get-user-by-secret?secret=" + secret)
                .then((res) => {
                    if (res.data.success === true) {
                        setUser(res.data.user);
                    }
                })
        }
    }, []);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:9124/start-streaming");

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            setDataFromServer(data);
        };

        return () => {
            eventSource.close();
        };
    }, []);


    const removeSecret = () => {
        const cookies = new Cookies();
        cookies.remove('secret');
        setUser(null);
    }

    return (
            <div className="App">
                <BrowserRouter>

                    <div className='links'>
                        <NavLink activeclassname={"active"} className={"main-link"} to={"/"}>Home</NavLink>
                        {
                            user ?
                                <>
                                    <NavLink activeclassname={"active"} className={"main-link"}
                                             to={"/profile"}>Profile</NavLink>
                                </>
                                :
                                <>
                                    <NavLink activeclassname={"active"} className={"main-link"} to={"/login"}>Login</NavLink>
                                    <NavLink activeclassname={"active"} className={"main-link"} to={"/sign-up"}>Sign
                                        up</NavLink>
                                </>

                        }
                        <NavLink activeclassname={"active"} className={"main-link"} to={"/score-table"}>Score Table</NavLink>
                        <NavLink activeclassname={"active"} className={"main-link"} to={"/dashboard-page"}>Dashboard
                            Page</NavLink>
                        <NavLink activeclassname={"active"} className={"main-link"} to={"/gambling"}>Gambling</NavLink>
                    </div>



                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage user={user} setUser={setUser}/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/profile"} element={<Profile user={user} setUser={setUser}/>}/>
                        <Route path={"/score-table"} element={<ScoreTable data={dataFromServer}/>}/>
                        <Route path={"/dashboard-page"} element={<DashboardPage cycle={dataFromServer}/>}/>
                        <Route path={"/gambling"} element={<Gambling data={dataFromServer}/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
                {
                    user &&
                    <button className='btn logout' onClick={removeSecret}>Log Out</button>
                }


            </div>

    );
}

export default App;

