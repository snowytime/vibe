import React from "react";
import styles from "./styles.module.scss";
import { Badge, BadgeVariant } from "../../../interface/ui/badge/index";

export const Header = ({ pending }) => {
    return (
        <div className={styles.tab}>
            Console
            {pending > 0 ? (
                <Badge size='small' variant={BadgeVariant.error}>
                    {pending}
                </Badge>
            ) : null}
        </div>
    );
};
