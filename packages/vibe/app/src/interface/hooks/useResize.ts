import { useState, useEffect, useCallback, MouseEvent } from "react";
import { useVibe, Action } from "../../context";

export function useResize(ref: HTMLDivElement, panelRef: HTMLDivElement) {
    const { dispatch, addons } = useVibe();
    const [bounds, setBounds] = useState({ width: 0, height: 0 }); // the max size of the element
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

    const updateRect = useCallback(() => {
        if (!panelRef) return;
        setBounds({
            width: panelRef.getBoundingClientRect().width - 60,
            height: panelRef.getBoundingClientRect().height - 60,
        });
    }, [panelRef]);

    useEffect(() => {
        if (!ref) return;
        console.log(bounds.height, addons.resize.height);
        if (addons.resize && parseFloat(addons.resize.width) > bounds.width) {
            dispatch({
                type: Action.setWidth,
                payload: { state: `${bounds.width}px` },
            });
        }
        if (addons.resize && parseFloat(addons.resize.height) > bounds.height) {
            dispatch({
                type: Action.setHeight,

                payload: { state: `${bounds.height}px` },
            });
        }
    }, [
        bounds,
        addons.resize.width,
        addons.resize.height,
        dispatch,
        addons.open,
        ref,
        addons.resize,
    ]);

    // set the bound for the absolute max size of the element
    useEffect(() => {
        updateRect();
    }, [updateRect, dragging, addons.resize.enabled, addons.open]);

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

    // the onMouseDown is started on the handler, but the onMouseMove and onMouseUp are applied to the window

    const onMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setInitialPos({ x: e.clientX, y: e.clientY });
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!ref) return;
            if (!dragging) return;
            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            const proposedX = parseFloat(addons.resize.width) + deltaX * 2;
            const proposedY = parseFloat(addons.resize.height) + deltaY * 2;
            if (proposedX < bounds.width) {
                dispatch({
                    type: Action.setWidth,
                    payload: { state: `${parseFloat(addons.resize.width) + deltaX * 2}px` },
                });
            }
            if (proposedY < bounds.height) {
                dispatch({
                    type: Action.setHeight,
                    payload: { state: `${parseFloat(addons.resize.height) + deltaY * 2}px` },
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
    const draggerProps = {
        // onMouseUp,
        onMouseDown: (e: MouseEvent<HTMLDivElement>) => onMouseDown(e),
        // onMouseMove: (e: MouseEvent<HTMLDivElement>) => onMouseMove(e),
        role: "button",
        tabIndex: 0,
    };

    const panelProps = {
        onMouseUp,
        onMouseMove,
        role: "button",
        tabIndex: 0,
    };

    return { draggerProps, panelProps };
}
