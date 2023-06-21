import React from "react";
import { useRegistry } from "./internals/manager";

export const HOC = ({ children }: { children: React.ReactNode }) => {
    const { updateReady } = useRegistry();
    return <div ref={() => updateReady(true)}>{children}</div>;
};
