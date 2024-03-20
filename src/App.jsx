import {useEffect, useState} from 'react'
import './App.css'
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SuperAdmin from "./superAdmin.jsx";
import LoginPage from "./LoginPage.jsx";
import DashboardPage from "./DashboardPage.jsx";
import SignUp from "./SignUp.jsx";
import Cookies from "universal-cookie";

function App() {
    const [haveAccount, setHaveAccount] = useState(true);

    useEffect(() => {
    }, []);


    const cookies = new Cookies(null, {path: '/'})
    const secret = cookies.get('secret');
    console.log(secret)


    return (
        <div>
            {
                secret ?
                    <div>LOGGED IN</div>
                    :
                    <div>
                        {
                            haveAccount?
                                <LoginPage setHaveAccount={setHaveAccount}/>
                                :
                                <SignUp setHaveAccount={setHaveAccount}/>
                        }

                    </div>
            }

            {/*<Router>*/}
            {/*    <Routes>*/}
            {/*        <Route path={"/super-admin"} element={<SuperAdmin />}/>*/}
            {/*        <Route path={"/login"} element={<LoginPage />}/>*/}
            {/*        <Route path={"/dashboard"} element={<DashboardPage />}/>*/}
            {/*    </Routes>*/}
            {/*</Router>*/}

        </div>
    );
}

export default App;

