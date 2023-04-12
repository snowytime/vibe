import { useCallback, useEffect, useState } from "react";
import { useVibe } from "../../context";

export const useOutlineAddon = (ref: HTMLIFrameElement) => {
    const { addons } = useVibe();

    const [prevOverlay, setPrevOverlay] = useState<HTMLElement>();

    const createOverlay = useCallback(
        (target: HTMLElement) => {
            if (!ref) return;
            const boundingRect = target.getBoundingClientRect();
            const parent = ref.contentDocument;
            const { scrollX, scrollY } = ref.contentWindow;

            const computedStyles = getComputedStyle(target);

            const overlayElement = parent.createElement("div");
            overlayElement.setAttribute("data-overlay", "");
            overlayElement.style.position = "absolute";
            overlayElement.style.top = `${boundingRect.top + scrollY}px`;
            overlayElement.style.left = `${boundingRect.left + scrollX}px`;
            overlayElement.style.width = `${boundingRect.width}px`;
            overlayElement.style.height = `${boundingRect.height}px`;
            overlayElement.style.pointerEvents = "none";

            const marginOverlay = parent.createElement("div");
            marginOverlay.style.position = "absolute";
            marginOverlay.style.top = `-${computedStyles.marginTop}`;
            marginOverlay.style.right = `-${computedStyles.marginRight}`;
            marginOverlay.style.bottom = `-${computedStyles.marginBottom}`;
            marginOverlay.style.left = `-${computedStyles.marginLeft}`;
            marginOverlay.style.pointerEvents = "none";
            marginOverlay.style.backgroundColor = "rgba(255, 165, 0, 0.2)";
            overlayElement.appendChild(marginOverlay);

            const paddingOverlay = parent.createElement("div");
            paddingOverlay.style.position = "absolute";
            paddingOverlay.style.top = `${computedStyles.paddingTop}`;
            paddingOverlay.style.right = `${computedStyles.paddingRight}`;
            paddingOverlay.style.bottom = `${computedStyles.paddingBottom}`;
            paddingOverlay.style.left = `${computedStyles.paddingLeft}`;
            paddingOverlay.style.pointerEvents = "none";
            paddingOverlay.style.backgroundColor = "rgba(0, 191, 255, 0.2)";
            overlayElement.appendChild(paddingOverlay);

            const contentOverlay = parent.createElement("div");
            contentOverlay.style.position = "absolute";
            contentOverlay.style.top = "0";
            contentOverlay.style.right = "0";
            contentOverlay.style.bottom = "0";
            contentOverlay.style.left = "0";
            contentOverlay.style.pointerEvents = "none";
            contentOverlay.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
            overlayElement.appendChild(contentOverlay);

            parent.body.appendChild(overlayElement);

            return overlayElement;
        },
        [ref],
    );

    const removeOverlay = useCallback(() => {
        if (prevOverlay) {
            prevOverlay.remove();
            setPrevOverlay(undefined);
        }
    }, [prevOverlay]);

    const moveHandler = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!ref.contentDocument.body.contains(target)) return;

            if (target !== prevOverlay?.querySelector(":scope > div")) {
                removeOverlay();
                const overlay = createOverlay(target);
                if (overlay) setPrevOverlay(overlay);
            }
        },
        [createOverlay, prevOverlay, ref, removeOverlay],
    );

    const handleLeave = useCallback(() => {
        if (!ref) return;
        const nodes = ref.contentDocument.querySelectorAll("[data-overlay]");
        if (Array.isArray(nodes) && nodes.length) {
            for (const node of nodes) {
                node.delete();
            }
        }
        removeOverlay();
    }, [ref, removeOverlay]);

    const addListeners = useCallback(() => {
        if (!ref) return;
        ref.contentDocument.body.addEventListener("mousemove", moveHandler);
        ref.contentDocument.body.addEventListener("mouseleave", handleLeave);
    }, [handleLeave, moveHandler, ref]);

    const removeListeners = useCallback(() => {
        if (!ref) return;
        ref.contentDocument.body.removeEventListener("mousemove", moveHandler);
        ref.contentDocument.body.removeEventListener("mouseleave", handleLeave);
    }, [handleLeave, moveHandler, ref]);

    useEffect(() => {
        if (!ref) return;
        if (addons.outline.enabled) {
            setTimeout(() => addListeners(), 0);
        } else {
            removeListeners();
        }
        return () => removeListeners();
    }, [addListeners, addons.outline.enabled, ref, removeListeners]);
};
