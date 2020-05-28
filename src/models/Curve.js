import {lengthOfRailMap, xPointCurve, yPointCurve} from "./Setup";

export const curveClockWise = (railroadMap, trackObject, obj) => {
    const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
    obj.id = lastTrack.id + 1;
    obj.trackType = "curve";
    obj.direction = "";

    try {
        if (railroadMap.length > 0) {
            switch (lastTrack.direction) {
                case "east":
                    obj.startAngle = 270;
                    obj.endAngle = 315;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 90);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 90);
                    obj.direction = "south-east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 45;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    obj.OX2 = obj.x2;
                    obj.OY2 = obj.y2;
                    console.log(obj.direction)
                    return obj;
                case "south-east":
                    obj.startAngle = 315;
                    obj.endAngle = 0;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 135);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 135);
                    obj.direction = "south";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 90;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "south":
                    obj.startAngle = 0;
                    obj.endAngle = 45;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 180);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 180);
                    obj.direction = "south-west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 135;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "south-west":
                    obj.startAngle = 45;
                    obj.endAngle = 90;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 225);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 225);
                    obj.direction = "west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 180;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "west":
                    obj.startAngle = 90;
                    obj.endAngle = 135;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 270);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 270);
                    obj.direction = "north-west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 225;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "north-west":
                    obj.startAngle = 135;
                    obj.endAngle = 180;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 315);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 315);
                    obj.direction = "north";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 270;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "north":
                    obj.startAngle = 180;
                    obj.endAngle = 225;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 360);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 360);
                    obj.direction = "north-east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 315;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "north-east":
                    obj.startAngle = 225;
                    obj.endAngle = 270;
                    obj.curveX = xPointCurve(lastTrack.x2, 20, 45);
                    obj.curveY = yPointCurve(lastTrack.y2, 20, 45);
                    obj.direction = "east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 360;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
            }
        }
    } catch (e) {
        alert(e)
    }

}

export const curveAntiClockWise = (railroadMap, trackObject, obj) => {
    const lastTrack = railroadMap[lengthOfRailMap(railroadMap)];
    obj.id = lastTrack.id + 1;
    obj.trackType = "curve";
    obj.direction = "";
    obj.clockwise = false;

    try {
        if (railroadMap.length > 0) {
            switch (lastTrack.direction) {
                case "east":
                    obj.startAngle = 45;
                    obj.endAngle = 90;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "north-east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 315;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "south-east":
                    obj.startAngle = 90;
                    obj.endAngle = 135;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 0;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.startAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.startAngle)
                    console.log(obj.direction)
                    return obj;
                case "north-east":
                    obj.startAngle = 360;
                    obj.endAngle = 45;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "north";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 270;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.startAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.startAngle)
                    console.log(obj.direction)
                    return obj;
                case "south":
                    obj.startAngle = 135;
                    obj.endAngle = 180;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "south-east";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 45;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "south-west":
                    obj.startAngle = 180;
                    obj.endAngle = 225;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "south";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 90;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "north-west":
                    obj.startAngle = 270;
                    obj.endAngle = 315;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 180;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "north":
                    obj.startAngle = 315;
                    obj.endAngle = 360;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "north-west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 225;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
                case "west":
                    obj.startAngle = 225;
                    obj.endAngle = 270;
                    obj.curveX = lastTrack.curveX;
                    obj.curveY = lastTrack.curveY;
                    obj.direction = "south-west";
                    obj.originalDirection = lastTrack.direction;
                    obj.OCX = obj.curveX;
                    obj.OCY = obj.curveY;
                    obj.grader = 135;
                    obj.x2 = xPointCurve(obj.curveX, 20, obj.endAngle)
                    obj.y2 = yPointCurve(obj.curveY, 20, obj.endAngle)
                    console.log(obj.direction)
                    return obj;
            }
        }
    } catch (e) {
        alert(e)
    }

}
