import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    MouseEvent,
    useState,
    useReducer,
} from "react";
import { useStore, useObjectiveMemo } from "../store/use-store";

type ResizeState = {
    height: number;
    width: number;
    enabled: boolean;
    maxHeight: number;
    maxWidth: number;
};

type ResizeMethods = {
    toggleEnabled: (ref: HTMLDivElement) => void;
    updateHeight: (height: number) => void;
    updateWidth: (width: number) => void;
    registerWindowRef: (ref: HTMLDivElement) => void;
    registerCanvasRef: (ref: HTMLDivElement) => void;
};

type ResizePassedProps = {
    draggerProps: {
        onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
        role: string;
        tabIndex: number;
    };
    panelProps: {
        onMouseUp: () => void;
        onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
        role: string;
        tabIndex: number;
    };
};

type ResizeProps = ResizeState & ResizeMethods & ResizePassedProps;

const Context = createContext<ResizeProps>(null);

const useTypedReducer = <T,>(setter: (prev: T, curr: Partial<T>) => T, initial: T) =>
    useReducer((prev: T, curr: Partial<T>) => ({ ...prev, ...curr }), initial);

export const ResizeContext = ({ children }: { children: React.ReactNode }) => {
    // new approach
    type ResizeState = {
        height: number;
        width: number;
        enabled: boolean;
        maxHeight: number;
        maxWidth: number;
    };
    const {
        state: resizeState,
        update: updateResizeState,
        clearState,
    } = useStore<ResizeState>("resize", {
        enabled: {
            value: false,
            cache: true,
        },
        height: {
            value: 0,
            cache: true,
        },
        width: {
            value: 0,
            cache: true,
        },
        maxWidth: {
            value: 0,
            cache: false,
        },
        maxHeight: {
            value: 0,
            cache: false,
        },
    });

    // on enabling, we need to set the initial heights

    const [windowRef, setWindowRef] = useState<HTMLDivElement>(null);
    const [canvasRef, setCanvasRef] = useState<HTMLDivElement>(null);

    const initExtremes = useCallback(() => {
        if (resizeState.enabled && canvasRef && windowRef && !resizeState.maxHeight) {
            const { height: maxHeight, width: maxWidth } = windowRef.getBoundingClientRect();
            const { height, width } = canvasRef.getBoundingClientRect();
            if (!maxHeight || !maxWidth) return;

            const currentHeight = resizeState.height || height;
            const currentWidth = resizeState.width || width;

            const adjustedMaxHeight = maxHeight - 2 * 30;
            const adjustedMaxWidth = maxWidth - 2 * 30;

            updateResizeState({
                height: currentHeight
                    ? currentHeight > adjustedMaxHeight
                        ? adjustedMaxHeight
                        : currentHeight
                    : adjustedMaxHeight,
                width: currentWidth
                    ? currentWidth > adjustedMaxWidth
                        ? adjustedMaxWidth
                        : currentWidth
                    : adjustedMaxWidth,
                maxWidth: adjustedMaxWidth,
                maxHeight: adjustedMaxHeight,
            });
        }
    }, [
        canvasRef,
        resizeState.enabled,
        resizeState.height,
        resizeState.maxHeight,
        resizeState.width,
        updateResizeState,
        windowRef,
    ]);

    // on enabling
    useEffect(() => {
        initExtremes();
    }, [initExtremes, resizeState.enabled]);

    const updateHeight = useCallback(
        (height: number) => {
            if (height > resizeState.maxHeight) {
                updateResizeState({ height: resizeState.maxHeight });
            } else {
                updateResizeState({ height });
            }
        },
        [updateResizeState, resizeState.maxHeight],
    );

    const updateWidth = useCallback(
        (width: number) => {
            if (width > resizeState.maxWidth) {
                updateResizeState({ width: resizeState.maxWidth });
            } else {
                updateResizeState({ width });
            }
        },
        [resizeState.maxWidth, updateResizeState],
    );

    const toggleEnabled = useCallback(() => {
        const newState = !resizeState.enabled;
        if (newState) {
            updateResizeState({ enabled: newState });
        } else {
            clearState();
            updateResizeState({ enabled: newState, cache: false, clear: true });
        }
    }, [resizeState.enabled, updateResizeState, clearState]);

    const registerWindowRef = useCallback((ref: HTMLDivElement) => {
        setWindowRef(ref);
    }, []);

    const registerCanvasRef = useCallback((ref: HTMLDivElement) => {
        setCanvasRef(ref);
    }, []);

    // this will keep the max size of the window in sync
    const handleResizeObservation = useCallback(() => {
        const { height: maxHeight, width: maxWidth } = windowRef.getBoundingClientRect();
        const { height, width } = canvasRef.getBoundingClientRect();
        if (!maxHeight || !maxWidth) return;

        const currentHeight = resizeState.height || height;
        const currentWidth = resizeState.width || width;

        const adjustedMaxHeight = maxHeight - 2 * 30;
        const adjustedMaxWidth = maxWidth - 2 * 30;

        const getHeight = () => {
            const enlarged = currentHeight > adjustedMaxHeight;
            if (enlarged) {
                return { height: adjustedMaxHeight };
            }
            return {};
        };

        const getWidth = () => {
            const enlarged = currentWidth > adjustedMaxWidth;
            if (enlarged) {
                return { width: adjustedMaxWidth };
            }
            return {};
        };

        updateResizeState({
            maxHeight: adjustedMaxHeight,
            maxWidth: adjustedMaxWidth,
            ...getHeight(),
            ...getWidth(),
            cache: false,
        });
    }, [canvasRef, resizeState.height, resizeState.width, updateResizeState, windowRef]);

    useEffect(() => {
        if (!windowRef) return;

        const windowObserver = new ResizeObserver(handleResizeObservation);
        windowObserver.observe(windowRef);

        return () => windowObserver.disconnect();
    }, [handleResizeObservation, resizeState.enabled, windowRef]);

    // resize handlers
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

    const [temporaryHeight, setTemporaryHeight] = useState(null);
    const [temporaryWidth, setTemporaryWidth] = useState(null);

    const [dragging, setDragging] = useState(false);

    const onMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            setDragging(true);
            setInitialPos({ x: e.clientX, y: e.clientY });
            setTemporaryHeight(resizeState.height);
            setTemporaryWidth(resizeState.width);
        },
        [resizeState.height, resizeState.width],
    );

    const onMouseUp = useCallback(() => {
        setDragging(false);
        updateResizeState({ height: temporaryHeight, width: temporaryWidth });
        setInitialPos({ x: 0, y: 0 });
    }, [temporaryHeight, temporaryWidth, updateResizeState]);

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!dragging) return;

            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            const proposedX = temporaryWidth + deltaX * 2;
            const proposedY = temporaryHeight + deltaY * 2;
            if (proposedX <= resizeState.maxWidth) {
                // updateResizeState({ width: proposedX, cache: false });
                setTemporaryWidth(proposedX);
            }
            if (proposedY <= resizeState.maxHeight) {
                // updateResizeState({ height: proposedY, cache: false });
                setTemporaryHeight(proposedY);
            }
            setInitialPos({ x: e.clientX, y: e.clientY });
        },
        [
            dragging,
            initialPos.x,
            initialPos.y,
            resizeState.maxHeight,
            resizeState.maxWidth,
            temporaryHeight,
            temporaryWidth,
        ],
    );

    // passed onto the draggers individually
    const draggerProps = useMemo(
        () => ({
            // onMouseUp,
            onMouseDown: (e: MouseEvent<HTMLDivElement>) => onMouseDown(e),
            // onMouseMove: (e: MouseEvent<HTMLDivElement>) => onMouseMove(e),
            role: "button",
            tabIndex: 0,
        }),
        [onMouseDown],
    );

    const panelProps = useMemo(
        () => ({
            onMouseUp,
            onMouseMove,
            role: "button",
            tabIndex: 0,
        }),
        [onMouseMove, onMouseUp],
    );

    const memo = useMemo(
        () => ({
            enabled: resizeState.enabled,
            width: dragging ? temporaryWidth : resizeState.width,
            height: dragging ? temporaryHeight : resizeState.height,
            maxHeight: resizeState.maxHeight,
            maxWidth: resizeState.maxWidth,
            toggleEnabled,
            updateHeight,
            updateWidth,
            registerWindowRef,
            registerCanvasRef,
            panelProps,
            draggerProps,
        }),
        [
            resizeState.enabled,
            resizeState.width,
            resizeState.height,
            resizeState.maxHeight,
            resizeState.maxWidth,
            dragging,
            temporaryWidth,
            temporaryHeight,
            toggleEnabled,
            updateHeight,
            updateWidth,
            registerWindowRef,
            registerCanvasRef,
            panelProps,
            draggerProps,
        ],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useResizeAddon = () => {
    return useContext(Context);
};
