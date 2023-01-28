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
        </div>
    )
};

export default UserInfo;