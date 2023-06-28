import React from "react";
import styles from "./styles.module.scss";
import { useResize } from "../use-resize";

export const ResizeWindow = ({ children }: { children: React.ReactNode }) => {
    const {
        enabled,
        registerCanvasRef,
        registerWindowRef,
        draggerProps,
        panelProps,
        width,
        height,
    } = useResize();
    return (
        <div
            {...panelProps}
            className={styles.window}
            ref={registerWindowRef}
            data-resize-enabled={enabled}
        >
            <div
                className={styles.canvas}
                ref={registerCanvasRef}
                style={
                    enabled
                        ? {
                              width: `${width}px`,
                              height: `${height}px`,
                          }
                        : {}
                }
            >
                {children}
                {enabled ? (
                    <div className={styles.dragger} data-direction='right' {...draggerProps}>
                        <div />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
