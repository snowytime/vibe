import React, { useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";

export enum ProgressSize {
    small = "small",
    default = "default",
    large = "large",
}

export enum ProgressOrientation {
    horizontal = "horizontal",
    vertical = "vertical",
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    progress: number;
    orientation?: ProgressOrientation;
    color?: string;
    cap?: number;
    size?: ProgressSize;
    flatEdge?: boolean;
    animate?: boolean;
};

export const LinearProgress = ({
    progress,
    cap = 100,
    orientation = ProgressOrientation.horizontal,
    flatEdge,
    size = ProgressSize.default,
    color,
    animate,
    ...rest
}: Props) => {
    const [innerProgress, setInnerProgress] = useState(animate ? 0 : progress);

    const computedProgress = useMemo(() => {
        const percentage = (progress / cap) * 100;
        const tooLow = !Number.isFinite(+percentage) || percentage < 0;
        const tooHigh = percentage > 100;
        return tooLow ? 0 : tooHigh ? 100 : +percentage;
    }, [progress, cap]);

    useEffect(() => {
        setInnerProgress(computedProgress);
    }, [computedProgress]);

    const computedStyle = useMemo(() => {
        return {
            backgroundColor: color,
            ...(orientation === ProgressOrientation.horizontal
                ? { width: `${innerProgress}%`, height: "100%" }
                : { height: `${innerProgress}%`, width: "100%" }),
            ...(flatEdge ? { borderRadius: 0 } : {}),
        };
    }, [color, orientation, innerProgress, flatEdge]);
    return (
        <div data-orientation={orientation} className={styles.container} data-size={size} {...rest}>
            <div className={styles.child} style={computedStyle} />
        </div>
    );
};
