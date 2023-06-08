import React, { forwardRef, useId, useState } from "react";

import styles from "./styles.module.scss";

export enum SelectSize {
    tiny = "tiny",
    small = "small",
    default = "default",
    large = "large",
}

type Props = Omit<React.ComponentProps<"select">, "size"> & {
    label?: string;
    size?: SelectSize;
    suffix?: string;
    width?: string;
    orientation?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const Select = forwardRef<HTMLSelectElement, Props>(
    (
        {
            label,
            size = SelectSize.default,
            suffix,
            width,
            orientation,
            onBlur = () => {},
            ...rest
        },
        ref,
    ) => {
        const id = useId();
        const [focus, setFocus] = useState(false);

        const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
            onBlur(e);
            setFocus(false);
        };

        return (
            <label data-orientation={orientation} className={styles.container} htmlFor={id}>
                {label ? (
                    <div data-orientation={orientation} className={styles.label}>
                        {label}
                    </div>
                ) : null}
                <div
                    style={{ width: width ?? "auto" }}
                    data-focused={focus}
                    className={styles.innerContainer}
                >
                    <select
                        ref={ref}
                        id={id}
                        onFocus={() => setFocus(true)}
                        onBlur={handleBlur}
                        data-size={size}
                        className={styles.input}
                        autoCapitalize='none'
                        autoComplete='none'
                        autoCorrect='off'
                        spellCheck='false'
                        {...rest}
                    />
                    {suffix ? <div className={styles.suffix}>{suffix}</div> : null}
                </div>
            </label>
        );
    },
);
Select.displayName = "Select";
