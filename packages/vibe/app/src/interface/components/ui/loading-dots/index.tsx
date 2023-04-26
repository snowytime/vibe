import React from "react";

import styles from "./styles.module.scss";

export const LoadingDots = () => {
    return (
        <div className={styles.container}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>
    );
};
