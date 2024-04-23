import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";


function HomePage() {

    // const [data, setData] = useState("data");

    // useEffect(() => {
    //     const event = new EventSource("http://localhost:9124/start-streaming");
    //     event.onopen = function () {
    //         console.log("connection is opened " + event.readyState);
    //     };
    //
    //     event.onmessage = function (messages) {
    //         setData(messages.data);
    //     }
    // }, []);


    return (
        <div className='container'>
            Home
            {/*<div>{data}</div>*/}
        </div>
    );

}

export default HomePage;