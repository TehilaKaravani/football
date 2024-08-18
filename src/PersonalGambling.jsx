import {useEffect, useState} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import Gamble from "./Gamble.jsx";
import {VscDebugRestart} from "react-icons/vsc";
import {toast, ToastContainer} from "react-toastify";

function PersonalGambling({userSecret}) {
    const [gambling, setGambling] = useState([]);
    const [updateGambling, setUpdateGambling] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:9124/get-user-gambling",
            {
                params: {
                    secret: userSecret
                }
            })
            .then(response => {
                setGambling(response.data);
            }).catch(() => {
            toast.error("Server Error")
        })
    }, [updateGambling]);


    return (
        <main className='container'>
            <h2>My Gambling</h2>
            {(gambling !== null && gambling.length !== 0) ?
                <div>
                    <VscDebugRestart onClick={() => {
                        setUpdateGambling(!updateGambling)
                    }} className="restart"/>
                    {gambling.map((gamble, index) => {
                        return (
                            <div key={index}>
                                <Gamble gamble={gamble}/>
                            </div>
                        )
                    })
                    }
                </div>
                :
                <div className='text'>
                    You haven't gambled yet.
                </div>
            }
            <ToastContainer position='top-center'/>
        </main>
    );
}

PersonalGambling.propTypes = {
    userSecret: PropTypes.string,
};
export default PersonalGambling;