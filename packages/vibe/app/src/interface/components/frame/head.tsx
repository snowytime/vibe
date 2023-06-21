import React from "react";
import { useFrame } from "react-frame-component";

const globalRegistry = ["/vibe/app/src"];

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

        const themeClass = document.documentElement.classList.contains("dark") ? "dark" : "light";
        const oppositeClass = themeClass === "dark" ? "light" : "dark";

        storyWindow.document.documentElement.setAttribute("data-theme", themeClass);
        storyWindow.document.documentElement.classList.add(themeClass);
        storyWindow.document.documentElement.classList.remove(oppositeClass);
    }, [storyWindow]);

    // headSync
    const syncHead = React.useCallback(() => {
        if (!storyWindow) return;

        storyWindow.document.documentElement.style.backgroundColor = "transparent";

        const oldHead = storyWindow.document.head;
        const newHead = storyWindow.document.createElement("head");
        // storyWindow.document.replaceChild(head, oldHead);

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

                // we loop over all the
                if (
                    (href && globalRegistry.some((str) => href.includes(str))) ||
                    (devId && globalRegistry.some((str) => devId.includes(str)))
                ) {
                    // Leave this stylesheet in the main document head
                    return;
                }
                newHead.appendChild(child.cloneNode(true)) as HTMLStyleElement;
                child.disabled = true;
            }
        });

        storyWindow.document.documentElement.replaceChild(newHead, oldHead);
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
