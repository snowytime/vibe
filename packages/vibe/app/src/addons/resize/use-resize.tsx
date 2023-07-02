import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    MouseEvent,
    useState,
    useEffect,
} from "react";
import { useStore } from "../../internals/hooks/use-store";

type ResizeState = {
    height: number;
    width: number;
    enabled: boolean;
    maxHeight: number;
    maxWidth: number;
};

type ResizeMethods = {
    toggleEnabled: () => void;
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

type ResizeContext = Omit<
    ResizeState & ResizeMethods & ResizePassedProps,
    "maxWidth" | "maxHeight"
>;

const Context = createContext<ResizeContext>(null);

export const ResizeContext = ({ children }: { children: React.ReactNode }) => {
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

    const [windowRef, setWindowRef] = useState<HTMLDivElement>(null);
    const [canvasRef, setCanvasRef] = useState<HTMLDivElement>(null);

    const initExtremes = useCallback(
        (bypass?: boolean) => {
            if (resizeState.enabled && canvasRef && windowRef) {
                if (!bypass && !resizeState.maxHeight) return;
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
        },
        [
            canvasRef,
            resizeState.enabled,
            resizeState.height,
            resizeState.maxHeight,
            resizeState.width,
            updateResizeState,
            windowRef,
        ],
    );

    useEffect(() => {
        initExtremes();
    }, [resizeState.enabled]);

    const updateHeight = useCallback(
        (height: number) => {
            if (height > resizeState.maxHeight) {
                updateResizeState({ height: resizeState.maxHeight });
                initExtremes(true);
            } else {
                updateResizeState({ height });
            }
        },
        [resizeState.maxHeight, updateResizeState, initExtremes],
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
        if (!dragging) return;

        setDragging(false);
        updateResizeState({ height: temporaryHeight, width: temporaryWidth });
        setInitialPos({ x: 0, y: 0 });
    }, [dragging, temporaryHeight, temporaryWidth, updateResizeState]);

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!dragging) return;

            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            const proposedX = temporaryWidth + deltaX * 2;
            const proposedY = temporaryHeight + deltaY * 2;
            if (proposedX <= resizeState.maxWidth) {
                updateResizeState({ width: proposedX, cache: false });
                setTemporaryWidth(proposedX);
            }
            if (proposedY <= resizeState.maxHeight) {
                updateResizeState({ height: proposedY, cache: false });
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
            updateResizeState,
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
            width: resizeState.width,
            height: resizeState.height,
            toggleEnabled,
            updateHeight,
            updateWidth,
            registerWindowRef,
            registerCanvasRef,
            panelProps,
            draggerProps,
        }),
        [
            draggerProps,
            panelProps,
            registerCanvasRef,
            registerWindowRef,
            resizeState.enabled,
            resizeState.height,
            resizeState.width,
            toggleEnabled,
            updateHeight,
            updateWidth,
        ],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useResize = () => {
    return useContext(Context);
};
