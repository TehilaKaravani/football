import PropTypes from "prop-types";

const TEAM_1 = 1;
const TEAM_2 = 2;
const DRAW = 0;

function Gamble({gamble}) {
    return (
        <div className={(gamble.isCorrect === null) ? 'gray-gamble-container text' : (gamble.isCorrect === true ? 'green-gamble-container text' : 'red-gamble-container text')}>
            <div className='bold'>{gamble.match.team1.name} X {gamble.match.team2.name}</div>

            <div>
                <>
                    Your gamble: {" "}
                </>
                {gamble.team === DRAW && "draw"}
                {gamble.team === TEAM_1 && gamble.match.team1.name}
                {gamble.team === TEAM_2 && gamble.match.team2.name}
            </div>
            {gamble.isCorrect &&
                <div>
                    gain- {(gamble.sum * gamble.ratio).toFixed(2)}₪
                </div>
            }
        </div>
    );
}
Gamble.propTypes = {
    gamble: PropTypes.object,
};

export default Gamble;