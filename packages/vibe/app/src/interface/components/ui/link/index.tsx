import React, { useCallback, MouseEvent } from "react";

import styles from "./styles.module.scss";

type Props = React.HTMLProps<HTMLAnchorElement> & {
    children: React.ReactNode;
    disabled?: boolean;
};

export const Link = ({ children, disabled, ...rest }: Props) => {
    const handleAnchorClick = useCallback(
        (e: MouseEvent) => {
            if (disabled) {
                e.preventDefault();
            }
        },
        [disabled],
    );
    return (
        <a
            onClick={handleAnchorClick}
            role='link'
            className={styles.link}
            data-disabled={disabled}
            tabIndex={0}
            {...rest}
        >
            {children}
        </a>
    );
};
