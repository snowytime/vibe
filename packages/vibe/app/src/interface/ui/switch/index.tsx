import React, { HTMLProps, useCallback } from "react";

import styles from "./styles.module.scss";

type Props<T> = Omit<HTMLProps<HTMLDivElement>, "onChange" | "selected"> & {
    children: React.ReactElement<SlotProps<T>>[];
    selected: T;
    disabled?: boolean;
    onChange: (val: T) => void;
    label?: string;
};

export const Switch = <T,>({
    selected,
    onChange,
    disabled,
    children,
    label,
    ...rest
}: Props<T>) => {
    return (
        <div className={styles.wrapper} data-disabled={disabled}>
            {label ? <div className={styles.label}>{label}</div> : null}
            <div className={styles.container} {...rest}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...child.props,
                            selectHandler: (v: T) => onChange(v),
                            selected,
                            globalDisable: disabled,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

type SlotProps<T> = Omit<HTMLProps<HTMLDivElement>, "value" | "selected"> & {
    children: React.ReactNode;
    selectHandler?: (v: T) => void;
    selected?: T;
    value: T;
    disabled?: boolean;
    globalDisable?: boolean;
};

const Slot = <T,>({
    children,
    selectHandler,
    selected,
    value,
    disabled,
    globalDisable,
    ...rest
}: SlotProps<T>) => {
    const handleClick = useCallback(() => {
        if (disabled || globalDisable) return;
        selectHandler(value);
    }, [disabled, globalDisable, selectHandler, value]);

    return (
        <div
            {...rest}
            data-type='tab'
            onClick={handleClick}
            className={styles.selected}
            role='button'
            tabIndex={0}
            data-disabled={disabled || globalDisable}
            data-selected={selected === value}
        >
            {children}
        </div>
    );
};

Switch.Slot = Slot;
