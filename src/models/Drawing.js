import React, {Component} from 'react';
import P5 from 'p5';
import styled from 'styled-components';
import {lengthOfRailMap, xPointCurve, yPointCurve} from './Setup';


const canvasWidth = 1200;
const canvasHeight = 600;
const curveWidth = 40;
const curveHeight = 40;


export default class Drawing extends Component {

    state = {
        railroadMap: [],
        trackObject:
            {
                id: 0,
                startPoint: false,
                endPoint: false,
                x1: 300,
                y1: 300,
                x2: 320,
                y2: 300,
                curveX: 0,
                curveY: 0,
                startAngle: 0,
                endAngle: 0,
                trackType: "",
                direction: "east",
                grader: 0
            },
    };

    addStrait = () => {
        const {railroadMap, trackObject} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
        let obj = Object.create(trackObject);
        let tempObj = this.straightTrackDirection(obj, lastTrack);
        try {
            if (railroadMap.length > 0) {
                obj.id = lastTrack.id + 1;
                obj.startAngle = lastTrack.startAngle;
                obj.endAngle = lastTrack.endAngle;
                obj.direction = "east";
                obj.trackType = "straight";
                obj.grader = lastTrack.grader;
                obj.x1 = tempObj.x1;
                obj.y1 = tempObj.y1;
                obj.x2 = tempObj.x2;
                obj.y2 = tempObj.y2;

                this.setState({railroadMap: [...railroadMap, obj]})

            } else {
                this.setState({railroadMap: [...railroadMap, obj]})
            }
        } catch
            (e) {
            alert(e);
        }
    }

    addCurve = () => {
        const {railroadMap, trackObject} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
        let obj = Object.create(trackObject);

        obj.id = lastTrack.id + 1;
        obj.trackType = "curve";
        obj.direction = "";
        if (railroadMap.length > 0) {
            switch (lastTrack.direction) {
                case "east":
                    obj.startAngle = 270;
                    obj.endAngle = 315;
                    obj.curveX = lastTrack.x2;
                    obj.curveY = lastTrack.y2 + 20;
                    obj.grader = lastTrack.grader === 360 ? 45 : lastTrack.grader + 45;
                    obj.direction = "south";
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)

                    this.setState({railroadMap: [...railroadMap, obj]})
                    break;

                case "south":
                    obj.startAngle = lastTrack.endAngle;
                    obj.endAngle = lastTrack.endAngle === 360 ? 45 : lastTrack.endAngle + 45;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.grader = lastTrack.grader  === 360 ? 45 : lastTrack.grader + 45;
                    obj.direction = "south";
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    this.setState({railroadMap: [...railroadMap, obj]})
                    break;
                case "north":
                    obj.startAngle = lastTrack.startAngle === 45 ? 0 : lastTrack.startAngle - 45;
                    obj.endAngle = lastTrack.startAngle;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.grader = lastTrack.grader === 360 ? 45 : lastTrack.grader + 45;
                    obj.direction = "north";
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    this.setState({railroadMap: [...railroadMap, obj]})
                    break;
                case "west":
                    this.setState({railroadMap: [...railroadMap, obj]})
                    break;
            }
        }
    }

    setCurveState = () => {

    }

    deleteLastTrack = () => {
        const {railroadMap} = this.state;
        let lastId = railroadMap[railroadMap.length - 1].id;
        if (railroadMap.length > 1) {
            this.setState({railroadMap: [...railroadMap.filter((track) => track.id !== lastId)]})
        } else {
            alert("You reached the last track!")
        }
    }

    straightTrackDirection = (obj, lastTrack) => {
        const railLength = 20;
        const radius = 10;
        const centerX = lastTrack.x2 + radius;
        const centerY = lastTrack.y2 + radius;
        obj.x1 = lastTrack.x2;
        obj.y1 = lastTrack.y2;
        obj.x2 = lastTrack.x2;
        obj.y2 = lastTrack.y2;
        switch(lastTrack.grader){
            case 0:
                obj.x2 = lastTrack.x2 + railLength;
                break;
            case 45:
                obj.x2 = xPointCurve(centerX,radius,45);
                obj.y2 = yPointCurve(centerY,radius,45);
                break;
            case 90:
                obj.y2 = lastTrack.y2 + railLength;
                break;
            case 135:

                obj.x2 = xPointCurve(centerX,radius,135);
                obj.y2 = yPointCurve(centerY,radius,135);
                break;
            case 180:
                obj.x2 = lastTrack.x2 - railLength;
                break;
            case 225:
                obj.x2 = xPointCurve(centerX,radius,225);
                obj.y2 = yPointCurve(centerY,radius,225);
                break;
            case 270:
                obj.y2 = lastTrack.y2 - railLength;
                break;
            case 315:
                obj.x2 = xPointCurve(centerX,radius,315);
                obj.y2 = yPointCurve(centerY,radius,315);
                break;
            case 360:
                obj.x2 = lastTrack.x2 + railLength;
                break;
        }

        return obj;
    }

    rotateTrack = () => {
        const {railroadMap} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
        const direction = lastTrack.direction;
        switch (lastTrack.trackType) {
            case "curve":

                if (direction === "south") {
                    this.setState({
                        direction: lastTrack.direction = "north",
                        curveY: lastTrack.curveY -= 40,
                        endAngle: lastTrack.endAngle -= 225,
                        startAngle: lastTrack.startAngle -= 225
                    })
                }
                if (direction === "north") {
                    this.setState({
                        direction: lastTrack.direction = "south",
                        curveY: lastTrack.curveY += 40,
                        endAngle: lastTrack.endAngle += 225,
                        startAngle: lastTrack.startAngle += 225
                    })
                }
            case "straight":
                if(lastTrack.grader === 360){
                    lastTrack.grader = 0;
                }else{
                    lastTrack.grader = lastTrack.grader+45;
                }
                this.rotateStraightTrack(lastTrack);

        }
    }

    rotateStraightTrack = (track) =>{

        const centerX = (track.x2 - track.x1) / 2 + track.x1;
        const centerY = (track.y2 - track.y1) / 2 + track.y1;

        const radius =10;

        let newx1 = xPointCurve(centerX,radius,track.grader+180)
        let newy1 = yPointCurve(centerY,radius,track.grader+180)
        let newx2 = xPointCurve(centerX,radius,track.grader)
        let newy2 = yPointCurve(centerY,radius,track.grader)
        this.setState({
            x1: track.x1 = newx1,
            y1: track.y1 = newy1,
            x2: track.x2 = newx2,
            y2: track.y2 = newy2

        })
    }
    drawRailroadMap = (s) => {
        const {railroadMap} = this.state;
        s.background(111);
        railroadMap.forEach(t => {
            switch (t.trackType) {
                case "straight":
                    s.line(t.x1, t.y1, t.x2, t.y2)
                    break;
                case "curve":
                    s.arc(t.curveX, t.curveY, curveWidth, curveHeight, s.radians(t.startAngle), (3.14 / 180) * t.endAngle);
                    break;
            }
        })
    };

    canvas = (s) => {

        s.setup = () => {
            const {railroadMap, trackObject} = this.state;
            this.setState({railroadMap: [...railroadMap, trackObject]})

            // 1. Create Canvas
            s.createCanvas(canvasWidth, canvasHeight);
            // 2. Draw Settings
            s.smooth();
            s.background(111);
            s.strokeWeight(4);
            //s.noFill();
        }

        s.draw = () => {
            // 1. Draw railroad map in the canvas
            this.drawRailroadMap(s);
        }
    }


    componentDidMount() {
        try {
            let myP5 = new P5(this.canvas, document.getElementById('p5sketch'))
            console.log(myP5)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.state.railroadMap)
        return (
            <div>
                <CanvasGrid id="p5sketch"/>
                <ButtonGrid>
                    <button data-testid='add-track' onClick={this.addStrait}>ADD TRACK</button>
                    <button data-testid='add-curve' onClick={this.addCurve}>ADD CURVE</button>
                    <button data-testid='rotate-track' onClick={this.rotateTrack}>ROTATE</button>
                    <button data-testid='delete-track' onClick={this.deleteLastTrack}>DELETE</button>
                </ButtonGrid>
            </div>
        )
    }
}

const
    CanvasGrid = styled.div`
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 1rem;
    justify-items: center;
`;
const
    ButtonGrid = styled.div`
    display: grid;
    padding: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 1rem;
    justify-items: center;
`;

