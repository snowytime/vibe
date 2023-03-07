import React from "react";
import { useFrame } from "react-frame-component";

export const SynchronizeHead = ({
    active,
    children,
}: {
    active: boolean;
    children: React.ReactNode;
}) => {
    const { window: storyWindow } = useFrame();
    // theme sync
    const syncTheme = React.useCallback(() => {
        if (!storyWindow) return;
        const themeAttribute = document.documentElement.getAttribute("data-theme");
        storyWindow.document.documentElement.setAttribute("data-theme", themeAttribute || "");
    }, [storyWindow]);
    // headSync
    const syncHead = React.useCallback(() => {
        if (!storyWindow) return;
        storyWindow.document.documentElement.setAttribute("dir", "ltr");
        [...(document.head.children as any)].forEach((child) => {
            if (
                child.tagName === "STYLE" ||
                (child.tagName === "LINK" &&
                    (child.getAttribute("type") === "text/css" ||
                        child.getAttribute("rel") === "stylesheet"))
            ) {
                storyWindow.document.head.appendChild(child.cloneNode(true)) as HTMLStyleElement;
            }
        });
    }, [storyWindow]);
    // theme sync effect
    React.useEffect(() => {
        // theme
        if (!active) return;
        syncHead();
        const themeObserver = new MutationObserver(() => syncTheme());
        themeObserver.observe(document.documentElement, { attributes: true });
        const headObserver = new MutationObserver(() => syncHead());
        headObserver.observe(document.head, {
            subtree: true,
            characterData: true,
            childList: true,
        });
        return () => {
            themeObserver.disconnect();
            headObserver.disconnect();
        };
    }, [active, syncHead, syncTheme]);
    return <>{children}</>;
};
