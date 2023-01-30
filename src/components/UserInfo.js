import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
    if (!props.data) {
        return <h2>No Record Found</h2>
    }
    
    return (
        <div className={styles["user-info"]}>
            <h2>User Info</h2>
            <h3>Username: {props.data[0].login}</h3>
            <h3>Latest Finished Project: {props.lastProject}</h3>
            <h3>Current Level: {props.currentLv}</h3>
        </div>
    )
};

export default UserInfo;