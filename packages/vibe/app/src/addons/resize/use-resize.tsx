import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useStore } from "../../internals/hooks/use-store";

type ResizeState = {
    enabled: boolean;
};

type ResizeMethods = {
    toggleEnabled: (state?: boolean) => void;
};

type ResizeContext = ResizeState & ResizeMethods;

const Context = createContext<ResizeContext>(null);

export const ResizeContext = ({ children }: { children: React.ReactNode }) => {
    const {
        state: resizeState,
        update: updateResizeState,
        clearState,
    } = useStore<ResizeState>("resize", {
        enabled: {
            value: false,
            cache: true,
        },
    });

    const toggleEnabled = useCallback(() => {
        const newState = !resizeState.enabled;
        if (newState) {
            updateResizeState({ enabled: newState });
        } else {
            clearState();
            updateResizeState({ enabled: newState, cache: false, clear: true });
        }
    }, [resizeState.enabled, updateResizeState, clearState]);

    const memo = useMemo(
        () => ({
            enabled: resizeState.enabled,
            toggleEnabled,
        }),
        [resizeState.enabled, toggleEnabled],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useResize = () => {
    return useContext(Context);
};
