import React, { HTMLProps, useCallback, useId } from "react";

import styles from "./styles.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    checked: boolean;
    disabled?: boolean;
};

export const Toggle = ({ checked, disabled, label, ...rest }: Props) => {
    const id = useId();

    return (
        <div className={styles.wrapper}>
            <label htmlFor={id} className={styles.container} data-disabled={disabled}>
                {label ? <div className={styles.label}>{label}</div> : null}
                <div className={styles.switch} data-toggled={checked} data-disabled={disabled}>
                    <div data-toggled={checked} className={styles.thumb} />
                    <input
                        className={styles.input}
                        checked={checked}
                        disabled={disabled}
                        type='checkbox'
                        id={id}
                        {...rest}
                    />
                </div>
            </label>
        </div>
    );
};
