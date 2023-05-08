import React, { Fragment, useId } from "react";
import { Transition } from "@snowytime/react-magic/components";

import styles from "./styles.module.scss";

export const Radio = ({ children, label, value, checked, ...rest }) => {
    const id = useId();
    return (
        <div className={styles.radio_container}>
            <label className={styles.wrapper} htmlFor={id} data-disabled={rest.disabled}>
                {label ? <div className={styles.label}>{label}</div> : null}
                <div className={styles.label_inner}>
                    <span
                        className={styles.radio_outer}
                        data-selected={checked}
                        data-disabled={rest.disabled}
                    >
                        <Transition
                            show={checked}
                            as={Fragment}
                            enter={styles.enter}
                            leave={styles.leave}
                            enterFrom={styles.enterFrom}
                            enterTo={styles.enterTo}
                            leaveFrom={styles.leaveFrom}
                            leaveTo={styles.leaveTo}
                        >
                            <span className={styles.radio} data-selected={checked} />
                        </Transition>

                        <input
                            className={styles.input}
                            value={value}
                            type='radio'
                            id={id}
                            {...rest}
                        />
                    </span>
                    <span className={styles.value}>{children}</span>
                </div>
            </label>
        </div>
    );
};

export const RadioGroup = ({ value, onChange, children }) => {
    const name = useId();
    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ...child.props,
                        checked: child.props.value === value,
                        onChange: handleChange,
                        name,
                    });
                }
                return child;
            })}
        </div>
    );
};
