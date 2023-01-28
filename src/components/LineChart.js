import React from "react";
import styles from "./LineChart.module.css";

const LineChart = (props) => {
    
    return (
        <svg version="1.2" className={styles["line-chart"]} width="500" height="300">
            <title>{props.title}</title>
            <g>
            <text className={styles["y-axis-label"]} x="5" y="280" >{props.yLabel}</text>
            <line className={styles["y-axis"]} x1="50" y1="35" x2="50" y2="350"></line>
        </g>
        <g>
            <text className={styles["x-axis-label"]} x="300" y ="25">{props.xLabel}</text>
            <line className={styles["x-axis"]} x1="50" y1="35" x2="580" y2="35"></line>
        </g>
            <polyline className={styles["polyline"]}
            points= {props.data.map(el => {
                for (const [key, value] of Object.entries(el)) {
                    return `${value} ${key*10}`;
                }
            })}
            />
        </svg>
    );
};

export default LineChart;