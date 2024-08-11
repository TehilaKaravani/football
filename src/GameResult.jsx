
function GameResult({match}) {
    return (
        <div className="game-result">
                <span className="team-names">{match.team1.name} - {match.team2.name}</span>
                <span className="teams-score">{match.goals_T1} - {match.goals_T2}</span>
        </div>
    );
}
export default GameResult;