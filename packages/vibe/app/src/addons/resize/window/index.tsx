import React from "react";
import styles from "./styles.module.scss";
import { useResize } from "../use-resize";

export const ResizeWindow = ({ children }: { children: React.ReactNode }) => {
    const { enabled } = useResize();
    return (
        <div className={styles.window} data-resize-enabled={enabled}>
            <div className={styles.canvas}>
                {children}
                {enabled ? (
                    <div
                        className={styles.dragger}
                        data-direction='right'
                        // {...resizeAddon.draggerProps}
                    >
                        <div />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
