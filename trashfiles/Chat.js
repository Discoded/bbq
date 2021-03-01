//https://marmelab.com/react-admin/Tutorial.html

import React, {useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';

import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

import './Chat.css'

const socket = io.connect('http://192.168.0.117:4000');

const Chat = (props) => {
    const [state, setState] = useState({message: '', name: ''});
    const [chat, setChat] = useState([]);
    const [currentTemp, setCurrentTempState] = useState(0)
    const [temperatures, setTempState] = useState([]);
    const [time, setTimeState] = useState([]);
    const [chartState, setChartState] = useState({
        chartOptions: {
            scales: {
                xAxes: [
                  {
                    type: "realtime",
                    realtime: {
                      onRefresh: function() {
                        data.datasets[0].data.push({
                          x: Date.now(),
                          y: currentTemp
                        });
                      },
                      delay: 2000
                    }
                  }
                ]
              }
        }
    });

    const data = {
        datasets: [
          {
            label: "Dataset 1",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            lineTension: 0,
            borderDash: [8, 4],
            data: []
          }
        ]
      };

    // Runs when chat changes
    useEffect(() => {
        // Add current Temp to the temperatures list
        setTempState([currentTemp, ...temperatures]);
        setTimeState([new Date(), ...time]);
        
        // Trim the list to the latest 100, (1/50 chance )
        if (Math.floor(Math.random() * 50) + 1 == 1) {
            console.log('Before slice: ' + temperatures);
            setTempState([...temperatures.slice(0, 99)]);
            setTimeState([...time.slice(0, 99)]);
        }
        
    }, [currentTemp])

    socket.on('message', ({name, message}) => { 
        setCurrentTempState(message); 
    })

    const onTextChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const onMessageSubmit = e => {
        e.preventDefault();
        const {name, message} = state;
        socket.emit('message', {name, message});
        setState({message: '', name});
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
            <CardHeader title="http://192.168.0.117:3000/#/chat" />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>

            <div className="card">
                <div>
                    <Line data={data} options={chartState.chartOptions} />
                </div>
                <div className='render-chat'>
                    <h1>Chat log</h1>
                    <ul>
                        {renderChat()}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export default Chat