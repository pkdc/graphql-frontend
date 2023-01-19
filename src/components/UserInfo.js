import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
    return (
        <div className={styles[props.className]}>
            <h2>User Info</h2>

        </div>
    )
};

export default UserInfo;