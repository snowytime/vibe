import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../store/use-store";

export enum ControlType {
    check = "check",
    text = "text",
}

type TextControl = {
    type: ControlType.text;
    value: string;
    name: string;
    description: string;
    original: string;
};

type CheckboxControl = {
    type: ControlType.check;
    value: string;
    enabled: boolean;
    name: string;
    description: string;
    original: string;
};

export type Control = TextControl | CheckboxControl;

type Controls = {
    [key: string]: Control;
};

const ControlsContext = createContext<Controls>({});

export const VibeControls = ({ children }: { children: React.ReactNode }) => {
    const { update, state } = useStore<Controls>("controls");
    const [controls, setControls] = useState(state || {});
    const enabled = useMemo(() => Object.keys(controls).length > 0, [controls]);
    const [loading, setLoading] = useState(true);

    const resetControls = useCallback(() => setControls({}), []);

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
        (name: string, value: any) => {
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
            update(name, value);
        },
        [update],
    );

    return (
        <ControlsContext.Provider
            value={{ controls, updateControl, initializeControl, loading, enabled, resetControls }}
        >
            {children}
        </ControlsContext.Provider>
    );
};

export const useControls = () => {
    return useContext(ControlsContext);
};
