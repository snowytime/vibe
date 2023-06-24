import React, { useEffect, useMemo } from "react";
import { useControls } from "../use-controls";

export const StoryWrapped = ({ Story, args, ...rest }) => {
    const { initializeControl, controls, resetControls } = useControls();
    useEffect(() => {
        // reset the state
        if (!args) return;
        const obj = Object.entries(args).map(([name, value]) => ({
            name,
            original: value.value,
            ...value,
        }));

        if (obj.length === 0) {
            resetControls?.();
            return;
        }

        for (const entry of obj) {
            initializeControl?.(entry);
        }

        // const defaultArguments = Object.entries(obj).map(([name, value]) => ({ name, ...value }));
        // only on mount
    }, [args, initializeControl, resetControls]);

    // 1. dispatch a call to the addons.controls to add the contents of the args to the vibe state
    const serializeControls = useMemo(() => {
        if (!args) return {};
        if (!controls) {
            return {};
        }
        const obj = Object.entries(controls).map(([name, value]) => ({
            [name]: value.value,
        }));
        const result = obj.reduce((obj, item) => {
            return { ...obj, ...item };
        }, {});
        return result;
    }, [args, controls]);

    // 2. take the updated contents of addons.controls and using useMemo create a props object form it
    // 3. provide that to the children
    return <Story {...rest} {...serializeControls} />;
};
