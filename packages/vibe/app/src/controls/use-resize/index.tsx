import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { useStore } from "../store/use-store";

type ResizeState = {
    height: number;
    width: number;
    enabled: boolean;
};

type ResizeMethods = {
    toggleEnabled: (ref: HTMLDivElement) => void;
    updateHeight: (height: number) => void;
    updateWidth: (width: number) => void;
};

type ResizeProps = ResizeState & ResizeMethods;

const Context = createContext<ResizeProps>(null);

export const ResizeContext = ({ children }: { children: React.ReactNode }) => {
    const { update, state } = useStore<ResizeState>("resize");

    const initialState: ResizeState = {
        enabled: state.enabled || false,
        height: state.height || 0,
        width: state.width || 0,
    };

    const [data, updateData] = useReducer((prev: ResizeState, next: Partial<ResizeState>) => {
        return { ...prev, ...next };
    }, initialState);

    const calculateInitials = useCallback((ref: HTMLDivElement) => {
        const { height, width } = ref.getBoundingClientRect();
        return { height, width };
    }, []);

    const updateHeight = useCallback(
        (height: number) => {
            updateData({ height });
            update("height", height);
        },
        [update],
    );

    const updateWidth = useCallback(
        (width: number) => {
            updateData({ width });
            update("width", width);
        },
        [update],
    );

    const toggleEnabled = useCallback(
        (ref: HTMLDivElement) => {
            const nextState = !data.enabled;
            const initialMeasurements = calculateInitials(ref);
            updateData({ enabled: nextState, ...initialMeasurements });
            update("enabled", nextState);
            update("height", initialMeasurements.height);
            update("width", initialMeasurements.width);
        },
        [calculateInitials, data.enabled, update],
    );

    const memo = useMemo(
        () => ({
            ...data,
            toggleEnabled,
            updateHeight,
            updateWidth,
        }),
        [data, toggleEnabled, updateHeight, updateWidth],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useResizeAddon = () => {
    return useContext(Context);
    // const { update, state } = useStore<Resize>("resize");
    // const [enabled, setEnabled] = useState(state.enabled ?? false);

    // const initialState = {
    //     height: 0,
    //     width: 0,
    // };

    // const [data, updateData] = useReducer(
    //     (prev: typeof initialState, next: Partial<typeof initialState>) => {
    //         return { ...prev, ...next };
    //     },
    //     { height: state.height || 0, width: state.width || 0 },
    // );

    // const calculateInitials = useCallback(() => {
    //     if (!ref) return;
    //     const { height, width } = ref.getBoundingClientRect();
    //     updateData({ height, width });
    // }, [ref]);

    // useEffect(() => {
    //     calculateInitials();
    // }, [calculateInitials]);

    // const toggleEnabled = useCallback(() => {
    //     const updatedState = !enabled;
    //     setEnabled(updatedState);
    //     update("enabled", updatedState);
    // }, [enabled, update]);

    // return {
    //     enabled,
    //     toggleEnabled,
    //     ...data,
    // };
};
