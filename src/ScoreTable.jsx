import {useEffect, useState} from 'react';
import axios from "axios";

function ScoreTable() {
    const [score, setScore] = useState([])
    const [matches, setMatches] = useState([])


    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = () => {
        axios.get("http://localhost:9124/get-score").then((res) => {
            setScore(res.data)
        })
        axios.get("http://localhost:9124/get-matches").then((res) => {
            setMatches(res.data)
        })
    }


    return (
        <div>
            <tr>
                <th>
                    team
                </th>
                <th>
                    score
                </th>
            </tr>

            {score.map((teamScore, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {teamScore.team.name}
                        </td>
                        <td>
                            {teamScore.score}
                        </td>
                    </tr>

                )
            })}

            {matches&&
                <div>
                    <tr>
                        <th>
                            team1
                        </th>
                        <th>
                            team2
                        </th>
                        <th>
                            goals1
                        </th>
                        <th>
                            goals2
                        </th>
                    </tr>
                    {matches.map((match, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {match.team1.name}
                                </td>
                                <td>
                                    {match.team2.name}
                                </td>
                                <td>
                                    {match.goals_T1}
                                </td>
                                <td>
                                    {match.goals_T2}
                                </td>
                            </tr>
                        )
                    })}
                </div>

            }





        </div>
    );
}

export default ScoreTable;