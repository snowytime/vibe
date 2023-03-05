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
    const syncHead = () => {
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
    };
    React.useEffect(() => {
        if (active) {
            syncHead();
            const observer = new MutationObserver(() => syncHead());
            document.documentElement.setAttribute("data-iframed", "");
            observer.observe(document.head, {
                subtree: true,
                characterData: true,
                childList: true,
            });
            return () => {
                observer && observer.disconnect();
            };
        }
    }, [active]);
    return <>{children}</>;
};
