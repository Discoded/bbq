//https://marmelab.com/react-admin/Tutorial.html

import React, {useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { Card, CardContent, CardHeader, TextField, Button } from '@material-ui/core';
import { Title } from 'react-admin';

import TimeSeriesGraph from './TimeSeriesGraph';

import './Chat.css'

const socket = io.connect('http://192.168.0.117:4000');

const Chat = (props) => {
    const [currentTemp, setCurrentTempState] = useState(0)
    const [temperatures, setTempState] = useState([]);
    const [time, setTimeState] = useState([]);
    const [tempTarget, setTempTarget] = useState(0);
    const [width, setWidthState] = useState(1200);
    const [height, setHeightState] = useState(600);

    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState([]);

    const chartRef = React.createRef();
    var xAxis = 0;

    socket.on('message', ({name, message}) => { setCurrentTempState(message); });
    // Runs when chat changes
    useEffect(() => {
        // Add current Temp to the temperatures list
        setTempState([currentTemp, ...temperatures]);
        
        // Trim the list to the latest 100, (1/50 chance )
        if (Math.floor(Math.random() * 50) + 1 == 1) {
            console.log('Before slice: ' + temperatures);
            setTempState([...temperatures.slice(0, 99)]);
            //setTimeState([...time.slice(0, 99)]);
        }

    }, [currentTemp])

    const resetData =  (buttonClicked) => {
        console.log('resetData');
    }

    const handleSubmit = () => {
        console.log("handleSubmit()");
    }

    const handleChange = (event) => {
        setTempTarget(+event.target.value);
    }
    const handleWidth = (event) => {
        setWidthState(+event.target.value)
    }
    const handleHeight= (event) => {
        setHeightState(+event.target.value)
    }
    

    const renderChat = () => {
        return temperatures.map((message, index) => (
                <p key={index}>
                    <span>{message}</span>
                </p>
        ))
    }

    return (
        <Card>
            {/*  />
            <CardHeader title="http://192.168.0.117:3000/#/chat" /> */}
            <Title title="Welcome to the administration"/>
            <CardContent>Current Temperature: {currentTemp}</CardContent>
            <Card className="card">
                <TimeSeriesGraph className="graph" data={currentTemp} target={tempTarget} height={height} width={width} />
            </Card>
            <div>
                <form onSubmit={handleSubmit} className="form">
                    <TextField 
                        label="Target Temperature"
                        onChange={handleChange}
                        value={tempTarget}>
                    </TextField> 
                    <TextField 
                        label="Width"
                        onChange={handleWidth}
                        value={width}>
                    </TextField> 
                    <TextField 
                        label="Height"
                        onChange={handleHeight}
                        value={height}>
                    </TextField> 
                    {/* <Button type="submit">Test</Button> */}
                </form>
            </div>
            <div className="card">
                <div >
                    <h1>Chat log</h1>
                    <ul className='render-chat'>
                        {renderChat()}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export default Chat