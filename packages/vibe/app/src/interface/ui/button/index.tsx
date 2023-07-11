import React from "react";

import styles from "./styles.module.scss";

type Props = React.HTMLProps<HTMLButtonElement> & {
    children: React.ReactNode;
};

export const Button = ({ children, ...rest }: Props) => {
    return (
        <button className={styles.button} {...rest} type='button'>
            {children}
        </button>
    );
};
