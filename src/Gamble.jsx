import PropTypes from "prop-types";

function Gamble({gamble}) {
    return (
        <div className={(gamble.isCorrect === null) ? 'gray-gamble-container' : (gamble.isCorrect === true ? 'green-gamble-container' : 'red-gamble-container')}>
            <div className='bold'>{gamble.match.team1.name} X {gamble.match.team2.name}</div>

            <div>
                <>
                    Your gamble:
                </>
                {gamble.team === 0 && "draw"}
                {gamble.team === 1 && gamble.match.team1.name}
                {gamble.team === 2 && gamble.match.team2.name}
            </div>
            {gamble.isCorrect &&
                <div>
                    gain-{(gamble.sum * gamble.ratio).toFixed(2)}
                </div>
            }


            {/*gain = ?*/}

            {/*{gamble.isCorrect ? "T" : "F"}*/}
        </div>
    );
}
Gamble.propTypes = {
    gamble: PropTypes.object,
};

export default Gamble;