import { HubConnectionBuilder } from "@microsoft/signalr";
import Tab from "./components/Tab"
import Table from "./components/Table"
import React from "react";

export const DashboardConnection = React.createContext();


var connection;

const Dashboard = () => {
    const initiateConnection = async () => {
        connection = new HubConnectionBuilder().withUrl(import.meta.env.VITE_URL_HUB_DASHBOARD).build();
        await connection.start().then(() => {
            console.log("Dashboard Connected");
        }).catch((error) => { 
            console.error(error); 
            window.alert('Dashboard connection failed'); 
        });
    }

    initiateConnection();

    return (
        <DashboardConnection.Provider value={connection}>
            <Tab/>
            <Table/>
        </DashboardConnection.Provider>
    )
}

export default Dashboard