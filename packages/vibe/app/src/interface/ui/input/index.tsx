import React, { useId } from "react";
import styles from "./styles.module.scss";

export enum InputSize {
    small = "small",
    default = "default",
    large = "large",
}

type Props = Omit<React.HTMLProps<HTMLInputElement>, "size"> & {
    label?: string;
    size?: InputSize;
};

export const Input = ({ label, size, ...rest }: Props) => {
    const id = useId();
    return (
        <label className={styles.container} htmlFor={id}>
            {label ? <div className={styles.label}>{label}</div> : null}
            <div className={styles.innerContainer}>
                <input
                    id={id}
                    data-size={size}
                    className={styles.input}
                    autoCapitalize='none'
                    autoComplete='none'
                    autoCorrect='off'
                    spellCheck='false'
                    {...rest}
                />
            </div>
        </label>
    );
};
