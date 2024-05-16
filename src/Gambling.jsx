import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import Constants from "./Constants";

function Gambling({data, userSecret}) {

    const [user, setUser] = useState(null);
    const [matches, setMatches] = useState([]);
    const [isGambling, setIsGambling] = useState(false);
    const [gambleSum, setGambleSum] = useState(0);
    const [teamNum, setTeamNum] = useState(null);
    const [chosenMatch, setChosenMatch] = useState(null);
    const [ratio, setRatio] = useState(null);
    const [changeCounter, setChangeCounter] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:9124/get-user-by-secret",
            {
                params: {
                    secret: userSecret
                }
            })
            .then(response => {
                setUser(response.data.user);
                if (response.data.success) {
                    console.log("change")
                }
            }).catch(()=>{
            toast.error("Error 9");
        })
    }, [changeCounter]);


    useEffect(() => {
        if (data != null) {
            const filterData = data.filter((game) => {
                return (game.isLive == null);
            })
            setMatches(filterData);
        }
    }, [data]);

    const gambleSelected = (match, team) => {
        if (team === 0) {
            setRatio((100 / (match.team1.skillLevel + match.team2.skillLevel)).toFixed(2))
        } else if (team === 1) {
            setRatio((100 / match.team1.skillLevel).toFixed(2))
        } else if (team === 2) {
            setRatio((100 / match.team2.skillLevel).toFixed(2))
        }
        setTeamNum(team);
        setChosenMatch(match);
        setIsGambling(true);
    }


    const sendGamble = () => {
        axios.get("http://localhost:9124/add-gamble",
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
                    setRatio(null);
                    setGambleSum(0);
                    setChangeCounter(changeCounter + 1)
                } else {
                    toast.error("Error " + response.data.errorCode)
                }
                setIsGambling(!response.data.success)
            }).catch(() => {
            toast.error("error 9")
        })
    }


    if (isGambling) {
        return (
            <main>
                <div className='container'>
                    <h3>
                        {teamNum === Constants.DRAW && <div>
                            draw
                            - {ratio}
                        </div>}
                        {teamNum === Constants.TEAM_1 && <div>
                            {chosenMatch.team1.name}
                            - {ratio}
                        </div>}
                        {teamNum === Constants.TEAM_2 && <div>
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
                    <button className='btn' onClick={sendGamble} disabled={gambleSum === Constants.INITIAL_BALANCE || user.balance < gambleSum}>send</button>
                    <button className='btn' onClick={() => {
                        setIsGambling(false)
                        setRatio(null)
                        setGambleSum(0);
                    }}>cancel
                    </button>

                </div>
                <ToastContainer position='top-center'/>
            </main>

        );
    }
    return (
        <main>
            <div className='container'>
                <h2>Gambling</h2>

                {
                    (matches.length !== 0) ?
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>team1</th>
                                <th>X</th>
                                <th>team2</th>
                            </tr>
                            </thead>
                            <tbody>
                            {matches.map((match, index) => {
                                return (<tr key={index}>
                                    <td>
                                        <button name='team1' className='gambling-btn'
                                                onClick={() => gambleSelected(match, Constants.TEAM_1)}>
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
                                                onClick={() => gambleSelected(match, Constants.DRAW)}>
                                            <div className='bet-ratio'>
                                                {(100 / (match.team1.skillLevel + match.team2.skillLevel)).toFixed(2)}
                                            </div>
                                        </button>
                                    </td>
                                    <td>
                                        <button name='team2' className='gambling-btn'
                                                onClick={() => gambleSelected(match, Constants.TEAM_2)}>
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
            <ToastContainer position='top-center'/>
        </main>

    );

}

Gambling.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    userSecret: PropTypes.string
};

export default Gambling;