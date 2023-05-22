import React from "react";
import { useFrame } from "react-frame-component";

const globalRegistry = ["/vibe/app/src/interface"];

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
        const mainHead = document.head;

        storyWindow.document.documentElement.style.backgroundColor = "transparent";

        [...(document.head.children as any)].forEach((child) => {
            if (
                child.tagName === "STYLE" ||
                (child.tagName === "LINK" &&
                    (child.getAttribute("type") === "text/css" ||
                        child.getAttribute("rel") === "stylesheet"))
            ) {
                // remove it from the vibe main styles if it does not pertain to globals
                const href = child.getAttribute("href");
                const devId = child.getAttribute("data-vite-dev-id");

                if (
                    (href && globalRegistry.some((str) => href.includes(str))) ||
                    (devId && globalRegistry.some((str) => devId.includes(str)))
                ) {
                    // Leave this stylesheet in the main document head
                    return;
                }

                storyWindow.document.head.appendChild(child.cloneNode(true)) as HTMLStyleElement;
                mainHead.removeChild(child);
            }
        });
    }, [storyWindow]);

    // theme sync effect
    React.useEffect(() => {
        if (!active) return;
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
