import React, { useCallback } from "react";
import { useThemeAddon, Theme } from "../use-theme";
import styles from "./styles.module.scss";

export const ThemeToggle = () => {
    const { theme, updateTheme } = useThemeAddon();
    const themeToggle = useCallback(() => {
        updateTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    }, [theme, updateTheme]);

    return (
        <div className={styles.toggle} onClick={themeToggle} role='button' tabIndex={0}>
            <div className={styles.track} data-theme={theme}>
                <div>🌜</div>
                <div className={styles.thumb} />
                <div>🌞</div>
            </div>
        </div>
    );
};
