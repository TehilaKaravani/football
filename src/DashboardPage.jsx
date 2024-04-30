import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

const DashboardPage = ({cycle}) => {
    const [inLive, setInLive] = useState([]);

    // useEffect(() => {
    //     const eventSource = new EventSource("http://localhost:9124/start-streaming");
    //
    //     eventSource.onmessage = event => {
    //         const data = JSON.parse(event.data);
    //         setCycle(data);
    //     };
    //
    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);

    useEffect(() => {
        const filterData = cycle.filter((game)=>{
            return game.isLive
        })
        setInLive(filterData);
    }, [cycle]);

    return (
        <div className='container'>
            <h2>Matches</h2>
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
                {
                    inLive &&
                    <>
                        {inLive.map((match, index) => (
                            <tr key={index}>
                                <td>{match.team1.name}</td>
                                <td>{match.team2.name}</td>
                                <td>{match.goals_T1}</td>
                                <td>{match.goals_T2}</td>
                            </tr>
                        ))}
                    </>
                }
                </tbody>
            </table>
        </div>
    );
};
DashboardPage.propTypes = {
    cycle: PropTypes.arrayOf(PropTypes.object),
};
export default DashboardPage;
