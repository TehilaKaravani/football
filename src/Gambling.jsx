import {useEffect, useState} from 'react';
import PropTypes from "prop-types";

function Gambling({data}) {

    const [matches, setMatches] = useState([])

    useEffect(() => {
        if (data != null) {
            const filterData = data.filter((game) => {
                return (game.isLive == null);
            })
            setMatches(filterData);
        }
    }, [data]);

    return (
        <div className='container'>
            <table className='table1'>
                <thead>
                <tr>
                    <th>
                        team1
                    </th>
                    <th>
                        oddsT1
                    </th>

                    <th>
                        X
                    </th>
                    <th>
                        team2
                    </th>
                    <th>
                        oddsT2
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
                                    {(100 / match.team1.skillLevel).toFixed(2)}
                                </td>

                                <td>
                                    {(100 / ((match.team1.skillLevel) + (match.team2.skillLevel))).toFixed(2)}
                                </td>
                                <td>
                                    {match.team2.name}
                                </td>
                                <td>
                                    {(100 / match.team2.skillLevel).toFixed(2)}
                                </td>
                            </tr>)
                    })}
                    </>
                }
                </tbody>
            </table>

        </div>
    );

}


Gambling.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default Gambling;