import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useStore } from "../../internals/hooks/use-store";
import { useRegistry } from "../../internals/manager";
import { useObjectiveMemo } from "../../internals/hooks";

type OutlineState = {
    enabled: boolean;
};

type OutlineMethods = {
    toggleEnabled: (state?: boolean) => void;
};

type OutlineContext = OutlineState & OutlineMethods;

const Context = createContext<OutlineContext>(null);

export const OutlineContext = ({ children }: { children: React.ReactNode }) => {
    const { frameRef, ready, pathname } = useRegistry();
    const {
        state: outlineState,
        update: updateOutlineState,
        clearState,
    } = useStore<OutlineState>("outline", {
        enabled: {
            value: false,
            cache: true,
        },
    });

    const onEnableEffect = useCallback(() => {
        const root = frameRef.contentDocument.getElementsByClassName(
            "frame-content",
        )[0] as HTMLElement;
        root.style.padding = "1px";
        const apply = (element: Element) => {
            const { children } = element;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                child.style.outline = "1px solid red";
                apply(child);
            }
        };
        apply(root);
    }, [frameRef]);

    const onDisableEffect = useCallback(() => {
        const root = frameRef.contentDocument.getElementsByClassName(
            "frame-content",
        )[0] as HTMLElement;
        root.style.padding = "0";
        const apply = (element: Element) => {
            const { children } = element;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                child.style.outline = "0";
                apply(child);
            }
        };
        apply(root);
    }, [frameRef]);

    const toggleEnabled = useCallback(() => {
        const newState = !outlineState.enabled;
        if (newState) {
            updateOutlineState({ enabled: newState });
        } else {
            clearState();
            updateOutlineState({ enabled: newState, cache: false, clear: true });
        }
    }, [outlineState.enabled, updateOutlineState, clearState]);

    useEffect(() => {
        if (!ready) return;
        if (outlineState.enabled) {
            onEnableEffect();
        } else if (!outlineState.enabled) {
            onDisableEffect();
        }
    }, [onDisableEffect, onEnableEffect, outlineState.enabled, ready, pathname]);

    const memo = useMemo(
        () => ({
            enabled: outlineState.enabled,
            toggleEnabled,
        }),
        [outlineState.enabled, toggleEnabled],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useOutlineAddon = () => {
    return useContext(Context);
};
