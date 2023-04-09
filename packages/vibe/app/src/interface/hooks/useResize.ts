import { useState, useEffect, useCallback, MouseEvent } from "react";
import { useVibe, Action } from "../../context";

export function useResize(ref: HTMLDivElement, panelRef: HTMLDivElement) {
    const { dispatch, addons } = useVibe();
    const [bounds, setBounds] = useState({ width: 0, height: 0 }); // the max size of the element
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

    // set the bound for the absolute max size of the element
    useEffect(() => {
        if (!panelRef) return;
        setBounds({
            width: panelRef.getBoundingClientRect().width - 60,
            height: panelRef.getBoundingClientRect().height - 60,
        });
    }, [panelRef]);

    const updateRect = useCallback(() => {
        if (!ref) return;
        setBounds({
            width: ref.getBoundingClientRect().width,
            height: ref.getBoundingClientRect().height,
        });
    }, [ref]);

    const disableAll = useCallback(() => {
        dispatch({ type: Action.setWidth, payload: { state: "" } });
        dispatch({ type: Action.setHeight, payload: { state: "" } });
        setDragging(false);
        setInitialPos({ x: 0, y: 0 });
        dispatch({ type: Action.setResizeEnabled, payload: { state: false } });
    }, [dispatch]);

    const disableOnResize = useCallback(() => {
        if (!ref) return;
        if (addons.resize.enabled) {
            disableAll();
        }
    }, [ref, addons.resize.enabled, disableAll]);

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
    }, [ref, addons.resize.enabled, updateRect, disableOnResize]);

    // resize toggle
    useEffect(() => {
        if (!ref) return;
        if (!addons.resize.enabled) {
            disableAll();
        } else {
            // we need to get the intial size of the element from the cache
            // if the sizing goes beyond the bounds, we set it to the default sizing
            dispatch({
                type: Action.setWidth,
                payload: {
                    state: addons.resize.width || `${ref.getBoundingClientRect().width}px`,
                },
            });
            dispatch({
                type: Action.setHeight,
                payload: {
                    state: addons.resize.height || `${ref.getBoundingClientRect().height}px`,
                },
            });
        }
    }, [
        ref,
        disableAll,
        addons.resize.enabled,
        dispatch,
        bounds.width,
        bounds.height,
        addons.resize.width,
        addons.resize.height,
    ]);

    // dragger handlers

    const onMouseUp = useCallback(() => {
        setDragging(false);
        window.removeEventListener("mouseup", onMouseUp);
    }, []);

    const onMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
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
                const proposedValue = parseFloat(addons.resize.width) + deltaX * 2;
                if (proposedValue > bounds.width) return;
                dispatch({
                    type: Action.setWidth,
                    payload: { state: `${parseFloat(addons.resize.width) + deltaX * 2}px` },
                });
            }
            if (direction === "bottom") {
                const proposedValue = parseFloat(addons.resize.height) + deltaY * 2;
                if (proposedValue > bounds.height) return;
                dispatch({
                    type: Action.setHeight,
                    payload: { state: `${parseFloat(addons.resize.height) + deltaY * 2}px` },
                });
            }
            if (direction === "left") {
                const proposedValue = parseFloat(addons.resize.width) - deltaX * 2;
                if (proposedValue > bounds.width) return;
                dispatch({
                    type: Action.setWidth,
                    payload: { state: `${parseFloat(addons.resize.width) - deltaX * 2}px` },
                });
            }
            if (direction === "top") {
                const proposedValue = parseFloat(addons.resize.height) - deltaY * 2;
                if (proposedValue > bounds.height) return;
                dispatch({
                    type: Action.setHeight,
                    payload: { state: `${parseFloat(addons.resize.height) - deltaY * 2}px` },
                });
            }
            setInitialPos({ x: e.clientX, y: e.clientY });
        },
        [
            addons.resize.height,
            addons.resize.width,
            bounds.height,
            bounds.width,
            dispatch,
            dragging,
            initialPos.x,
            initialPos.y,
            ref,
        ],
    );

    // passed onto the draggers individually
    const draggerProps = (direction: "top" | "right" | "bottom" | "left") => ({
        onMouseUp,
        onMouseDown,
        onMouseMove: (e: MouseEvent<HTMLDivElement>) => onMouseMove(e, direction),
        role: "button",
        tabIndex: 0,
    });

    return { draggerProps };
}
