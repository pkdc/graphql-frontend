import React from "react";
import styles from "./ProjectChart.module.css";

const ProjectChart = (props) => {
    return (
        <svg width={420} height={300}>
        <title>A bar chart with XP of each finished project</title>
        {props.data.map((projectDetail) => {
            console.log("pd", projectDetail);
            for (const [key, value] of Object.entries(projectDetail)) {
                return (
                <g>
                    <text>{key}</text>
                    <rect width={20} height={value}></rect>
                </g>
                )
            }
        })}
        
        </svg>
    );
};

export default ProjectChart;