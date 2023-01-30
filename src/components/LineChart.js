import React from "react";
import styles from "./LineChart.module.css";

const LineChart = (props) => {
    
    return (
        <svg version="1.2" className={styles["line-chart"]} width="620" height="300">
            <title>{props.title}</title>
            <g>
            <text className={styles["y-axis-label"]} x="5" y="280" >{props.yLabel}</text>
            <line className={styles["y-axis"]} x1={props.originX} y1={props.originY} x2={props.originX} y2="350"></line>
        </g>
        <g>
            <text className={styles["x-axis-label"]} x="280" y ="25">{props.xLabel}</text>
            <line className={styles["x-axis"]} x1={props.originX} y1={props.originY} x2="580" y2={props.originY}></line>
        </g>
            <polyline className={styles["polyline"]}
            points= {props.data.map(el => {
                for (const [key, value] of Object.entries(el)) {
                    return `${value+props.originX} ${(key*6)+props.originY}`;
                }
            })}
            />
        <g className={styles["x-labels"]}>
            <text x={props.originX} y={props.originY}>0</text>
            <text></text>
            <text></text>
            <text x={props.maxX+props.originX} y={props.originY}>{props.maxX}</text>
        </g>
        <g className={styles["y-labels"]}>
            <text x={props.originX} y={props.originY}>0</text>
            <text></text>
            <text></text>
            <text x={props.originX} y={-(props.maxY*6-props.originY)}>{props.maxY}</text>
        </g>
        </svg>
    );
};

export default LineChart;