import React, { forwardRef, useId, useState } from "react";

import styles from "./styles.module.scss";

export enum InputSize {
    tiny = "tiny",
    small = "small",
    default = "default",
    large = "large",
}

type Props = Omit<React.ComponentProps<"input">, "size"> & {
    label?: string;
    size?: InputSize;
    prefix?: string | Element;
    suffix?: string | Element;
    width?: string;
    orientation?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, size, suffix, width, orientation, onBlur = () => {}, prefix, ...rest }, ref) => {
        const id = useId();
        const [focus, setFocus] = useState(false);

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
                    {prefix ? <div className={styles.prefix}>{prefix}</div> : null}
                    <input
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
Input.displayName = "Input";
