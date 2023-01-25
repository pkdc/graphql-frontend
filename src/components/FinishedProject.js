import React from "react";
import Card from "./UI/Card";
import ProjectChart from "./ProjectChart";
import styles from "./FinishedProject.module.css";

const FinishedProject = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }

    const xpArr = props.data.map(el => {
        const [xp] = Object.values(el);
        return xp;
    });
    console.log("xpArr", xpArr);

    const namesArr = props.data.map(el => {
        const [name] = Object.keys(el);
        return name;
    });
    console.log("nameArr", namesArr);
    return (
        <Card>
            <h2>Finished Project</h2>
            <ProjectChart xpArr={xpArr} projectNamesArr={namesArr}/>
        </Card>
    );
};

export default FinishedProject;