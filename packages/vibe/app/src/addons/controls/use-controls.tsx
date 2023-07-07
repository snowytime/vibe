import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useStore } from "../../internals/hooks";

export enum ControlType {
    check = "check",
    toggle = "toggle",
    text = "text",
    textarea = "textarea",
    radio = "radio",
    switch = "switch",
    select = "select",
}

export type StringControl = {
    type: ControlType.text | ControlType.textarea;
    value: string;
    name: string;
    description: string;
    original: string;
};

export type RadioControl = {
    type: ControlType.radio;
    value: string;
    options: string[];
    name: string;
    description: string;
    original: string;
};

export type BooleanControl = {
    type: ControlType.check | ControlType.toggle | ControlType.switch;
    value: boolean;
    name: string;
    description: string;
    original: boolean;
};

export type Control = BooleanControl | RadioControl | StringControl;

type Controls = {
    [key: string]: Control;
};

type CachedControls = {
    [key: string]: unknown;
};

type ControlContext = {
    controls: Controls;
    updateControl: <T>(name: string, value: T) => void;
    initializeControl: (data: Partial<Control>) => void;
    resetControls: () => void;
    updateLoading: (val: boolean) => void;
    loading: boolean;
    enabled: boolean;
};

const ControlsContext = createContext<ControlContext>({} as ControlContext);

export const Context = ({ children }: { children: React.ReactNode }) => {
    const { update, state, clearState } = useStore<CachedControls>("controls", {}, true);

    const [controls, setControls] = useState({});
    const enabled = useMemo(() => Object.keys(controls).length > 0, [controls]);
    const [loading, setLoading] = useState(true);

    const updateLoading = useCallback((val: boolean) => {
        setLoading(val);
    }, []);

    const resetControls = useCallback(() => {
        clearState();
        update({ clear: true });
        setControls({});
    }, [clearState, update]);

    const initializeControl = useCallback(
        (data: Partial<Control>) => {
            const cachedState = state[data.name] ?? null;

            // initial
            update({ [data.name]: cachedState ?? data.value, cache: false });

            setControls((prevState) => {
                const newState = {
                    ...prevState,
                    [data.name]: {
                        ...data,
                        value: cachedState ?? data.value,
                    },
                };
                return newState;
            });
        },
        [state, update],
    );

    const updateControl = useCallback(
        <T,>(name: string, value: T) => {
            // set control
            update({ [name]: value });
            setControls((prevState) => {
                const newState = {
                    ...prevState,
                    [name]: {
                        ...prevState[name],
                        value,
                    },
                };
                return newState;
            });
        },
        [update],
    );

    const memoControls = useMemo(
        () => ({
            controls,
            loading,
            enabled,
            resetControls,
            initializeControl,
            updateControl,
            updateLoading,
        }),
        [
            controls,
            enabled,
            initializeControl,
            loading,
            resetControls,
            updateControl,
            updateLoading,
        ],
    );

    return <ControlsContext.Provider value={memoControls}>{children}</ControlsContext.Provider>;
};

export const useControls = () => {
    return useContext(ControlsContext);
};
