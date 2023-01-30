import React from "react";
import Card from "./UI/Card";
import LineChart from "./LineChart";
import styles from "./UserProgressionByLv.css";

const UserProgressionByLv = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }
    
    const maxX = Object.values(props.data[props.data.length-1]);
    const maxY = Object.keys(props.data[props.data.length-1]);
    return (
        <Card>
            <h2>User Progression By Level</h2>
            <LineChart
            title="A Line Chart showing the User Progress By Level"
            xLabel="Time(Days)"
            yLabel="Level"
            data={props.data}
            originX = {50}
            originY = {35}
            maxX={Math.floor(maxX)}
            maxY={maxY/1}
            />
        </Card>
    )
};
export default UserProgressionByLv;