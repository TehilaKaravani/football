import React, {useEffect, useState} from 'react';
import axios from "axios";

const SuperAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9124/get-all-users").then(response => {
            setUsers(response.data)
        })
    }, []);
    return(
        <div>
            {
                users.map(user => {
                    return (
                        <div key={user.id}>
                            <span>{user.username}</span>
                            <button>Login As</button>
                        </div>
                    )
                })
            }
        </div>
    )
}



export default SuperAdmin;