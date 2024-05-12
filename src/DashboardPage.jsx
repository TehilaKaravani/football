import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import ScoreTable from "./ScoreTable.jsx";
import {Link} from "react-router-dom";

const DashboardPage = ({cycle}) => {
    const [matchInLive, setMatchInLive] = useState(null);

    useEffect(() => {
        if (cycle != null) {
            const filterData = cycle.filter((game) => {
                return game.isLive
            })
            setMatchInLive(filterData);
        } else {
            console.log("cycle is null");
        }
    }, [cycle]);

    return (
        <div className='container'>
            <h2>Steams Live Games</h2>
                {
                    matchInLive ?
                        <>
                        <table>
                            <thead>
                            <tr>
                                <th>Team1</th>
                                <th>Team2</th>
                                <th>Goal1</th>
                                <th>Goal2</th>
                            </tr>
                            </thead>
                            <tbody>
                            {matchInLive.map((match, index) => (
                                <tr key={index}>
                                    <td>{match.team1.name}</td>
                                    <td>{match.team2.name}</td>
                                    <td>{match.goals_T1}</td>
                                    <td>{match.goals_T2}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </>
                        :
                        <div className='text'>
                            <div>
                                No match in live
                            </div>
                            <div>
                                <Link to="/score-table">
                                    <button className='btn' onClick={<ScoreTable/>}>see previous games</button>
                                </Link>
                            </div>
                        </div>
                }

        </div>
    );
};
DashboardPage.propTypes = {
    cycle: PropTypes.arrayOf(PropTypes.object),
};
export default DashboardPage;
