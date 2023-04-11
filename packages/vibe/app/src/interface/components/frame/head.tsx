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

        // Loop through each stylesheet in the main document head
        for (let i = 0; i < mainHead.children.length; i++) {
            const child = mainHead.children[i];
            if (
                child.tagName === "STYLE" ||
                (child.tagName === "LINK" &&
                    (child.getAttribute("type") === "text/css" ||
                        child.getAttribute("rel") === "stylesheet"))
            ) {
                const href = child.getAttribute("href");
                const devId = child.getAttribute("data-vite-dev-id");

                // Check if the stylesheet path contains any of the globalRegistry strings
                if (
                    (href && globalRegistry.some((str) => href.includes(str))) ||
                    (devId && globalRegistry.some((str) => devId.includes(str)))
                ) {
                    // Leave this stylesheet in the main document head
                    continue;
                }

                // Copy the stylesheet to the iframe head
                storyWindow.document.head.appendChild(child.cloneNode(true)) as HTMLStyleElement;

                // Remove the stylesheet from the main document head
                mainHead.removeChild(child);
                i--;
            }
        }
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
