import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_URL_HUB_DASHBOARD)
  .build();

connection.start().then(() => console.log("Dashboard Connected")).catch((error) => { console.error(error); window.alert('Websocket connection failed'); });

export default connection
