import React from "react";
import styles from "./LineChart.module.css";

const LineChart = (props) => {
    const originX = 50;
    const originY = 35;
    return (
        <svg version="1.2" className={styles["line-chart"]} width="620" height="300">
            <title>{props.title}</title>
            <g>
            <text className={styles["y-axis-label"]} x="5" y="280" >{props.yLabel}</text>
            <line className={styles["y-axis"]} x1={originX} y1={originY} x2={originX} y2="350"></line>
        </g>
        <g>
            <text className={styles["x-axis-label"]} x="280" y ="25">{props.xLabel}</text>
            <line className={styles["x-axis"]} x1={originX} y1={originY} x2="580" y2={originY}></line>
        </g>
            <polyline className={styles["polyline"]}
            points= {props.data.map(el => {
                for (const [key, value] of Object.entries(el)) {
                    return `${value+originX} ${(key*8)+originY}`;
                }
            })}
            />
        </svg>
    );
};

export default LineChart;