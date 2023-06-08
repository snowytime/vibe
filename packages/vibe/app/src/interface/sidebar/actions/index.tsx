import React, { useCallback } from "react";
import { useSettings, Theme } from "../../../controls/use-settings";

import styles from "./styles.module.scss";

export const ThemeToggle = () => {
    const { theme, updateTheme } = useSettings();
    const themeToggle = useCallback(() => {
        updateTheme(theme === Theme.light ? Theme.dark : Theme.light);
    }, [theme, updateTheme]);

    return (
        <>
            <div className={styles.toggle} onClick={themeToggle} role='button' tabIndex={0}>
                <div className={styles.track} data-theme={theme}>
                    <div>🌜</div>
                    <div className={styles.thumb} />
                    <div>🌞</div>
                </div>
            </div>
        </>
    );
};

const Addons = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => {
    return (
        <div
            className={styles.button}
            onClick={onClick}
            data-enabled={enabled}
            role='button'
            tabIndex={0}
        >
            <svg height='60%' viewBox='0 0 12 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M5.55511 2.46229H6.44489V0.43267C6.44489 0.306802 6.40214 0.204535 6.31663 0.125868C6.23113 0.0419559 6.12425 0 5.99599 0C5.87308 0 5.76887 0.0419559 5.68337 0.125868C5.59786 0.209779 5.55511 0.314669 5.55511 0.440537V2.46229ZM5.99599 6.47432C6.45023 6.47432 6.8644 6.36681 7.23848 6.15178C7.61256 5.93676 7.90915 5.64831 8.12826 5.28644C8.34736 4.91933 8.45691 4.51288 8.45691 4.0671C8.45691 3.61607 8.34736 3.20963 8.12826 2.84776C7.90915 2.48064 7.61256 2.18957 7.23848 1.97455C6.8644 1.75952 6.45023 1.65201 5.99599 1.65201C5.54175 1.65201 5.12759 1.75952 4.75351 1.97455C4.38477 2.18957 4.09085 2.48064 3.87174 2.84776C3.65264 3.20963 3.54309 3.61607 3.54309 4.0671C3.54309 4.51288 3.65264 4.91933 3.87174 5.28644C4.09085 5.64831 4.38477 5.93676 4.75351 6.15178C5.12759 6.36681 5.54175 6.47432 5.99599 6.47432ZM5.99599 5.28644C5.63794 5.28644 5.34135 5.17106 5.10621 4.94031C4.87108 4.70955 4.75351 4.41848 4.75351 4.0671C4.75351 3.71047 4.87108 3.41678 5.10621 3.18602C5.34135 2.95527 5.63794 2.83989 5.99599 2.83989C6.35939 2.83989 6.65865 2.95527 6.89379 3.18602C7.12892 3.41678 7.24649 3.71047 7.24649 4.0671C7.24649 4.41848 7.12892 4.70955 6.89379 4.94031C6.65865 5.17106 6.35939 5.28644 5.99599 5.28644ZM5.66733 5.84498L4.40882 5.54604L1.31463 15.7492C1.26653 15.9118 1.28791 16.0691 1.37876 16.2212C1.46961 16.3785 1.60053 16.4782 1.77154 16.5201C1.94255 16.5673 2.10287 16.5464 2.25251 16.4572C2.40748 16.3733 2.51169 16.2448 2.56513 16.0717L5.66733 5.84498ZM1.65932 15.3008L1.06613 17.4799C1.03941 17.59 1.05277 17.6949 1.10621 17.7945C1.165 17.8942 1.2505 17.9571 1.36273 17.9833C1.47495 18.0148 1.58183 18.0017 1.68337 17.944C1.7849 17.8916 1.8517 17.8077 1.88377 17.6923L2.47695 15.5211L1.65932 15.3008ZM6.33267 5.84498L9.43487 16.0717C9.48831 16.2448 9.58985 16.3733 9.73948 16.4572C9.89446 16.5464 10.0574 16.5673 10.2285 16.5201C10.3995 16.4782 10.5304 16.3785 10.6212 16.2212C10.7121 16.0691 10.7335 15.9118 10.6854 15.7492L7.59118 5.54604L6.33267 5.84498ZM10.3407 15.3008L9.51503 15.5211L10.1162 17.6923C10.1483 17.8077 10.2124 17.8916 10.3086 17.944C10.4102 18.0017 10.5197 18.0148 10.6373 17.9833C10.7495 17.9571 10.8323 17.8942 10.8858 17.7945C10.9446 17.6949 10.9579 17.59 10.9259 17.4799L10.3407 15.3008ZM0.529058 10.211C0.379426 10.211 0.253841 10.2608 0.152305 10.3605C0.0507682 10.4601 0 10.5807 0 10.7224C0 10.864 0.0507682 10.9872 0.152305 11.0921C0.253841 11.1917 0.379426 11.2416 0.529058 11.2416H11.4709C11.6152 11.2416 11.7381 11.1917 11.8397 11.0921C11.9466 10.9872 12 10.864 12 10.7224C12 10.5807 11.9466 10.4601 11.8397 10.3605C11.7381 10.2608 11.6152 10.211 11.4709 10.211H0.529058ZM6.52505 9.36927C6.52505 9.22767 6.47161 9.10705 6.36473 9.0074C6.26319 8.90251 6.14028 8.85007 5.99599 8.85007C5.8517 8.85007 5.72879 8.90251 5.62725 9.0074C5.52572 9.10705 5.47495 9.22767 5.47495 9.36927V12.0754C5.47495 12.217 5.52572 12.3403 5.62725 12.4452C5.72879 12.5448 5.8517 12.5946 5.99599 12.5946C6.14028 12.5946 6.26319 12.5448 6.36473 12.4452C6.47161 12.3403 6.52505 12.217 6.52505 12.0754V9.36927Z'
                    fill='var(--fill)'
                    strokeWidth={0.3}
                    stroke='var(--fill)'
                />
            </svg>
        </div>
    );
};

export const Actions = () => {
    const { tabOpen, toggleTab } = useSettings();
    return (
        <div className={styles.actions}>
            <div className={styles.bar}>
                <ThemeToggle />
                <Addons enabled={tabOpen} onClick={toggleTab} />
            </div>
        </div>
    );
};