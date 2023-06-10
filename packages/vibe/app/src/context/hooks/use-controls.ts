import { GenericContext } from "@snowytime/react-magic/helpers";
import React, { useContext, useMemo } from "react";
import { Action, Args, VibeContextItems } from "../types";

export const useControls = () => {
    const { addons, dispatch } = useContext(GenericContext as any) as VibeContextItems;
    // take the items stored in addons.controls.data and serialize to array of objects
    const storyControls = useMemo(() => {
        const controls = Object.entries(addons.controls.data).map(
            ([name, value]: [string, Args]) => ({
                name,
                original: value.value,
                ...value,
            }),
        );
        return controls;
    }, [addons.controls.data]);

    const update = (what: string, to: Omit<Args, "name">) => {
        dispatch({
            type: Action.set_addon_controls_update,
            payload: {
                name: what,
                ...to,
            },
        });
    };

    return {
        storyControls,
        update,
    };
};
