import {useEffect, useState} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import Gamble from "./Gamble.jsx";

function PersonalGambling({userSecret}) {
    const [gambling, setGambling] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9124/get-user-gambling",
            {
                params: {
                    secret: userSecret
                }
            })
            .then(response => {
                setGambling(response.data);
            }).catch(()=>{
            console.log("server error")
        })
    });


    return (
        <div className='container'>
            <h2>My Gambling</h2>
            {gambling.map((gamble,index)=> {
                return(
                    <div key={index}>
                        <Gamble gamble={gamble}/>
                    </div>
                )
            })
            }
        </div>
    );
}
PersonalGambling.propTypes = {
    userSecret: PropTypes.string,
};
export default PersonalGambling;