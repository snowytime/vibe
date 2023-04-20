import React, { useMemo } from "react";

import styles from "./styles.module.scss";

export enum CardinalSize {
    small = "small",
    default = "default",
    medium = "medium",
    large = "large",
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    count: number;
    singular: string;
    plural: string;
    size?: CardinalSize;
    color?: string;
};

export const Cardinal = ({
    count,
    singular,
    plural,
    size = CardinalSize.default,
    color,
}: Props) => {
    const descriptor = useMemo(() => {
        if (count > 1) return plural;
        return singular;
    }, [count, singular, plural]);

    const fontColor = useMemo(() => {
        if (color) return { color };
        return {};
    }, [color]);
    return (
        <div className={styles.container} style={fontColor}>
            <div className={styles.count} data-size={size}>
                {count}
            </div>
            <div className={styles.descriptor} data-size={size}>
                {descriptor}
            </div>
        </div>
    );
};
