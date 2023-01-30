import React from "react";
import Card from "./UI/Card";
import LineChart from "./LineChart";
import styles from "./UserProgressionByXp.module.css";

const UserProgressionByXp = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }
    console.log("proByXp", props.data);

    props.data.sort((a,b) => {
        const [v1] = Object.values(a);
        const [v2] = Object.values(b);
        return +v1 >= +v2 ? 1 : -1
    });
    console.log("ranked proByXp", props.data);
    

    const xpArr = props.data.map(el => {
        const [xp] = Object.keys(el);
        return +xp/1000;
    });
    console.log("xpArr", xpArr);

    // let sum = 0;
    let accuXpArr = [];
    // console.log("arr3", xpArr.slice[0, 3]);
    // for (let maxI = 0; maxI < xpArr.length; maxI++) {
        for (let i = 1; i <= xpArr.length; i++) {            
            const accuXp = xpArr.slice(0, i).reduce((accu, cur) => accu + cur, 0);
            console.log("accuxp", accuXp);
            accuXpArr.push(accuXp);
        }
        console.log("accuxpArr", accuXpArr);  

    const timeArr = props.data.map(el => {
        const [time] = Object.values(el);
        return time;
    });

    let accuXpTimeArr = [];
    for (let i = 0; i < accuXpArr.length; i++) {
        let accuXpTimeObj = {};
        accuXpTimeObj[accuXpArr[i]] = timeArr[i];
        accuXpTimeArr.push(accuXpTimeObj);
        if (i === accuXpArr.length-1) {
            const beginDateTimestamp = Date.parse("2021-10-05T17:15:38.59845+00:00");
            const now = (Date.now()-beginDateTimestamp)/1000/3600/24;
            let lastAccuXpTimeObj = {};
            lastAccuXpTimeObj[accuXpArr[i]] = now;
            accuXpTimeArr.push(lastAccuXpTimeObj);
        }
    }
    console.log("accuxpTimeArr", accuXpTimeArr);

// accuxp vs time arr ofobj

    // console.log("nameArr", namesArr);
    const maxX = Object.values(accuXpTimeArr[accuXpTimeArr.length-1]);
    const maxY = Object.keys(accuXpTimeArr[accuXpTimeArr.length-1]);

    const chartData = [];
    for (let n = 0; n < props.data.length; n++) {
        let chartDataElObj = {};
        // chartDataElObj[accuXpArr[n]] = 
    }
    return (
        <Card>
            <h2>User Progression By Level</h2>
            <LineChart
            title="A Line Chart showing the User Progress By Xp"
            xLabel="Time(Days)"
            yLabel="Xp"
            data={accuXpTimeArr}
            originX = {50}
            originY = {35}
            maxX={Math.floor(maxX)}
            maxY={Math.floor(maxY)}
            yScaleFactor={0.3}
            />
        </Card>
    )
};
export default UserProgressionByXp;