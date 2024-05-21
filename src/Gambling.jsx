import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import {TEAM_1, TEAM_2, DRAW, INITIAL_BALANCE} from './constants';
import {errorMessages} from "./ErrorMessages.jsx";


function Gambling({data, userSecret}) {

    const [user, setUser] = useState(null);
    const [futureMatches, setFutureMatches] = useState([]);
    const [isGambling, setIsGambling] = useState(false);
    const [gambleSum, setGambleSum] = useState(0);
    const [teamNum, setTeamNum] = useState(null);
    const [chosenMatch, setChosenMatch] = useState(null);
    const [ratio, setRatio] = useState(null);
    const [restartUser, setRestartUser] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:9124/get-user-by-secret", null,
            {
                params: {
                    secret: userSecret
                }
            })
            .then(response => {
                setUser(response.data.user);
            }).catch(() => {
            toast.error("Server Error");
        })
    }, [restartUser]);


    useEffect(() => {
        if (data != null) {
            const filterData = data.filter((game) => {
                return (game.isLive == null);
            })
            setFutureMatches(filterData);
        }
    }, [data]);

    const gambleSelected = (match, team) => {
        if (team === DRAW) {
            setRatio((100 / (match.team1.skillLevel + match.team2.skillLevel)).toFixed(2))
        } else if (team === TEAM_1) {
            setRatio((100 / match.team1.skillLevel).toFixed(2))
        } else if (team === TEAM_2) {
            setRatio((100 / match.team2.skillLevel).toFixed(2))
        }
        setTeamNum(team);
        setChosenMatch(match);
        setIsGambling(true);
    }


    const sendGamble = () => {
        axios.post("http://localhost:9124/add-gamble", null,
            {
                params: {
                    secret: userSecret,
                    matchId: chosenMatch.id,
                    teamNum: teamNum,
                    sum: gambleSum,
                    ratio: ratio
                }
            })
            .then(response => {
                if (response.data.success) {
                    toast.success("Gamble is successful");
                    setRestartUser(!restartUser)
                } else {
                    toast.error(errorMessages[response.data.errorCode] || "An unknown error occurred");
                }
                setIsGambling(false);
                setRatio(null);
                setGambleSum(0);
            }).catch(() => {
            toast.error("Server Error")
        })
    }

    return (
        <main>
            <div className='container'>
                <h2>Gambling</h2>
                {
                    isGambling ?
                        <div>
                            <h3>
                                {teamNum === DRAW && <div>
                                    draw
                                    - {ratio}
                                </div>}
                                {teamNum === TEAM_1 && <div>
                                    {chosenMatch.team1.name}
                                    - {ratio}
                                </div>}
                                {teamNum === TEAM_2 && <div>
                                    {chosenMatch.team2.name}
                                    - {ratio}
                                </div>}
                            </h3>
                            <div>
                                ({chosenMatch.team1.name} X {chosenMatch.team2.name})
                            </div>
                            <div className='text'>
                                Gamble Sum-
                                <input className='sum-gamble-input' type='number' min={0} value={gambleSum}
                                       onChange={(e) => setGambleSum(e.target.value)}/>
                            </div>

                            <div className='text'>
                                Your Balance- {user.balance}₪
                            </div>

                            <div className='text'>
                                Expected Gain {(ratio * gambleSum).toFixed(2)}
                            </div>
                            <button className='btn' onClick={sendGamble}
                                    disabled={gambleSum === INITIAL_BALANCE || user.balance < gambleSum}>send
                            </button>
                            <button className='btn' onClick={() => {
                                setIsGambling(false);
                                setRatio(null);
                                setGambleSum(0);
                            }}>cancel
                            </button>
                        </div>
                        :
                        <div>
                            {
                                (futureMatches.length !== 0) ?
                                    <table className='table'>
                                        <thead>
                                        <tr>
                                            <th>team1</th>
                                            <th>X</th>
                                            <th>team2</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {futureMatches.map((match, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <button name='team1' className='gambling-btn'
                                                            onClick={() => gambleSelected(match, TEAM_1)}>
                                                        <div>
                                                            {match.team1.name}
                                                        </div>
                                                        <div className='bet-ratio'>
                                                            {(100 / match.team1.skillLevel).toFixed(2)}
                                                        </div>
                                                    </button>
                                                </td>

                                                <td>
                                                    <button name='draw' className='gambling-btn'
                                                            onClick={() => gambleSelected(match, DRAW)}>
                                                        <div className='bet-ratio'>
                                                            {(100 / (match.team1.skillLevel + match.team2.skillLevel)).toFixed(2)}
                                                        </div>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button name='team2' className='gambling-btn'
                                                            onClick={() => gambleSelected(match, TEAM_2)}>
                                                        <div>
                                                            {match.team2.name}
                                                        </div>
                                                        <div className='bet-ratio'>
                                                            {(100 / match.team2.skillLevel).toFixed(2)}
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>)
                                        })}

                                        </tbody>
                                    </table>
                                    :
                                    <div className='text'>
                                        No future games
                                    </div>
                            }
                        </div>
                }

            </div>
            <ToastContainer position='top-center'/>
        </main>

    );

}

Gambling.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    userSecret: PropTypes.string
};

export default Gambling;