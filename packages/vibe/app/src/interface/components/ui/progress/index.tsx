import React, { useMemo } from "react";
import styles from "./styles.module.scss";

export enum ProgressVariant {
    line = "line",
    circle = "circle",
}

export enum ProgressOrientation {
    horizontal = "horizontal",
    vertical = "vertical",
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    progress: number;
    variant?: ProgressVariant;
    orientation?: ProgressOrientation;
    color?: string;
};

const Line = ({ color, progress, orientation, ...rest }: Props) => {
    const computedStyle = useMemo(() => {
        return {
            backgroundColor: color,
            ...(orientation === ProgressOrientation.horizontal
                ? { width: `${progress}%`, height: "100%" }
                : { height: `${progress}%`, width: "100%" }),
        };
    }, [progress, orientation, color]);
    return (
        <div data-orientation={orientation} className={styles.line_container} {...rest}>
            <div className={styles.line_fill} style={computedStyle} />
        </div>
    );
};

const BaseCircle = () => {
    const r = 20;
    const circ = 2 * Math.PI * r;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill='transparent'
            stroke='hsl(var(--accent-100))'
            strokeWidth='10px'
            strokeDasharray={circ}
            strokeDashoffset={0}
            strokeLinecap='round'
        />
    );
};

const CircleShape = ({ colour, pct }: { colour: string; pct: number }) => {
    const r = 20;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            className={styles.circle_under}
            r={r}
            cx={100}
            cy={100}
            fill='transparent'
            stroke={colour}
            strokeWidth='10px'
            strokeDasharray={circ}
            strokeDashoffset={strokePct}
            strokeLinecap='round'
        />
    );
};

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ color, progress, ...rest }: Props) => {
    const pct = cleanPercentage(progress);
    return (
        <svg width={200} height={200}>
            <g transform={`rotate(-90 ${"100 100"})`}>
                <BaseCircle />
                <CircleShape colour={color} pct={pct} />
            </g>
        </svg>
    );
};

export const Progress = ({
    progress,
    variant = ProgressVariant.line,
    orientation = ProgressOrientation.horizontal,
    color,
    ...rest
}: Props) => {
    const computedChild = useMemo(() => {
        switch (variant) {
            case ProgressVariant.line: {
                return (
                    <Line color={color} progress={progress} orientation={orientation} {...rest} />
                );
            }
            case ProgressVariant.circle: {
                return <Circle color={color} progress={progress} {...rest} />;
            }
            default: {
                return (
                    <Line color={color} progress={progress} orientation={orientation} {...rest} />
                );
            }
        }
    }, [color, orientation, progress, rest, variant]);
    return computedChild;
};
