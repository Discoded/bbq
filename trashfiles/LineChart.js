import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import Chat from './Chat';
//import classes from "./LineGraph.module.css";


class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: props.labels,
                datasets: [
                    {
                        label: 'TEST',
                        data: props.data
                    }
                ],
            },
            chartOptions : {
                scales: {
                    xAxes: [ {
                        display: true,
                        type: 'realtime',
                        time: {
                          parser: 'MM/DD/YYYY HH:mm',
                          tooltipFormat: 'll HH:mm',
                          unit: 'day',
                          unitStepSize: 1,
                          displayFormats: {
                            'day': 'MM/DD/YYYY'
                          }
                        }
                      }
                    ]
                }
            }
        }
    }

    static defaultProps = {
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
    render() {
        return  (
            <div className="chart">
                <Line 
                    data={this.state.chartData} 
                    options={this.state.chartOptions}/>
            </div>
        )
    }
}


export default LineChart