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
                // stylesheet
                const getIntent = () => {
                    const isDev = !!child.getAttribute("data-vite-dev-id");
                    if (isDev) {
                        return /use:\s*vibe/.test(child.textContent)
                            ? "vibe"
                            : /use:\s*universal/.test(child.textContent)
                            ? "universal"
                            : "story";
                    }
                    return child.getAttribute("data-intent") || "story";
                };

                // console.log({ intent: getIntent() });

                if (getIntent() === "vibe") return;
                if (getIntent() === "universal") {
                    const alteredChild = child.cloneNode(true);
                    newHead.appendChild(alteredChild) as HTMLStyleElement;
                }
                if (getIntent() === "story") {
                    const newChild = child.cloneNode(true);
                    newChild.disabled = false;
                    if (child.tagName === "LINK") {
                        newChild.href = new URL(child.href, window.location.href).href;
                    }
                    newChild.disabled = false;
                    newHead.appendChild(newChild) as HTMLStyleElement;
                }
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
