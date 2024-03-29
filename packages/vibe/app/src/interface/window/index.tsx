import React, { useCallback, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { useResizeAddon } from "../../controls";
import { TabSection } from "./tabs";
import { Tab, Tabs } from "../ui/tabs";
import { Input, InputSize } from "../ui/input";
import { useSettings } from "../../internals/settings";
import { useRegistry } from "../../internals/manager";

export const SidebarButton = ({ onClick }: { onClick: () => void }) => (
    <div className={styles.addon} onClick={onClick} role='button' tabIndex={0}>
        <svg width='55%' viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M10.193 12.5801H15.8978C16.1503 12.5801 16.3302 12.5231 16.4377 12.409C16.5505 12.2949 16.6069 12.1075 16.6069 11.8468V3.16133C16.6069 2.9006 16.5505 2.7132 16.4377 2.59913C16.3302 2.48506 16.1503 2.42803 15.8978 2.42803H10.193C9.94049 2.42803 9.75785 2.48506 9.64504 2.59913C9.5376 2.7132 9.48388 2.9006 9.48388 3.16133V11.8468C9.48388 12.1075 9.5376 12.2949 9.64504 12.409C9.75785 12.5231 9.94049 12.5801 10.193 12.5801ZM2.74767 7.49593C2.74767 7.64259 2.7987 7.77295 2.90076 7.88702C3.0082 7.99565 3.13175 8.04997 3.27142 8.04997H5.52757L6.7201 8.00109L6.05131 8.64476L5.18109 9.51657C5.07902 9.61434 5.02799 9.74199 5.02799 9.89951C5.02799 10.0462 5.07096 10.1684 5.15691 10.2662C5.24823 10.3585 5.36373 10.4047 5.50339 10.4047C5.58397 10.4047 5.6538 10.3884 5.71289 10.3558C5.77735 10.3232 5.83644 10.2743 5.89016 10.2091L8.0335 7.89517C8.15168 7.7648 8.21077 7.63172 8.21077 7.49593C8.21077 7.36013 8.15168 7.22705 8.0335 7.09669L5.89016 4.78273C5.83644 4.72298 5.77735 4.67681 5.71289 4.64422C5.6538 4.61162 5.58397 4.59533 5.50339 4.59533C5.36373 4.59533 5.24823 4.64422 5.15691 4.74199C5.07096 4.83433 5.02799 4.95383 5.02799 5.10049C5.02799 5.25258 5.07902 5.38023 5.18109 5.48343L6.05131 6.34709L6.7201 6.99077L5.52757 6.95003H3.27142C3.13175 6.95003 3.0082 7.00435 2.90076 7.11298C2.79333 7.22162 2.7423 7.34927 2.74767 7.49593ZM2.53011 15H16.4699C17.3186 15 17.9525 14.7882 18.3715 14.3645C18.7905 13.9462 19 13.3188 19 12.4823V2.5258C19 1.6893 18.7905 1.05921 18.3715 0.635524C17.9525 0.211841 17.3186 0 16.4699 0H2.53011C1.68674 0 1.05287 0.211841 0.628499 0.635524C0.2095 1.05378 0 1.68387 0 2.5258V12.4823C0 13.3188 0.2095 13.9462 0.628499 14.3645C1.05287 14.7882 1.68674 15 2.53011 15ZM2.54623 13.6882C2.14334 13.6882 1.83446 13.5823 1.61959 13.3705C1.40472 13.1532 1.29729 12.8327 1.29729 12.409V2.59913C1.29729 2.17545 1.40472 1.85497 1.61959 1.6377C1.83446 1.42042 2.14334 1.31179 2.54623 1.31179H16.4538C16.8513 1.31179 17.1575 1.42042 17.3724 1.6377C17.5926 1.85497 17.7027 2.17545 17.7027 2.59913V12.409C17.7027 12.8327 17.5926 13.1532 17.3724 13.3705C17.1575 13.5823 16.8513 13.6882 16.4538 13.6882H2.54623Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.1'
            />
        </svg>
    </div>
);

export const Window = ({ children }: { children: React.ReactNode }) => {
    const { sidebarOpen, toggleSidebar, selectedPanel, updateSelectedPanel } = useSettings();
    const { toolbars, mappedWindow, error } = useRegistry();

    if (error) {
        return <div className={styles.wrapper}>{children}</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <Tabs selected={selectedPanel} onChange={updateSelectedPanel}>
                    <Tab value='sandbox'>
                        <div className={styles.tab}>Sandbox</div>
                    </Tab>
                    <Tab value='docs'>
                        <div className={styles.tab}>Docs</div>
                    </Tab>
                </Tabs>
                <div className={styles.features}>
                    {!sidebarOpen ? <SidebarButton onClick={toggleSidebar} /> : null}
                    {toolbars.map((toolbar) => (
                        <div className={styles.feature_wrapper} key={toolbar.id}>
                            {toolbar.toolbar}
                        </div>
                    ))}
                </div>
            </div>
            {/* render docs */}
            <div
                className={styles.window_wrapper}
                data-hidden={selectedPanel !== "docs" || !selectedPanel}
            >
                {children}
            </div>
            {/* main window */}
            <div className={styles.window_wrapper} data-hidden={selectedPanel !== "sandbox"}>
                <div className={styles.window}>{mappedWindow(children)}</div>
                <TabSection />
            </div>
        </div>
    );
};
