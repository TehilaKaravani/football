import {useEffect, useState} from 'react';
import PropTypes from "prop-types";

function ScoreTable({data}) {
    const [score, setScore] = useState([])
    const [matches, setMatches] = useState([])


    useEffect(() => {
        if (data != null) {
            const filterData = data.filter((game) => {
                return (game.isLive != null) && (!game.isLive);
            })
            setMatches(filterData);
        }
    }, [data]);

    useEffect(() => {
        let teams = [];
        if (matches) {
            matches.map((match,index) => {
                if (index < 4) {
                    teams.push(match.team1.name);
                    teams.push(match.team2.name);
                }
            })
        }

        let scoreList = [];
        teams.map((team)=> {
            scoreList.push({
                teamName: team,
                score: 0
            })
        })
        matches.map((game)=>{
            let winner = null;
            if (game.goals_T1 > game.goals_T2) {
                winner = game.team1;
            }else if (game.goals_T1 < game.goals_T2) {
                winner = game.team2;
            }
            if (winner === null) {
                const teamScore1 = scoreList.find((teamScore) =>{
                    return teamScore.teamName === game.team1.name;
                })
                const teamScore2 = scoreList.find((teamScore) =>{
                    return teamScore.teamName === game.team2.name;
                })
                teamScore2.score += 1;
                teamScore1.score += 1;
            }else {
                const teamScore = scoreList.find((teamScore) =>{
                    return winner.name === teamScore.teamName;
                })
                teamScore.score += 3;
            }
        })


        const sortedScores = scoreList.sort((teamA, teamB) => {

            // const scoreDifference = teamB.score - teamA.score;
            // if (scoreDifference === 0) {
            //     const goalsDifference = getGoalsByTeam(teamB.name)  - getGoalsByTeam(teamA.name);
            //     if (goalsDifference === 0) {

            teamA.name.localeCompare(teamB.name)

            // if (teamA.name < teamB.name) {
            //     return -1;
            // }
            // if (teamA.name > teamB.name) {
            //     return 1;
            // } else {
            //     return 0;
            // }

            //     }else {
            //         return goalsDifference;
            //     }
            // }
            // return scoreDifference;
        });
        setScore(sortedScores);
    }, [data]);

    const getGoalsByTeam  = (teamName) => {
        let goals = 0;
        const matchWithTeam = matches.filter((match) => {
            return match.team1.name.equals(teamName) || match.team2.name.equals(teamName)
        })
        matchWithTeam.map((match) => {
            if (match.team1.name.equals(teamName)) {
                goals += match.goals_T1;
            } else {
                goals += match.goals_T2;
            }
        })
        console.log(teamName + " ----the goals" + goals);
    }



    return (<div className={'big-container'}>
        <h2>Score Table</h2>
        <table className='table1'>
            <thead>
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
            </thead>
            <tbody>
            {
                matches &&
                <>
                    {matches.map((match, index) => {
                        return (<tr key={index}>
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
                        </tr>)
                    })}
                </>
            }
            </tbody>
        </table>


        <table className='table2'>
            <thead>
            <tr>
                <th>
                    team
                </th>
                <th>
                    score
                </th>
            </tr>
            </thead>


            <tbody>
            {score.map((teamScore, index) => {
                return (<tr key={index}>
                        <td>
                            {teamScore.teamName}
                        </td>
                        <td>
                            {teamScore.score}
                        </td>
                    </tr>

                )
            })}
            </tbody>

        </table>


    </div>);
}

ScoreTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};
export default ScoreTable;