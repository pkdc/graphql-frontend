import React from "react";
import styles from "./LevelChart.module.css";

const LevelChart = (props) => {

    return (
        <svg className={styles["line-chart"]} viewBox="0 0 500 100">
            <polyline 
            stroke-width="3"
            points="
              0,120
              20,60
              40,80
              60,20"/>
        </svg>
    );
};

export default LevelChart;