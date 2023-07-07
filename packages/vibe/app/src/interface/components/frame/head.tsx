import React, { useEffect, useLayoutEffect } from "react";
import { useFrame } from "react-frame-component";
import { useRegistry } from "../../../internals/manager";

const globalRegistry = ["/vibe/app/src"];

export const SynchronizeHead = ({
    active,
    children,
}: {
    active: boolean;
    children: React.ReactNode;
}) => {
    const { window: storyWindow } = useFrame();
    const { pathname, story } = useRegistry();

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
        if (!story) return;

        storyWindow.document.documentElement.style.backgroundColor = "transparent";

        const oldHead = storyWindow.document.head;
        const newHead = storyWindow.document.createElement("head");

        [...(document.head.children as any)].forEach((child) => {
            if (
                child.tagName === "STYLE" ||
                (child.tagName === "LINK" &&
                    (child.getAttribute("type") === "text/css" ||
                        child.getAttribute("rel") === "stylesheet"))
            ) {
                // get content
                const content = child.textContent;
                const firstLine = content.split("\n")[0];

                const vibeOnly = (line) => line.includes('"vibe"');

                // we loop over all the
                if (vibeOnly(firstLine)) {
                    // this is a Vibe ui stylesheet, and should not be applied to the story
                    return;
                }
                const alteredChild = child.cloneNode(true);
                newHead.appendChild(alteredChild) as HTMLStyleElement;
            }
        });
        storyWindow.document.documentElement.replaceChild(newHead, oldHead);
    }, [storyWindow, story]);

    // theme sync effect
    useLayoutEffect(() => {
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
    }, [syncHead, syncTheme]);

    useLayoutEffect(() => {
        syncHead();
        syncTheme();
    }, [syncHead, syncTheme]);

    return <>{children}</>;
};
