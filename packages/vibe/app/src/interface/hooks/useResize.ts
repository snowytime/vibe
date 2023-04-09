import { useState, useEffect, useCallback } from "react";

export function useResize(ref: HTMLDivElement) {
    const [enabled, setEnabled] = useState(true); // whether or not the element is enabled
    const [bounds, setBounds] = useState({ width: 0, height: 0 }); // the max size of the element
    const [width, setWidth] = useState(""); // the current width of the element
    const [height, setHeight] = useState(""); // the current height of the element
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

    const updateRect = useCallback(() => {
        if (!ref) return;
        setBounds({
            width: ref.getBoundingClientRect().width,
            height: ref.getBoundingClientRect().height,
        });
    }, [ref]);

    const disableOnResize = useCallback(() => {
        if (!ref) return;
        if (enabled) {
            setEnabled(false);
            setWidth("");
            setHeight("");
        }
    }, [ref, enabled]);

    // register the resize handler
    useEffect(() => {
        if (!ref) return;
        updateRect();
        window.addEventListener("resize", () => {
            updateRect();
            disableOnResize();
        });
        return () => {
            window.removeEventListener("resize", () => {
                updateRect();
                disableOnResize();
            });
        };
    }, [ref, enabled, updateRect, disableOnResize]);

    // resize toggle
    const toggleResize = useCallback(() => {
        if (!ref) return;
        setEnabled((r) => {
            if (r) {
                setWidth("");
                setHeight("");
            } else {
                setWidth(`${ref.getBoundingClientRect().width - 60}px`);
                setHeight(`${ref.getBoundingClientRect().height - 30 - 30 - 20 - 20}px`);
            }
            return !r;
        });
    }, [ref]);

    // dragger handlers
    const onMouseDown = useCallback((e: MouseEvent) => {
        setDragging(true);
        setInitialPos({ x: e.clientX, y: e.clientY });
    }, []);

    const onMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent, direction: "top" | "right" | "bottom" | "left") => {
            if (!ref) return;
            if (!dragging) return;
            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            if (direction === "right") {
                const proposedValue = parseFloat(width) + deltaX * 2;
                if (proposedValue > bounds.width) return;
                setWidth((w) => `${parseFloat(w) + deltaX * 2}px`);
            }
            if (direction === "bottom") {
                const proposedValue = parseFloat(height) + deltaY * 2;
                if (proposedValue > bounds.height) return;
                setHeight((h) => `${parseFloat(h) + deltaY * 2}px`);
            }
            if (direction === "left") {
                const proposedValue = parseFloat(width) - deltaX * 2;
                if (proposedValue > bounds.width) return;
                setWidth((w) => `${parseFloat(w) - deltaX * 2}px`);
            }
            if (direction === "top") {
                const proposedValue = parseFloat(height) - deltaY * 2;
                if (proposedValue > bounds.height) return;
                setHeight((h) => `${parseFloat(h) - deltaY * 2}px`);
            }
            setInitialPos({ x: e.clientX, y: e.clientY });
        },
        [bounds.height, bounds.width, dragging, height, initialPos.x, initialPos.y, ref, width],
    );

    // passed onto the draggers individually
    const draggerProps = (direction: "top" | "right" | "bottom" | "left") => ({
        onMouseDown,
        onMouseUp,
        onMouseMove: (e: MouseEvent) => onMouseMove(e, direction),
        role: "button",
        tabIndex: 0,
    });

    return { width, height, enabled, setEnabled, toggleResize, draggerProps };
}
