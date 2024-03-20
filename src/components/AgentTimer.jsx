import { useState, useEffect } from "react";


const AgentTimer = ({ agentId, agentName, status }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let intervalId;
        if (status === 2) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (status === 1) {
            clearInterval(intervalId);
            setTimer(0);
        }
        return () => clearInterval(intervalId);
    }, [status]);

    const statusDescription = (status) => {
        if (typeof status === 'number') {
            return (status === 1 ? 'Available' : status === 2 ? 'Busy' : status === 3 ? 'Leave' : 'Other');
        } else return status
    }

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <tr>
            <td>{agentName}</td>
            <td>{statusDescription(status)}</td>
            <td>{formatTime(timer)}</td>
        </tr>
    )
}

export default AgentTimer