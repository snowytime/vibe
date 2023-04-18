import React, { useCallback, useEffect } from "react";
import { useVibe } from "./context/hook.js";
import { Action, Control } from "./context/types.js";
import { useLocation } from "react-router-dom";

function getObjectArrayWithNames(obj) {
    return Object.entries(obj).map(([name, value]) => ({ name, ...value }));
}

export const Argument = ({ children, args, data }) => {
    const { pathname } = useLocation();
    const { addons, dispatch } = useVibe();
    useEffect(() => {
        // reset the state
        if (addons.controls.id !== data.id) {
            dispatch({
                type: Action.set_addon_controls_switch,
            });
            const obj = Object.entries(args).map(([name, value]) => ({
                name,
                ...value,
            }));

            for (const entry of obj) {
                dispatch({
                    type: Action.set_addon_controls_update,
                    payload: { ...entry },
                });
            }

            dispatch({
                type: Action.set_addon_controls_id,
                payload: { id: data.id },
            });
        }
        // const defaultArguments = Object.entries(obj).map(([name, value]) => ({ name, ...value }));
        // only on mount
    }, [addons.controls.data, addons.controls.id, args, data.id, dispatch, pathname]);

    // 1. dispatch a call to the addons.controls to add the contents of the args to the vibe state
    const serializeControls = useCallback(() => {
        if (!args) return {};
        const obj = Object.entries(addons.controls.data).map(([name, value]) => ({
            [name]: value.value,
        }));
        const result = obj.reduce((obj, item) => {
            return { ...obj, ...item };
        }, {});
        return result;
    }, [addons.controls.data, args]);

    // 2. take the updated contents of addons.controls and using useMemo create a props object form it
    // 3. provide that to the children
    return <>{React.createElement(children, { ...data, ...serializeControls() })}</>;
};
