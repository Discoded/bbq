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
        if(localStoragePoints) {
            const parsed = JSON.parse(localStoragePoints);
            parsed.map((singlePoint) => {
                return singlePoint[0] = new Date(parseInt(singlePoint[0]))
            })
            console.log(parsed);
        }
        
        return false ? JSON.parse(localStoragePoints) : [[new Date(), 0]];
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
    // Runs when chat changes
    useEffect(() => {
        // Add current Temp to the temperatures list
        setPoints([...points, [new Date(), currentTemp]])
        localStorage.setItem('data-points', JSON.stringify(points));
        // Trim the list to the latest 43200, (1/50 chance )
        // Data incoming 2 per second, hold the latest 6 hours of data.
        if (Math.floor(Math.random() * 50) + 1 == 1 && points.length > 43200) {
            console.log('Before slice: ' + points);
            setPoints([...points].slice(43200))
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
            <div className="card">
                <div >
                    <h1>Log</h1>
                    <ul className='render-chat'>
                        {renderChat()}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export default Dashboard