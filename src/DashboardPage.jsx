import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
    const [cycle, setCycle] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:9124/start-streaming"); // התחברות לנתיב שבו מופעל ה־SSE

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            setCycle(data); // עדכון המצב עם המערך של המשחקים שנשלח מהשרת
        };

        return () => {
            eventSource.close(); // סגירת החיבור כאשר הרכיב מוסר
        };
    }, []);

    return (
        <div className='container'>
            <h1>Matches</h1>
            <table>
                <thead>
                <tr>
                    <th>Team1</th>
                    <th>Team2</th>
                    <th>Goal1</th>
                    <th>Goal2</th>
                </tr>
                </thead>
                <tbody>
                {cycle.map((match, index) => (
                    <tr key={index}>
                        <td>{match.team1.name}</td>
                        <td>{match.team2.name}</td>
                        <td>{match.goals_T1}</td>
                        <td>{match.goals_T2}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPage;
