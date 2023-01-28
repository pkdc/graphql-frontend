import React from "react";
import Card from "./UI/Card";
import LineChart from "./LineChart";
import styles from "./UserProgressionByLv.css";

const UserProgressionByLv = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }
     
    return (
        <Card>
            <h2>User Progression By Level</h2>
            <LineChart
            title="A Line Chart showing the User Progress By Level"
            xLabel="Time(Days)"
            yLabel="Level"
            data={props.data}/>
        </Card>
    )
};
export default UserProgressionByLv;