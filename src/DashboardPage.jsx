import React, {useEffect, useState} from 'react';
import axios from "axios";

const DashboardPage = () => {
    const [cycle, setCycle] = useState([]);


    useEffect(() => {
        const event = new EventSource("http://localhost:9124/start-streaming");
        event.onopen = function () {
            console.log("connection is opened " + event.readyState);
        };

        event.onmessage = function (messages) {
            // const newData = JSON.parse(messages.data);
            // setCycle(prevData => [...prevData, newData]);
            setCycle(messages.data)
        }
    }, []);

    // useEffect(() => {
    //     console.log(cycle);
    // }, [cycle]);


    return (
        <div className='container'>


            <table>
                <thead>
                <tr>
                    <th>
                        Team1
                    </th>
                    <th>
                        Team2
                    </th>
                    <th>
                        Goal1
                    </th>
                    <th>
                        Goal2
                    </th>
                </tr>
                </thead>


                {/*{cycle.map((item, index) => (*/}
                {/*    <div key={index}>*/}
                {/*        <p>{item}</p>*/}
                {/*    </div>*/}
                {/*))}*/}


                {/*<tbody>*/}
                {/*{*/}
                {/*    cycle.map((match, index) => {*/}
                {/*        return (*/}
                {/*            <tr key={index}>*/}
                {/*                <td>*/}
                {/*                    {match.team1.name}*/}
                {/*                </td>*/}
                {/*                <td>*/}
                {/*                    {match.team2.name}*/}
                {/*                </td>*/}
                {/*                <td>*/}
                {/*                    {match.goals_T1}*/}
                {/*                </td>*/}
                {/*                <td>*/}
                {/*                    {match.goals_T2}*/}
                {/*                </td>*/}
                {/*            </tr>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                {/*</tbody>*/}
            </table>
            {cycle}
        </div>
    )
}

export default DashboardPage;