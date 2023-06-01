import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useStore } from "../store/use-store";

export enum ControlType {
    check = "check",
    toggle = "toggle",
    text = "text",
    radio = "radio",
}

export type TextControl = {
    type: ControlType.text;
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

export type CheckboxControl = {
    type: ControlType.check | ControlType.toggle;
    value: boolean;
    name: string;
    description: string;
    original: boolean;
};

export type Control = TextControl | CheckboxControl | RadioControl;

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
    loading: boolean;
    enabled: boolean;
};

const ControlsContext = createContext<ControlContext>({} as ControlContext);

export const VibeControls = ({ children }: { children: React.ReactNode }) => {
    const { update, state, clearState } = useStore<CachedControls>("controls", {});
    const [controls, setControls] = useState({});
    const enabled = useMemo(() => Object.keys(controls).length > 0, [controls]);
    const [loading, setLoading] = useState(true);

    const resetControls = useCallback(() => {
        clearState();
    }, [clearState]);

    const initializeControl = useCallback(
        (data: Partial<Control>) => {
            const cachedState = state[data.name] || null;

            setControls((prevState) => {
                const newState = {
                    ...prevState,
                    [data.name]: {
                        ...data,
                        value: cachedState || data.value,
                    },
                };
                return newState;
            });

            setLoading(false);
        },
        [state],
    );

    const updateControl = useCallback(
        <T,>(name: string, value: T) => {
            // set control
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
            // serialize
            update({ [name]: value });
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
        }),
        [controls, enabled, initializeControl, loading, resetControls, updateControl],
    );

    return <ControlsContext.Provider value={memoControls}>{children}</ControlsContext.Provider>;
};

export const useControls = () => {
    return useContext(ControlsContext);
};
