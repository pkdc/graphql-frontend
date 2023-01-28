import React from "react";
import Card from "./UI/Card";
import LevelChart from "./LevelChart";

const UserProgressionByLv = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }

    
    return (
        <Card>
            <h2>User Progression By Level</h2>
            <LevelChart />
        </Card>
    )
};
export default UserProgressionByLv;