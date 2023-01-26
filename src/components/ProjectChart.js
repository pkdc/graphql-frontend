import React from "react";
import styles from "./ProjectChart.module.css";
import Bar from "./Bar";

const ProjectChart = (props) => {
    

    const svgHeight = props.xpArr.reduce((max, cur) => Math.max(max, cur));
    console.log("height", svgHeight);

    const bars = document.querySelectorAll(".bar");

    if (!bars) {console.log(bars);
        bars.forEach((bar) => bar.addEventLostener("mousever", ()=> console.log(bar)))
    }
    
    return (
        <svg className={styles["bar-chart"]} width={550} height={svgHeight/1000 + 150}>
        <title>A bar chart with XP of each finished project</title>
        <g>
            <text className={styles["y-axis"]}>XP</text>
            <line x1="90" y1="5" x2="90" y2="350"></line>
        </g>
        <g>
            <text className={styles["x-axis"]}>Time</text>
            <line x1="5" y1="90" x2="350" y2="90"></line>
        </g>
        <g className={styles["bars"]}>
            {
                props.xpArr.map((xp, i) => (
                    <Bar key={i} height={xp} name={props.projectNamesArr[i]} num={i}/>
                ))
            }
            {/* {props.data.map((projectDetail, i) => {
                console.log("pd", projectDetail);
                for (const [key, value] of Object.entries(projectDetail)) {
                    return (
                    <g>
                        <text className={styles["project-name"]} x={30+i*20} y={value/1000 + 220}>{value/1000}</text>
                        <rect width={5} height={value/1000} x={30 + i*20} y={30} className={styles["bar"]}></rect>
                    </g>
                    )
                }
            })} */}
        </g>
        
        </svg>
    );
};

export default ProjectChart;