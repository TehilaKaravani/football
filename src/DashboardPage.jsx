import React, {useEffect, useState} from 'react';
import axios from "axios";

const DashboardPage = () => {
    const [cycle, setCycle] = useState(null);

    useEffect(() => {
        const event = new EventSource("http://localhost:9124/start-streaming");
        event.onopen = function () {
            console.log("connection is opened " + event.readyState);
        };

        event.onmessage = function (messages) {
            setCycle(messages.data);
        }    }, []);


    return (
        <div>
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