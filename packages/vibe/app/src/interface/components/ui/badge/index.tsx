import React from "react";

import styles from "./styles.module.scss";

export enum BadgeVariant {
    primary = "primary",
    secondary = "secondary",
    success = "success",
    error = "error",
    warning = "warning",
}

type Props = {
    variant?: BadgeVariant;
    contrast?: boolean;
    children: React.ReactNode;
};

export const Badge = ({ children, variant = BadgeVariant.primary, contrast }: Props) => {
    return (
        <span data-contrast={contrast} data-variant={variant} className={styles.container}>
            {children}
        </span>
    );
};
