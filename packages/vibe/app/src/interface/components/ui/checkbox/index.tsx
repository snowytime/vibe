import React, { Fragment, useId } from "react";
import { Transition } from "@snowytime/react-magic/components";
import { Error } from "../error/index";

import styles from "./styles.module.scss";

type Props = React.HTMLProps<HTMLInputElement> & {
    children: React.ReactNode;
    checked: boolean;
    indeterminate?: boolean;
    error?: React.ReactNode;
    label?: string;
};

export const Checkbox = ({ children, checked, indeterminate, error, label, ...rest }: Props) => {
    const id = useId();

    return (
        <div className={styles.checkbox_container}>
            <label className={styles.wrapper} htmlFor={id}>
                {label ? <div className={styles.label}>{label}</div> : null}
                <div className={styles.labelInner}>
                    <span
                        className={styles.checkboxOuter}
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
                            >
                                {indeterminate ? (
                                    <svg fill='none' height='16' viewBox='0 0 20 20' width='16'>
                                        <line
                                            stroke='hsl(var(--foreground))'
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
                            value={checked}
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
