import { useState, useEffect, useCallback, MouseEvent, useRef } from "react";
import { useVibeContext } from "../../context";

export function useResize(ref: HTMLDivElement) {
    const { dispatch, resizeEnabled } = useVibeContext();
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

    const disableAll = useCallback(() => {
        setWidth("");
        setHeight("");
        setDragging(false);
        setInitialPos({ x: 0, y: 0 });
        dispatch({ type: "setResizeEnabled", payload: false });
    }, [dispatch]);

    const disableOnResize = useCallback(() => {
        if (!ref) return;
        if (resizeEnabled) {
            disableAll();
        }
    }, [ref, resizeEnabled, disableAll]);

    // register the resize handler
    useEffect(() => {
        if (!ref) return;
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
    }, [ref, resizeEnabled, updateRect, disableOnResize]);

    // resize toggle
    useEffect(() => {
        if (!ref) return;
        if (!resizeEnabled) {
            disableAll();
        } else {
            setWidth(() => {
                const wbBound = `${ref.getBoundingClientRect().width - 60}px`;
                setBounds((b) => ({ ...b, width: parseFloat(wbBound) }));
                return wbBound;
            });
            setHeight(() => {
                const hbBound = `${ref.getBoundingClientRect().height - 60}px`;
                setBounds((b) => ({ ...b, height: parseFloat(hbBound) }));
                return hbBound;
            });
        }
    }, [ref, resizeEnabled, disableAll]);

    // dragger handlers

    const onMouseUp = useCallback(() => {
        setDragging(false);
        window.removeEventListener("mouseup", onMouseUp);
    }, []);

    const onMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setDragging(true);
            setInitialPos({ x: e.clientX, y: e.clientY });
            window.addEventListener("mouseup", onMouseUp);
        },
        [onMouseUp],
    );

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>, direction: "top" | "right" | "bottom" | "left") => {
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
        onDragStart: () => false,
        onMouseMove: (e: MouseEvent<HTMLDivElement>) => onMouseMove(e, direction),
        role: "button",
        tabIndex: 0,
    });

    return { width, height, draggerProps };
}
