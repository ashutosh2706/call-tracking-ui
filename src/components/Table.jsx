import '../stylesheet/Table.css'
import { useState, useEffect } from 'react';
import { HubConnectionState } from '@microsoft/signalr';
import connection from '../DashboardConnection';


const Table = () => {

    const [data, setData] = useState([]);
    const [timer, setTimer] = useState("00:00");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_API + '/agents');
                if (!response.ok) {
                    throw new Error('Network Error');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        if (connection && connection.state !== HubConnectionState.Disconnected) {
            // table update 
            connection.on("Update", (data) => {
                setData(JSON.parse(data));
            });
        }

        fetchData();

    }, []);


    return (
        <div className="table-container">
            <table>
                <caption>
                    Agents ({data.length})
                </caption>
                <thead>
                    <tr>
                        <th>Agent Name</th>
                        <th>Status</th>
                        <th>Time in Call</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((entry) => (
                            <tr>
                                <td>{entry.agentName}</td>
                                <td>
                                    {typeof entry.status === 'number' ?
                                        (entry.status === 1 ? 'Available' : entry.status === 2 ? 'Busy' : 'Leave') :
                                        entry.status
                                    }
                                </td>
                                <td>{timer}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table