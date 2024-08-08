import {useEffect, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";

import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import HomePage from "./HomePage.jsx";
import PageNotFound from "./PageNotFound.jsx";
import Cookies from "universal-cookie";
import ScoreTable from "./ScoreTable.jsx";
import axios from "axios";
import Profile from "./Profile.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Gambling from "./Gambling.jsx";
import PersonalGambling from "./PersonalGambling.jsx";

function App() {
    const [userSecret, setUserSecret] = useState(null);
    const [dataFromServer, setDataFromServer] = useState(null);

    useEffect(() => {
        const cookies = new Cookies();
        const secret = cookies.get('secret');
        if (secret !== undefined) {
            axios.post("http://localhost:9124/get-user-by-secret?secret=" + secret)
                .then((res) => {
                    if (res.data.success === true) {
                        setUserSecret(res.data.user.secret);
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
        setUserSecret(null);
    }

    return (
        <div className="App">
            <BrowserRouter>

                <div className='links'>
                    <NavLink activeclassname={"active"} className={"main-link"} to={"/"}>Home</NavLink>
                    {
                        userSecret ?
                            <>
                                <NavLink activeclassname={"active"} className={"main-link"}
                                         to={"/profile"}>Profile</NavLink>
                                <NavLink activeclassname={"active"} className={"main-link"}
                                         to={"/my-gambling"}>My Gambling</NavLink>
                                <NavLink activeclassname={"active"} className={"main-link"}
                                         to={"/gambling"}>Gambling</NavLink>
                            </>
                            :
                            <>
                                <NavLink activeclassname={"active"} className={"main-link"}
                                         to={"/login"}>Login</NavLink>
                                <NavLink activeclassname={"active"} className={"main-link"} to={"/sign-up"}>Sign
                                    up</NavLink>
                            </>

                    }
                    <NavLink activeclassname={"active"} className={"main-link"} to={"/score-table"}>Score
                        Table</NavLink>
                    <NavLink activeclassname={"active"} className={"main-link"} to={"/dashboard-page"}>Streams Live Games</NavLink>
                </div>


                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/login"}
                           element={<SignIn setUserSecret={setUserSecret}/>}/>
                    <Route path={"/sign-up"} element={<SignUp/>}/>
                    <Route path={"/profile"} element={<Profile userSecret={userSecret}/>}/>
                    <Route path={"/score-table"} element={<ScoreTable data={dataFromServer}/>}/>
                    <Route path={"/dashboard-page"} element={<DashboardPage data={dataFromServer}/>}/>
                    <Route path={"/gambling"} element={<Gambling data={dataFromServer} userSecret={userSecret}/>}/>
                    <Route path={"/my-gambling"} element={<PersonalGambling userSecret={userSecret}/>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            {
                userSecret &&
                <button className='btn logout' onClick={removeSecret}>Log Out</button>
            }


        </div>

    );
}

export default App;

