import { useState } from "react";
import styles from "./Bar.module.css";

const Bar = (props) => {
    const [hovered, setHovered] = useState(false);
    const originX = 50;
    const originY = 35;
    return (
        <g>
            <text className={`${styles["project-name"]} ${hovered ? styles["hovered"] : ""}`} 
            x={originX+20} 
            y={180}>
                Project name: {props.name}
            </text>
            <text className={`${styles["project-xp"]} ${hovered ? styles["hovered"] : ""}`} 
            x={originX+20} 
            y={200}>
                XP: {props.height/1000}
            </text>
            
            <rect 
            height={props.height/1000} 
            x={originX + props.num*20} 
            y={originY} 
            className={styles["bar"]}
            onMouseEnter={()=> setHovered(true)}
            onMouseLeave={()=> setHovered(false)}
            />
        </g>
    );
};

export default Bar;