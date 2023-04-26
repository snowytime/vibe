import React, { HTMLProps, useMemo } from "react";
import { LinearProgress } from "../linear-progress";

type ColorMap = {
    [key: number]: string;
};

type Props = HTMLProps<HTMLDivElement> & {
    value: number;
    cap?: number;
    colorMapping?: ColorMap;
};

export const Capacity = ({ value, cap = 100, colorMapping, ...rest }: Props) => {
    const computedProgress = useMemo(() => {
        const percentage = (value / cap) * 100;
        const tooLow = !Number.isFinite(+percentage) || percentage < 0;
        const tooHigh = percentage > 100;
        return tooLow ? 0 : tooHigh ? 100 : +percentage;
    }, [value, cap]);

    const computedColor = useMemo(() => {
        const defaultMap = {
            0: "hsl(var(--green-500))",
            50: "hsl(var(--yellow-500))",
            75: "hsl(var(--red-500))",
        };

        let color = defaultMap[0];

        for (const [key, value] of Object.entries(colorMapping || defaultMap)) {
            if (computedProgress >= Number(key)) {
                color = value;
            } else {
                break;
            }
        }

        return color;
    }, [computedProgress]);

    return (
        <LinearProgress
            progress={value}
            cap={cap}
            color={computedColor}
            flatEdge
            style={{ width: "60px" }}
        />
    );
};
