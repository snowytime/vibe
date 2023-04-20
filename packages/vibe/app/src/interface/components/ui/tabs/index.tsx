import React, { useCallback } from "react";

import styles from "./styles.module.scss";

export type TabProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    selectHandler?: (v: string) => void;
    selected?: string;
    value: string;
    disabled?: boolean;
    globalDisable?: boolean;
};

export const Tab = ({
    children,
    selectHandler,
    selected,
    value,
    disabled,
    globalDisable,
    ...rest
}: TabProps) => {
    const handleClick = useCallback(() => {
        if (disabled) return;
        selectHandler(value);
    }, [disabled, selectHandler, value]);

    return (
        <div
            {...rest}
            data-type='tab'
            onClick={handleClick}
            className={styles.tab_wrapper}
            role='button'
            tabIndex={0}
            data-disabled={disabled || globalDisable}
        >
            <div className={styles.tab_overlay} data-selected={selected === value} />
            <div className={styles.tab_inner}>{children}</div>
        </div>
    );
};

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    selected: string;
    onChange: (updated: string) => void;
    disabled?: boolean;
};

export const Tabs = ({ children, selected, onChange, disabled }: TabsProps) => {
    return (
        <div className={styles.tabs_wrapper}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        selectHandler: (v: string) => onChange(v),
                        selected,
                        globalDisable: disabled,
                    });
                }
                return child;
            })}
        </div>
    );
};
