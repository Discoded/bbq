//https://marmelab.com/react-admin/Tutorial.html

import React, {useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { Card, CardContent, CardHeader, TextField, Button } from '@material-ui/core';
import { Title } from 'react-admin';

import TimeSeriesGraph from '../components/TimeSeriesGraph/TimeSeriesGraph';

import './Dashboard.css'

const socket = io.connect('http://192.168.0.170:4000', { transports: ["websocket"] });

const Dashboard = (props) => {
    const [testPoints, setTest] = useState([]);
    const [points, setPoints] = useState(()=> {
        const localStoragePoints = localStorage.getItem("data-points");
        var parsed = JSON.parse(localStoragePoints);
        /* if(parsed) {
            parsed.map((singlePoint) => {
                return singlePoint = new Date(parseInt(singlePoint[0]))
            })
            console.log("From parsed: ");
            console.log(parsed);
        } */
        
        return false ? parsed : [[Date.now(), 0]];
    });
    const [currentTemp, setCurrentTempState] = useState(0);
    const [tempTarget, setTempTarget] = useState(300);
    
    
    const chartRef = React.createRef();
    var xAxis = 0;
    // Socket.io connection, collecting messages.
    
    useEffect(() =>{
        
        
        socket.on('message', (message) => {
            setCurrentTempState((message/100)*1.8 + 32) }
        );
        
    }, []);
    // Runs when currentTemp changes
    useEffect(() => {
        // Add current Temp to the temperatures list
        setPoints([...points, [Date.now(), currentTemp]]);
        
        // Save data to local Storage
        //localStorage.setItem('data-points', JSON.stringify(points));
        // Trim the list to the latest 21600 points, (1/10 chance )
        // Data incoming 2 per second, hold the latest 3 hours of data.
        if (Math.floor(Math.random() * 5) + 1 == 1 && points.length > 14400) {
            console.log('Before slice: ' + points);
            setPoints([...points].slice(14400));
        }
    }, [currentTemp]);
    
    
    const resetData =  (buttonClicked) => {
        console.log('resetData');
    }

    const handleSubmit = () => {
        console.log("handleSubmit()");
    }

    const handleChange = (event) => {
        setTempTarget(+event.target.value);
    }
    

    const renderChat = () => {
        
    }
    const handleButton = () => {
        console.log(points)
    }

    return (
        <Card>
            {/*  />
            <CardHeader title="http://192.168.0.117:3000/#/chat" /> */}
            <Title title="Temperature View Client"/>
            <CardContent>Current Temperature: {currentTemp}</CardContent>
            <Card className="card">
                <TimeSeriesGraph 
                    className="graph" 
                    points={points}
                    target={tempTarget}
                    key={points}/>
            </Card>
            <form onSubmit={handleSubmit} className="form">
                    <TextField 
                        label="Target Temperature"
                        onChange={handleChange}
                        value={tempTarget}>
                    </TextField> 
                    {/* <Button type="submit">Test</Button> */}
            </form>
            <Button variant="contained" color="secondary" onClick={handleButton}>Log</Button>
        </Card>
    );
}

export default Dashboard