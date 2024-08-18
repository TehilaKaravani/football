import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {AiOutlineLoading} from "react-icons/ai";
import axios from "axios";


const DashboardPage = ({data}) => {
    const [matchInLive, setMatchInLive] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (data != null) {
            const filterData = data.match.filter((game) => {
                return game.isLive
            })
            setMatchInLive(filterData);
            if (matchInLive && matchInLive.length !== 0) {
                setIsLoading(false)
            }
        }
    }, [data]);

    const startNewSeason = () => {
        setIsLoading(true);
        axios.get("http://localhost:9124/start-new-season").catch(() => {
            console.log("Error occurred while starting a new season");
        });
    };


    return (
        <div className='container'>
            <h2>Steams Live Games</h2>
            {
                (matchInLive != null && matchInLive.length !== 0) ?
                    <div>
                        <table className='table'>
                            <thead>
                            <tr>
                                <th>Team1</th>
                                <th>Goals</th>
                                <th>Goals</th>
                                <th>Team2</th>
                            </tr>
                            </thead>
                            <tbody>
                            {matchInLive.map((match, index) => (
                                <tr key={index}>
                                    <td>{match.team1.name}</td>
                                    <td className='bold'>{match.goalsT1}</td>
                                    <td className='bold'>{match.goalsT2}</td>
                                    <td>{match.team2.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className={"timer"}>00:{(data.remainingTime < 10) ? "0" : ""}{data.remainingTime}</div>
                    </div>
                    :
                    <div className='text'>
                        {
                            isLoading ?
                                <div>
                                    <AiOutlineLoading className='loading'/>
                                </div>
                                :
                                <div>
                                    <div>
                                        No match in live
                                    </div>
                                    <button className='btn' onClick={startNewSeason}>
                                        start a new football season
                                    </button>
                                </div>
                        }
                    </div>
            }

        </div>
    );
};
DashboardPage.propTypes = {
    data: PropTypes.shape({
        match: PropTypes.arrayOf(PropTypes.object),
        remainingTime: PropTypes.number,
    }),
};
export default DashboardPage;
