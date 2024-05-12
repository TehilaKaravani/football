import PropTypes from "prop-types";

function Gamble({gamble}) {
    return (
        <div className={(gamble.isCorrect === null) ? 'gray-gamble-container text' : (gamble.isCorrect === true ? 'green-gamble-container text' : 'red-gamble-container text')}>
            <div className='bold winner-group'>{gamble.match.team1.name} X {gamble.match.team2.name}</div>

            <div>
                <>
                    Your gamble: {" "}
                </>
                {gamble.team === 0 && "draw"}
                {gamble.team === 1 && gamble.match.team1.name}
                {gamble.team === 2 && gamble.match.team2.name}
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