import React, { HTMLProps, forwardRef, useMemo } from "react";

import styles from "./styles.module.scss";

type Props = HTMLProps<HTMLDivElement> & {
    src?: string;
    name?: string;
    children?: React.ReactNode[];
    max?: number;
};

export const AvatarGroup = forwardRef<HTMLDivElement, Props>(
    ({ name, src, children, max = 4, ...rest }, ref) => {
        const adjustedChildren = useMemo(() => {
            return children.filter((_, index) => index < max);
        }, [children, max]);
        return (
            <div className={styles.container}>
                {React.Children.map(adjustedChildren, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            grouped: true,
                        });
                    }
                    return child;
                })}
                <span className={styles.label}>
                    {children.length > max ? `+${children.length - max}` : ""}
                </span>
            </div>
        );
    },
);

AvatarGroup.displayName = "AvatarGroup";
