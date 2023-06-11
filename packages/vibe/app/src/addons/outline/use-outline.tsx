import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useStore } from "../../internals/hooks/use-store";
import { useRegistry } from "../../internals/manager";

type OutlineState = {
    enabled: boolean;
};

type OutlineMethods = {
    toggleEnabled: (state?: boolean) => void;
};

type OutlineContext = OutlineState & OutlineMethods;

const Context = createContext<OutlineContext>(null);

export const OutlineContext = ({ children }: { children: React.ReactNode }) => {
    const { frameRef, generateId } = useRegistry();
    const [ready, setReady] = useState(false);
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
    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.target === document.documentElement &&
                    mutation.attributeName === "data-storyloaded"
                ) {
                    const attributeValue =
                        document.documentElement.getAttribute("data-storyloaded");
                    // Attribute has been set, do something with the value
                    if (attributeValue === "true") {
                        setReady(true);
                    }
                }
            }
        });

        // Start observing changes in the attributes of the root element
        observer.observe(document.documentElement, { attributes: true });

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    const onEnableEffect = useCallback((document: Document) => {
        const apply = (element: HTMLElement) => {
            const children = element.children;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                child.style.outline = "1px solid red";
                apply(child);
            }
        };
        apply(document.body);
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
    }, [frameRef.contentDocument, onDisableEffect, onEnableEffect, outlineState.enabled, ready]);

    const toggleEnabled = useCallback(() => {
        const newState = !outlineState.enabled;
        if (newState) {
            updateOutlineState({ enabled: newState });
        } else {
            clearState();
            updateOutlineState({ enabled: newState, cache: false, clear: true });
        }
    }, [outlineState.enabled, updateOutlineState, clearState]);

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
