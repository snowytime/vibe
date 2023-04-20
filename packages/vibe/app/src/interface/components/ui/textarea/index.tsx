import React, { useId } from "react";
import { Error } from "../error";

import styles from "./styles.module.scss";

type Props = React.HTMLAttributes<HTMLTextAreaElement> & {
    label: React.ReactNode;
    disabled?: boolean;
    value: string;
    error?: boolean;
    errorMessage?: React.ReactNode;
};

export const TextArea = ({ label, disabled, error, errorMessage, ...rest }: Props) => {
    const id = useId();
    return (
        <div className={styles.textarea_container}>
            <label className={styles.container} htmlFor={id} data-disabled={disabled}>
                {label ? <div className={styles.label}>{label}</div> : null}
                <div className={styles.inner_container} data-disabled={disabled}>
                    <textarea
                        disabled={disabled}
                        data-error={error}
                        id={id}
                        className={styles.textarea}
                        autoCapitalize='none'
                        autoComplete='none'
                        autoCorrect='off'
                        spellCheck='false'
                        {...rest}
                    />
                </div>
            </label>
            {error ? <Error>{errorMessage}</Error> : null}
        </div>
    );
};
