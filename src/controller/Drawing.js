import React, {Component} from 'react';
import P5 from 'p5';
import '../style/Drawing.css';
import {lengthOfRailMap, xPointCurve, yPointCurve, compass} from '../models/Setup';
import {canvasWidth, canvasHeight, curveWidth, curveHeight, CanvasGrid, ButtonGrid} from '../models/Constants'
import {curveClockWise, curveAntiClockWise} from '../models/Curve';

let rotateCount = 0;
let isToggle = false;

export default class Drawing extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            railroadMap: [],
            trackObject:
                {
                    id: 0,
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
                    originalDirection: "east",
                    OCX: 0,
                    OCY:0,
                    OX2:0,
                    OY2:0,
                    grader: 0,
                    clockwise: true
                },
        };
    }

    addStraight = () => {
        const {railroadMap, trackObject} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
        let obj = Object.create(trackObject);
        let tempObj = this.straightTrackDirection(obj, lastTrack);
        try {
            if (railroadMap.length > 0) {
                obj.id = lastTrack.id + 1;
                obj.startAngle = lastTrack.startAngle;
                obj.endAngle = lastTrack.endAngle;
                obj.trackType = "straight";
                obj.grader = lastTrack.grader;
                obj.direction = lastTrack.direction;
                obj.x1 = tempObj.x1;
                obj.y1 = tempObj.y1;
                obj.x2 = tempObj.x2;
                obj.y2 = tempObj.y2;

                console.log("Hallo from addStraight: " + obj.direction)
                obj.direction = tempObj.direction;
                this.setState({railroadMap: [...railroadMap, obj]})
            } else {
                this.setState({railroadMap: [...railroadMap, obj]})
            }
        } catch
            (e) {
            alert(e);
        }
    }


    straightTrackDirection = (obj, lastTrack) => {
        const railLength = 20;
        const radius = 20;

        obj.x1 = lastTrack.x2;
        obj.y1 = lastTrack.y2;
        obj.x2 = lastTrack.x2;
        obj.y2 = lastTrack.y2;
        const centerX = obj.x1;
        const centerY = obj.y1;
        switch (lastTrack.grader) {
            case 0:
                obj.x2 = lastTrack.x2 + railLength;
                obj.direction = "east";
                break;
            case 45:
                obj.x2 = xPointCurve(centerX, radius, 45);
                obj.y2 = yPointCurve(centerY, radius, 45);
                obj.direction = "south-east";
                break;
            case 90:
                obj.y2 = lastTrack.y2 + railLength;
                obj.direction = "south";
                break;
            case 135:
                obj.x2 = xPointCurve(centerX, radius, 135);
                obj.y2 = yPointCurve(centerY, radius, 135);
                obj.direction = "south-west";
                break;
            case 180:
                obj.x2 = lastTrack.x2 - railLength;
                obj.direction = "west";
                break;
            case 225:
                obj.x2 = xPointCurve(centerX, radius, 225);
                obj.y2 = yPointCurve(centerY, radius, 225);
                obj.direction = "north-west";
                break;
            case 270:
                obj.y2 = lastTrack.y2 - railLength;
                obj.direction = "north";
                break;
            case 315:
                obj.x2 = xPointCurve(centerX, radius, 315);
                obj.y2 = yPointCurve(centerY, radius, 315);
                obj.direction = "north-east";
                break;
            case 360:
                obj.x2 = lastTrack.x2 + railLength;
                obj.direction = "east";
                break;
        }

        return obj;
    }

    addCurve = () => {
        const {railroadMap, trackObject} = this.state;
        let obj = Object.create(trackObject);
        obj = curveClockWise(railroadMap, trackObject, obj);
        this.setState({railroadMap: [...railroadMap, obj]})
    }


    deleteLastTrack = () => {
        const {railroadMap} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];

        try {
            if (railroadMap.length > 1) {
                this.setState({railroadMap: [...railroadMap.filter((track) => track.id !== lastTrack.id)]})

            } else {
                alert("You reached the last track!")
            }
        } catch (e) {
            alert(e);
        }
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


    // rotateTrack = (s) => {
    //     console.log("HALLO")
    //     const {railroadMap} = this.state;
    //     const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
    //     try {
    //         switch (lastTrack.trackType) {
    //             case "curve":
    //                 console.log(isToggle)
    //                 lastTrack.curveX = xPointCurve(lastTrack.x2, 20, lastTrack.startAngle);
    //                 lastTrack.curveY = yPointCurve(lastTrack.y2, 20, lastTrack.startAngle);
    //                 !isToggle ? lastTrack.startAngle -= 225 : lastTrack.startAngle += 225;
    //                 !isToggle ? lastTrack.endAngle -= 225 : lastTrack.endAngle += 225;

    //                 isToggle = !isToggle;
    //                 console.log(isToggle)
    //                 lastTrack.direction = "south-east";
    //                 console.log(this.state.railroadMap)
    //                 break;
    //             case "straight":
    //                 lastTrack.grader = lastTrack.grader === 360 ? 45 : lastTrack.grader + 45;
    //                 this.rotateStraightTrack(lastTrack);
    //         }
    //     } catch (e) {
    //         alert(e);
    //     }
    // }

    rotateTrack = (s) => {
        const {railroadMap} = this.state;
        const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
        try {
            switch (lastTrack.trackType) {
                case "curve":
                    // if (lastTrack.direction === "south") {
                    //     lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    //     lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    //     lastTrack.startAngle -= 225;
                    //     lastTrack.endAngle -= 225;
                    //     lastTrack.direction = "north";
                    //     console.log(this.state.railroadMap)
                    // } else if (lastTrack.direction === "north") {
                    //     lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.endAngle);
                    //     lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.endAngle);
                    //     lastTrack.startAngle += 225;
                    //     lastTrack.endAngle += 225;
                    //     lastTrack.direction = "south";
                    //     console.log(this.state.railroadMap)
                    // }
                    this.rotateCurveTrack(lastTrack);
                    break;
                case "straight":

                    lastTrack.grader = lastTrack.grader === 360 ? 45 : lastTrack.grader + 45;
                    this.rotateStraightTrack(lastTrack);
            }
        } catch (e) {
            alert(e);
        }
    }

    rotateCurveTrack = (lastTrack) => {

        console.log(lastTrack.originalDirection);
        switch (lastTrack.originalDirection) {
            case "east":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "north-east";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 315;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "south-east";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 45;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "south-east":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "east";
                    lastTrack.grader = 0;
                    lastTrack.clockwise = false;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "south";
                    lastTrack.grader = 90;
                    lastTrack.clockwise = true;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "south":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "south-east";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 45;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "south-west";
                    lastTrack.grader = 135;
                    lastTrack.clockwise = true;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "south-west":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "south";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 90;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "west";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 180;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "west":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "south-west";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 135;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "north-west";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 225;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "north-west":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "west";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 180;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "north";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 270;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "north":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "north-west";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 225;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "north-east";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 315;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
            case "north-east":
                if(lastTrack.clockwise === true){
                    lastTrack.curveX = xPointCurve(lastTrack.curveX, 40, lastTrack.startAngle);
                    lastTrack.curveY = yPointCurve(lastTrack.curveY, 40, lastTrack.startAngle);
                    lastTrack.startAngle -= 225;
                    lastTrack.endAngle -= 225;
                    lastTrack.x2 = xPointCurve(lastTrack.curveX, 20, lastTrack.startAngle);
                    lastTrack.y2 = yPointCurve(lastTrack.curveY, 20, lastTrack.startAngle);
                    lastTrack.direction = "north";
                    lastTrack.clockwise = false;
                    lastTrack.grader = 270;
                }else if (lastTrack.clockwise === false){
                    lastTrack.curveX = lastTrack.OCX;
                    lastTrack.curveY = lastTrack.OCY;
                    lastTrack.startAngle += 225;
                    lastTrack.endAngle += 225;
                    lastTrack.direction = "east";
                    lastTrack.clockwise = true;
                    lastTrack.grader = 360;
                    lastTrack.x2 = lastTrack.OX2;
                    lastTrack.y2 = lastTrack.OY2;
                }
                break;
        }
    }


    rotateStraightTrack = (track) => {
        const centerX = (track.x2 - track.x1) / 2 + track.x1;
        const centerY = (track.y2 - track.y1) / 2 + track.y1;
        const radius = 10;

        let rotateCount = 0;
        switch (track.grader) {
            case 0:
                rotateCount = 0;
                break;
            case 45:
                rotateCount = 1;
                break;
            case 90:
                rotateCount = 2;
                break;
            case 135:
                rotateCount = 3;
                break;
            case 180:
                rotateCount = 4;
                break;
            case 225:
                rotateCount = 5;
                break;
            case 270:
                rotateCount = 6;
                break;
            case 315:
                rotateCount = 7;
                break;
            case 360:
                rotateCount = 0;
                break;

        }

        this.setState({
            x1: track.x1 = xPointCurve(centerX, radius, track.grader + 180),
            y1: track.y1 = yPointCurve(centerY, radius, track.grader + 180),
            x2: track.x2 = xPointCurve(centerX, radius, track.grader),
            y2: track.y2 = yPointCurve(centerY, radius, track.grader),
            direction: track.direction = compass[rotateCount]
        })

        //rotateCount === 7 ? rotateCount = 0 : rotateCount++;
        console.log(track.direction)
    };

    canvas = (s) => {

        s.setup = () => {
            // 1. Initiate one railroad object to railroad map to have an fix point in the canvas
            const {railroadMap, trackObject} = this.state;
            this.setState({railroadMap: [...railroadMap, trackObject]})

            // 2. Create Canvas
            s.createCanvas(canvasWidth, canvasHeight);

            // 3. Draw Settings
            s.smooth();
            s.background(111);
            s.strokeWeight(4);
            //s.noFill();
        }

        s.draw = () => {
            // 1. Draw railroad map on the canvas
            this.drawRailroadMap(s);
        }
    }

    componentDidMount() {
        try {
            this.myP5 = new P5(this.canvas, this.myRef.current)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.state.railroadMap)
        return (
            <
                div>
                < CanvasGrid
                    ref={this.myRef}
                />
                <ButtonGrid>
                    <button data-testid='add-straight' className="btn" onClick={this.addStraight}>ADD TRACK</button>
                    <button data-testid='add-curve' className="btn" onClick={this.addCurve}>ADD CURVE</button>
                    <button data-testid='rotate-track' className="btn" onClick={this.rotateTrack}>ROTATE</button>
                    <button data-testid='delete-track' className="btn" onClick={this.deleteLastTrack}>DELETE</button>
                </ButtonGrid>
            </div>
        )
    }
}

