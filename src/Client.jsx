import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { TelephoneFill, TelephoneXFill } from 'react-bootstrap-icons';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

var conn, intervalId;

const Client = () => {
  
  const [callStatus, setCallStatus] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const startTimer = () => {
    let seconds = 0;
    intervalId = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
      const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
      setCallStatus(`${minutes}:${remainingSeconds}`);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setCallStatus("Call Disconnected");
  };

  const initiateCall = async (hospitalName) => {
    if (hospitalName === "H1") {

      setCallStatus("Initiating call to Hospital 1");
      conn = new HubConnectionBuilder().withUrl(import.meta.env.VITE_URL_HUB_CALL + "?hid=1").build();
      await conn.start().then(()=>{
        setButtonDisabled(true);
      }).catch(err => {
        setCallStatus("Connection Failed");
        console.error(err); 
        conn = null;
      });

      conn.on("Waiting", () => {
        setCallStatus('Waiting for agents...');
      });

      conn.on("Connected", () => {
        setCallStatus("Connected");
        startTimer();
        setButtonDisabled(true);
      });

      conn.on("ReceiveMessage", (message) => {
        console.log("Message Received: ", message);
      });
      

    } else {

      setCallStatus("Initiating call to Hospital 2");
      conn = new HubConnectionBuilder().withUrl(import.meta.env.VITE_URL_HUB_CALL + "?hid=2").build();
      await conn.start().then(()=>{
        setButtonDisabled(true);
      }).catch(err => {
        setCallStatus("Connection Failed");
        console.error(err);
        conn = null;
      });

      conn.on("Waiting", () => {
        setCallStatus("Waiting for agents...");
      });

      conn.on("Connected", () => {
        setCallStatus("Connected");
        startTimer();
        setButtonDisabled(true);
      });

      conn.on("ReceiveMessage", (message) => {
        console.log("Message Received: ", message);
      });

    }
  };


  const disconnectCall = () => {
    stopTimer();
    if (conn && conn.state !== HubConnectionState.Disconnected) {
      conn.stop().then(function () {
        setCallStatus("Disconnected");
      }).catch(function (err) {
        setCallStatus("Error disconnecting from hub: " + err.toString());
      });
    } else {
      setCallStatus("No Ongoing Calls");
    }
    setButtonDisabled(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center mb-5">
        <h1 className='mb-4'>Call Status</h1>
        <textarea
          className="form-control bg-lightblue mb-4"
          rows="3"
          cols="35"
          value={callStatus}
          style={{
            color: 'blue',
            fontFamily: 'monospace',
            paddingTop: '10px',
            resize: 'none',
            textAlign: 'center',
            verticalAlign: '12px',
            fontWeight: '700',
            fontSize: '1.2em'
          }}
          readOnly
        />
      </div>
      <div>
        <Button
          variant="primary"
          className="m-2"
          onClick={() => initiateCall('H1')}
          disabled={buttonDisabled}
        >
          <TelephoneFill className="mr-1" />
          Initiate Call to Hospital-1
        </Button>
        <Button
          variant="primary"
          className="m-2"
          onClick={() => initiateCall('H2')}
          disabled={buttonDisabled}
        >
          <TelephoneFill className="mr-1" />
          Initiate Call to Hospital-2
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={disconnectCall} >
          <TelephoneXFill className="mr-1" />
          Disconnect Call
        </Button>
      </div>
    </div>
  );
};

export default Client
