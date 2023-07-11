import React from "react";
import styles from "./styles.module.scss";

export const Button = ({ children, disabled, variant }) => {
    return (
        <button
            className={styles.btn}
            data-variant={variant}
            disabled={disabled}
            onClick={() => console.log("hello")}
            type='button'
        >
            {children}
        </butto>
    );
};
