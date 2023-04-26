import React, { HTMLProps, useMemo } from "react";

import styles from "./styles.module.scss";

type Props = HTMLProps<HTMLDivElement> & {
    color?: string;
    pulse?: boolean;
};

export const Status = ({ color, pulse, children, ...rest }: Props) => {
    const computedStyles = useMemo(
        () => ({
            ...(color
                ? {
                      style: {
                          backgroundColor: color,
                          color,
                      },
                  }
                : {}),
        }),
        [color],
    );

    return (
        <div className={styles.container} {...rest}>
            <div className={styles.dot} data-pulse={pulse} {...computedStyles} />
            {children ? <div className={styles.label}>{children}</div> : ""}
        </div>
    );
};
