import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./styles.module.scss";
import { useDomRef } from "@snowytime/react-magic/hooks";

export enum CircularProgressSize {
    small = "small",
    medium = "medium",
    large = "large",
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    progress: number;
    color?: string;
    cap?: number;
    size?: "small" | "default" | "large";
    flatEdge?: boolean;
    animate?: boolean;
};

export const CircularProgress = ({
    progress,
    color,
    cap = 100,
    size = "default",
    flatEdge,
    animate,
}: Props) => {
    const [svgRef, setSvgRef] = useDomRef<SVGAElement>();
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

    const sizeMap = useMemo(
        () => ({
            small: 8,
            default: 10,
            large: 12,
        }),
        [],
    );

    const outerProps = useCallback(() => {
        const { height } = svgRef?.getBoundingClientRect() || { height: 999 };
        const stroke = sizeMap[size];
        const radius = height / 2 - stroke / 2; // adjusts for the stroke
        const circ = 2 * Math.PI * radius;

        return {
            r: radius,
            cx: height / 2,
            cy: height / 2,
            fill: "transparent",
            stroke: "hsl(var(--accent-100))",
            strokeWidth: stroke,
            strokeDasharray: circ,
            strokeDashoffset: 0,
            strokeLinecap: "butt",
        };
    }, [size, sizeMap, svgRef]);

    const getInnerProps = useCallback(() => {
        if (!svgRef) return;
        const { height } = svgRef.getBoundingClientRect();
        const stroke = sizeMap[size];
        const radius = height / 2 - stroke / 2; // adjusts for the stroke
        const circ = 2 * Math.PI * radius;
        const strokePct = ((100 - innerProgress) * circ) / 100;

        return {
            r: radius,
            cx: height / 2,
            cy: height / 2,
            fill: "transparent",
            stroke: "hsl(var(--foreground))",
            strokeWidth: stroke,
            strokeDasharray: circ,
            strokeDashoffset: strokePct,
            strokeLinecap: flatEdge ? "butt" : "round",
        };
    }, [flatEdge, innerProgress, size, sizeMap, svgRef]);

    return (
        <div className={styles.container}>
            <svg className={styles.svg} ref={setSvgRef}>
                <circle {...outerProps()} />
                {svgRef && (
                    <circle style={{ transition: "all 200ms ease-in-out" }} {...getInnerProps()} />
                )}
            </svg>
        </div>
    );
};
