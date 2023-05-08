import React, { Fragment, useId } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Error } from "../error/index";

import styles from "./styles.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    children: React.ReactNode;
    checked: boolean;
    indeterminate?: boolean;
    error?: React.ReactNode;
    label?: string;
    block?: boolean;
};

export const Checkbox = ({
    children,
    checked,
    indeterminate,
    error,
    label,
    block,
    ...rest
}: Props) => {
    const id = useId();

    return (
        <div className={styles.checkbox_container}>
            <label
                className={styles.wrapper}
                htmlFor={id}
                data-disabled={rest.disabled}
                data-block={block}
            >
                {label ? <div className={styles.label}>{label}</div> : null}
                <div className={styles.labelInner}>
                    <span
                        className={styles.checkboxOuter}
                        data-disabled={rest.disabled}
                        data-selected={!indeterminate && checked}
                    >
                        <Transition
                            show={checked || indeterminate}
                            as={Fragment}
                            enter={styles.enter}
                            leave={styles.leave}
                            enterFrom={styles.enterFrom}
                            enterTo={styles.enterTo}
                            leaveFrom={styles.leaveFrom}
                            leaveTo={styles.leaveTo}
                        >
                            <span
                                className={styles.checkbox}
                                data-selected={!indeterminate && checked}
                                data-disabled={rest.disabled}
                            >
                                {indeterminate ? (
                                    <svg fill='none' height='16' viewBox='0 0 20 20' width='16'>
                                        <line
                                            stroke={`hsl(var(${
                                                rest.disabled ? "--accent-300" : "--foreground"
                                            }))`}
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            x1='5'
                                            x2='15'
                                            y1='10'
                                            y2='10'
                                        />
                                    </svg>
                                ) : (
                                    <svg fill='none' viewBox='0 0 20 20'>
                                        <path
                                            d='M14 7L8.5 12.5L6 10'
                                            stroke='hsl(var(--background))'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                        />
                                    </svg>
                                )}
                            </span>
                        </Transition>
                        <input
                            className={styles.input}
                            checked={checked}
                            type='checkbox'
                            id={id}
                            {...rest}
                        />
                    </span>
                    <span className={styles.value}>{children}</span>
                </div>
            </label>
            {error ? <Error>{error}</Error> : null}
        </div>
    );
};
