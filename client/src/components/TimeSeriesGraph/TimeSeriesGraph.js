
import React, {Component} from "react";
import {scaleLinear} from "d3-scale";
import './TimeSeriesGraph.css'


import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    Baseline,
    baselineStyleLite,
    EventMarker
} from "react-timeseries-charts";

import {
    TimeSeries,
    TimeRange,
    TimeEvent,
    Pipeline as pipeline,
    Stream,
    EventOut,
    percentile
} from "pondjs";

let i = 0;
let timeseries = null;

class TimeSeriesGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "test",
            columns: ["time", "y"],
            points: this.props.points,
            tracker: null,
            trackerValue: "Test",
            trackerEvent: null,
            markerMode: "flag"
        };
        timeseries = new TimeSeries(this.state);
        
    }

    componentDidUpdate() {
        timeseries = new TimeSeries(this.state);
    }

    handleTrackerChanged = t => {
        if (t) {
            const e = this.timeseries.atTime(t);
            const eventTime = new Date(
                e.begin().getTime() + (e.end().getTime() - e.begin().getTime()) / 2
            );
            const eventValue = e.get("y");
            const v = '${eventValue > 0 ? "+" : ""}${eventValue}C';
            this.setState({tracker: eventTime, trackerValue: v, trackerEvent: e});
        }
        else {

        }
    }


    render() {
        var myScale = scaleLinear()
            .domain([260, 0])
            .range([32, 500]);
        var myScaleF = scaleLinear()
            .domain([32, 500])
            .range([500, 32]);
        
        return (
            <>
                <Resizable>
                    <ChartContainer 
                        title="Temperature (°F)" 
                        timeRange={timeseries.range()} 
                        className="chartContainer"
                        
                    >
                        <ChartRow 
                            margin="1rem" 
                            trackerShowTime={true}
                            height={600}
                        >
                            <YAxis
                                id="y2"
                                label="Temp °C"
                                min={0}
                                yScale={myScale}
                                />
                            <Charts>
                                <LineChart
                                    axis="y"
                                    series={timeseries}
                                    columns={["y"]} />
                                <Baseline axis="y" style={baselineStyleLite} value={this.props.target} label="Target" position="right"/>
                            </Charts>
                            <YAxis  id="y" 
                                    label="Temp °F" 
                                    labelOffset={5} 
                                    yScale={myScaleF}
                                    min={32} max={500}
                                    showGrid={true}/>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </>
        )
    }
}

export default TimeSeriesGraph