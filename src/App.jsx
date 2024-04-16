import {useEffect, useState} from 'react'
import './App.css'
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

function App() {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const cookies = new Cookies();
        const secret = cookies.get('secret');
        if (secret !== undefined) {
            axios.get("http://localhost:9124/get-user-by-secret?secret=" + secret)
                .then((res)=> {
                    if (res.data.success === true) {
                        setUser(res.data.user);
                    }
                })
        }
    }, []);


    const removeSecret = ()=> {
        const cookies = new Cookies(); // לא צריך למסור פרמטר כאן
        cookies.remove('secret'); // מסירת הקובץ cookie בשם 'secret'
        setUser(null);
    }

    return (
        <div className="App">
                <BrowserRouter>

                    <NavLink  activeClassName={"active"} className={"main-link"} to={"/"} >Home</NavLink>
                    {
                         user?
                            <>
                                <NavLink  activeClassName={"active"} className={"main-link"} to={"/profile"} >Profile</NavLink>
                            </>
                            :
                            <>
                                <NavLink activeClassName={"active"} className={"main-link"}  to={"/login"}>Login</NavLink>
                                <NavLink activeClassName={"active"} className={"main-link"}  to={"/sign-up"}>Sign up</NavLink>
                            </>

                    }
                    <NavLink activeClassName={"active"} className={"main-link"}  to={"/score-table"}>Score Table</NavLink>
                    <NavLink activeClassName={"active"} className={"main-link"}  to={"/dashboard-page"}>Dashboard Page</NavLink>


                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage user={user} setUser={setUser}/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/profile"} element={<Profile user={user} setUser={setUser}/>}/>
                        <Route path={"/score-table"} element={<ScoreTable/>}/>
                        <Route path={"/dashboard-page"} element={<DashboardPage/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            {
                user&&
                <button onClick={removeSecret} className='logout'>Log Out</button>
            }


        </div>
    );
}

export default App;

