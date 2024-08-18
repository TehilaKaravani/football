import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {WINNER_POINTS, DRAW_POINTS} from '../utils/Constants.jsx';
import { AiOutlineLoading } from "react-icons/ai";

function ScoreTable({data}) {
    const [score, setScore] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loadingScore, setLoadingScore] = useState(true);
    const [gameResultToDisplay, setGameResultToDisplay] = useState(10)

    useEffect(() => {
        if (data != null) {
            const filterData = data.match.filter((game) => {
                return (game.isLive != null) && (!game.isLive);
            })
            setMatches(filterData);
        }
    }, [data]);

    useEffect(() => {
        if (matches.length !== 0) {
            let teams = [];
            if (data) {
                data.match.map((match, index) => {
                    if (index < 4) {
                        teams.push(match.team1.name);
                        teams.push(match.team2.name);
                    }
                })
            }
            let scoreList = [];
            teams.map((team) => {
                scoreList.push({
                    teamName: team,
                    score: 0
                })
            })

            matches.map((game) => {
                let winner = null;
                if (game.goalsT1 > game.goalsT2) {
                    winner = game.team1;
                } else if (game.goalsT1 < game.goalsT2) {
                    winner = game.team2;
                }
                if (winner === null) {
                    const teamScore1 = scoreList.find((teamScore) => {
                        return teamScore.teamName === game.team1.name;
                    })
                    const teamScore2 = scoreList.find((teamScore) => {
                        return teamScore.teamName === game.team2.name;
                    })
                    teamScore2.score += DRAW_POINTS;
                    teamScore1.score += DRAW_POINTS;
                } else {
                    const teamScore = scoreList.find((teamScore) => {
                        return winner.name === teamScore.teamName;
                    })
                    teamScore.score += WINNER_POINTS;
                }
            })


            const sortedScores = scoreList.sort((teamA, teamB) => {
                const scoreDifference = teamB.score - teamA.score;
                if (scoreDifference === 0) {
                    const goalsDifference = getGoalsByTeam(teamB.teamName) - getGoalsByTeam(teamA.teamName);
                    if (goalsDifference === 0) {
                        return teamA.teamName.localeCompare(teamB.teamName);
                    } else {
                        return goalsDifference;
                    }
                }
                return scoreDifference;
            });
            setScore(sortedScores);
            setLoadingScore(false);
        }
    }, [data]);

    const getGoalsByTeam = (teamName) => {
        let goals = 0;
        const matchWithTeam = matches.filter((match) => {
            return (match.team1.name === teamName) || (match.team2.name === teamName);
        })
        matchWithTeam.map((match) => {
            if (match.team1.name === teamName) {
                goals += match.goalsT1;
            } else {
                goals += match.goalsT2;
            }
        })
        return goals;
    }


    return (
        <div className={'container2'}>
            <h2>Results</h2>
            <div className='tables'>
                <div className="game-results-container">
                    <h2>Team Standings</h2>
                    {
                        (matches.length !== 0) ?
                            <>
                                <div>
                                    {matches.map((match, index) => {
                                        if (index < gameResultToDisplay) {
                                            return (
                                                <div key={index} className="game-result">
                                                    <span className="team-names">{match.team1.name} - {match.team2.name}</span>
                                                    <span className="teams-score">{match.goalsT1} - {match.goalsT2}</span>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                {
                                    (gameResultToDisplay < matches.length) &&
                                    <button className='btn'
                                            onClick={() => setGameResultToDisplay(gameResultToDisplay + 5)}>see more
                                        results</button>

                                }
                            </>
                            :
                            <AiOutlineLoading className='loading'/>
                    }

                </div>

                <div className='score-table'>
                    <h2>Match Results</h2>
                    {
                    loadingScore ?
                        <div>
                            <AiOutlineLoading className='loading'/>
                        </div>
                        :
                        <div>
                            {score.map((teamScore, index) => {
                                return (
                                    <div key={index} className="team-score">
                                        <span className="team-name">{teamScore.teamName}</span>
                                        <span className="team-points">{teamScore.score}</span>
                                    </div>
                                )
                            })}
                        </div>
                }
                </div>
            </div>
        </div>);
}

ScoreTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};
export default ScoreTable;