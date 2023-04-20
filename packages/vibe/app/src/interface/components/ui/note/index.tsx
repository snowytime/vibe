import React, { useCallback, useMemo } from "react";

import styles from "./styles.module.scss";

export enum NoteVariant {
    primary = "primary",
    secondary = "secondary",
    success = "success",
    error = "error",
    warning = "warning",
}

type Props = {
    label?: string | boolean;
    variant?: NoteVariant;
    filled?: boolean;
    contrast?: boolean;
    children: React.ReactNode;
};

export const Note = ({
    children,
    label = true,
    variant = NoteVariant.primary,
    contrast,
    filled,
}: Props) => {
    const computedLabel = useMemo(() => {
        if (typeof label === "string") {
            return `${label}:`;
        }
        switch (variant) {
            case NoteVariant.primary:
                return "Note:";
            case NoteVariant.secondary:
                return "Note:";
            case NoteVariant.warning:
                return "Warning:";
            case NoteVariant.error:
                return "Error:";
            case NoteVariant.success:
                return "Success:";
            default:
                return "Note:";
        }
    }, [variant, label]);

    return (
        <div
            className={styles.wrapper}
            data-contrast={contrast}
            data-filled={filled}
            data-variant={variant}
        >
            <span>
                {label ? (
                    <span className={styles.label}>
                        <b>{computedLabel}</b>
                    </span>
                ) : null}
                <span className={styles.contents}>{children}</span>
            </span>
        </div>
    );
};
