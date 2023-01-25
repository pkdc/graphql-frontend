import React from "react";
import { useState } from "react";
import styles from "./ProjectChart.module.css";

const ProjectChart = (props) => {
    const [svgWidth, setSvgWidth] = useState(document.documentElement.clientWidth * 0.8);
    const [svgHeight, setSvgHeight] = useState(document.documentElement.clientHeight *0.5);

    window.addEventListener("resize", setSvgWidth);
    window.addEventListener("resize", setSvgHeight);

    return (
        <svg className={styles["bar-chart"]} width={(+svgWidth)} height={(+svgHeight)}>
        <title>A bar chart with XP of each finished project</title>
        <g>
            <text className={styles["y-axis"]}>XP</text>
            <line x1="90" y1="5" x2="90" y2="350"></line>
        </g>
        <g>
            <text className={styles["x-axis"]}>Time</text>
            <line x1="5" y1="90" x2="3500" y2="90"></line>
        </g>
        <g className={styles["bars"]}>
            {props.data.map((projectDetail, i) => {
                console.log("pd", projectDetail);
                for (const [key, value] of Object.entries(projectDetail)) {
                    return (
                    <g>
                        <text className={styles["project-name"]} x={i*40} y={value/1000 + 220}>{key}</text>
                        <rect height={value/1000} x={100 + i*40} y={100} className={styles["bar"]} width={0.1*(+svgWidth)} ></rect>
                    </g>
                    )
                }
            })}
        </g>
        </svg>
    );
};

export default ProjectChart;