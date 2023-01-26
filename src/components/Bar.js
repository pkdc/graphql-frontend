import { useState } from "react";
import styles from "./Bar.module.css";
const Bar = (props) => {
    const [hovered, setHovered] = useState(false);

    return (
        <g>
            <text className={`${styles["project-name"]} ${hovered ? styles["hovered"] : ""}`} 
            x={30} 
            y={200}>
                Project name: {props.name}
            </text>
            
            <rect 
            height={props.height/1000} 
            x={30 + props.num*20} 
            y={30} 
            className={styles["bar"]}
            onMouseEnter={()=> setHovered(true)}
            onMouseLeave={()=> setHovered(false)}
            />
        </g>
    );
};

export default Bar;