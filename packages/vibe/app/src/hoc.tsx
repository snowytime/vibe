import React, { useEffect } from "react";
import { useRegistry } from "./internals/manager";

export const HOC = ({ children }: { children: React.ReactNode }) => {
    const { updateReady } = useRegistry();
    useEffect(() => {
        if (children) {
            updateReady(true);
        }
    }, [children, updateReady]);
    return <>{children}</>;
};
