import Card from "./Card"
import "../stylesheet/Tab.css"
import connection from "../DashboardConnection"
import { useState,useEffect } from "react"

const Tab = () => {

    const [queue1, setQueue1] = useState(0);
    const [queue2, setQueue2] = useState(0);
    
    useEffect(() => {
        
        connection.on('QueueUpdate', (v1, v2) => {
          setQueue1(v1);
          setQueue2(v2);
        });
      }, []);


    return (
        <>
            <div className="tab">
                <div className="pod-1">
                    <div className="pod-info-2">
                        <h3>Hospital-1</h3>
                    </div>
                    <Card bgColor="#195e90" waitingCalls={queue1}/>
                </div>
                <div className="pod-2">
                    <div className="pod-info-2">
                        <h3>Hospital-2</h3>
                    </div>
                    <Card bgColor="#4caa9f"  waitingCalls={queue2}/>
                </div>
            </div>

        </>

    )
}

export default Tab