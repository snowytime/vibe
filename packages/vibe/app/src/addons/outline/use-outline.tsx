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
    const { frameRef, ready } = useRegistry();
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

    // we need to log when the frame dom is ready

    // useEffect(() => {
    //     if (!frameRef.contentDocument) return;
    //     console.log(frameRef.contentDocument.body);
    // }, [frameRef]);

    const onEnableEffect = useCallback((document: Document) => {
        const root = document.body.children[0].children[0];
        const apply = (element: Element) => {
            const { children } = element;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                console.log(child);
                child.style.outline = "1px solid red";
                apply(child);
            }
        };
        apply(root);
    }, []);

    const onDisableEffect = useCallback((document: Document) => {
        const apply = (element: HTMLElement) => {
            const children = element.children;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                child.style.outline = "0";
                apply(child);
            }
        };
        apply(document.body);
    }, []);

    // useEffect(() => {
    //     if (!ready) return;
    //     const document = frameRef.contentDocument;
    //     if (outlineState.enabled) {
    //         document.body.style.padding = "1px";
    //         onEnableEffect(document);
    //     } else if (!outlineState.enabled) {
    //         document.body.style.padding = "0px";
    //         onDisableEffect(document);
    //     }
    // }, [frameRef.contentDocument, onDisableEffect, onEnableEffect, outlineState.enabled, ready]);

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
        const document = frameRef.contentDocument;
        if (outlineState.enabled) {
            document.body.style.padding = "1px";
            onEnableEffect(document);
        } else if (!outlineState.enabled) {
            document.body.style.padding = "0px";
            onDisableEffect(document);
        }
    }, [
        frameRef.contentDocument,
        frameRef.contentDocument.body,
        onDisableEffect,
        onEnableEffect,
        outlineState.enabled,
        ready,
    ]);

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
