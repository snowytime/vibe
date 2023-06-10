import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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

    const css = useRef(null);

    const createStylesheet = useCallback(
        (root: Document, action: boolean) => {
            if (action) {
                const outlineClassName = generateId();
                const paddingClassName = generateId();
                const newCssStyleSheet = root.createElement("style");
                newCssStyleSheet.innerHTML = `
                    .${outlineClassName} { outline: 1px solid red; }
                    .${paddingClassName} { padding: 1px; }
                `;
                root.head.appendChild(newCssStyleSheet);

                // set for later
                css.current = {
                    outline: outlineClassName,
                    padding: paddingClassName,
                    styleSheet: newCssStyleSheet,
                };
            } else {
                const { styleSheet } = css.current;
                styleSheet.remove();
                css.current = null;
            }
        },
        [generateId],
    );

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
                    if (attributeValue === "") {
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
                child.classList.add(css.current.outline);
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
                child.classList.remove(css.current.outline);
                apply(child);
            }
        };
        apply(document.body);
    }, []);

    useEffect(() => {
        if (!ready) return;
        const document = frameRef.contentDocument;
        if (outlineState.enabled) {
            createStylesheet(document, true);
            document.body.classList.add(css.current.padding);
            onEnableEffect(document);
        } else if (!outlineState.enabled) {
            if (css.current) {
                document.body.classList.remove(css.current.padding);
                onDisableEffect(document);
            }
            // document.body.style.padding = "0px";
        }
    }, [
        createStylesheet,
        frameRef.contentDocument,
        onDisableEffect,
        onEnableEffect,
        outlineState.enabled,
        ready,
    ]);

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
