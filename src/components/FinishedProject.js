import React from "react";
import Card from "./UI/Card";
import ProjectChart from "./ProjectChart";

const FinishedProject = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }
    return (
        <Card>
            <h2>Finished Project</h2>
            <ProjectChart data={props.data}/>
        </Card>
    );
};

export default FinishedProject;