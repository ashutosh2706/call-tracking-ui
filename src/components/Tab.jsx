import Card from "./Card"
import "../stylesheet/Tab.css"
import { HubConnectionState } from '@microsoft/signalr';
import { useState,useEffect,useContext } from "react"
import { DashboardConnection } from "../Dashboard";

const Tab = () => {

    const [queue1Value, setQueue1Value] = useState(0);
    const [queue2Value, setQueue2Value] = useState(0);
    const [hospitalDetails, setHospitalDetails] = useState([]);
    const connection = useContext(DashboardConnection);
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL_API + '/Hospital');
                if (!response.ok) {
                    throw new Error('Network Error');
                }
                const jsonData = await response.json();
                setHospitalDetails(jsonData);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };


        if(connection && connection.state !== HubConnectionState.Disconnected) {
            connection.on('QueueUpdate', (v1, v2) => {
                setQueue1Value(v1);
                setQueue2Value(v2);
            });
            console.log("Registered for queue")
        } else console.log("Connection null for queue")
        
        fetchData();

      }, []);


    return (
        <>
            <div className="tab">
                <div className="pod-1">
                    <div className="pod-info-2">
                        <h3>{hospitalDetails[0]?.hospitalName}</h3>
                    </div>
                    <Card bgColor="#195e90" waitingCalls={queue1Value}/>
                </div>
                <div className="pod-2">
                    <div className="pod-info-2">
                        <h3>{hospitalDetails[1]?.hospitalName}</h3>
                    </div>
                    <Card bgColor="#4caa9f"  waitingCalls={queue2Value}/>
                </div>
            </div>

        </>

    )
}

export default Tab