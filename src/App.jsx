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

function App() {
    const [isUserConnected, setUserConnection] = useState(false);
    
    useEffect(() => {
        const cookies = new Cookies();
        const secret = cookies.get('secret');
        if (secret !== undefined) {
            axios.get("http://localhost:9124/get-user-by-secret?secret=" + secret)
                .then((res)=> {
                    if (res.data.success === true) {
                        setUserConnection(true);
                    }
                })
        }
    }, []);


    const removeSecret = ()=> {
        const cookies = new Cookies(); // לא צריך למסור פרמטר כאן
        cookies.remove('secret'); // מסירת הקובץ cookie בשם 'secret'
        setUserConnection(false);
    }

    return (
        <div className="App">
                <BrowserRouter>
                    <NavLink  activeClassName={"active"} className={"main-link"} to={"/"} >Home</NavLink>
                    {
                        !isUserConnected  &&
                            <>
                                <NavLink activeClassName={"active"} className={"main-link"}  to={"/login"}>Login</NavLink>
                                <NavLink activeClassName={"active"} className={"main-link"}  to={"/sign-up"}>Sign up</NavLink>
                            </>

                    }
                    <NavLink activeClassName={"active"} className={"main-link"}  to={"/score-table"}>Score Table</NavLink>



                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage isUserConnected={isUserConnected} setUserConnection={setUserConnection}/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/score-table"} element={<ScoreTable/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            {
                isUserConnected &&
                <button onClick={removeSecret} className='logout'>Log Out</button>
            }


        </div>
    );
}

export default App;

