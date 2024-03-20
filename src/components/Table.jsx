import '../stylesheet/Table.css'
import { useState, useEffect, useContext } from 'react';
import { HubConnectionState } from '@microsoft/signalr';
import { DashboardConnection } from "../Dashboard";
import AgentTimer from './AgentTimer';

const Table = () => {
    const [data, setData] = useState([]);
    const connection = useContext(DashboardConnection);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_API + '/Agents');
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
            connection.on("Update", (data) => {
                setData(JSON.parse(data));
            });

            console.log("Registered for table update");

        } else console.log("Connection null for table")

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
                    {data.map(entry => (
                        <AgentTimer
                            key={entry.agentId}
                            agentId={entry.agentId}
                            agentName={entry.agentName}
                            status={entry.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table