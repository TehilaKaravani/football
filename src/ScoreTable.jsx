import {useEffect, useState} from 'react';
import axios from "axios";

function ScoreTable() {
    const [score, setScore] = useState([])


    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = () => {
        axios.get("http://localhost:9124/get-score").then((res) => {
            setScore(res.data)
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


        </div>
    );
}

export default ScoreTable;