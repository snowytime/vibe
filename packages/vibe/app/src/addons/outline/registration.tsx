import React, { useEffect } from "react";
import { useRegistry } from "../../internals/manager";
import { OutlineContext } from "./use-outline";
import { Toolbar } from "./toolbar";

export const useRegisterOutlineAddon = () => {
    const { register } = useRegistry();
    const id = "outline-addon";

    useEffect(() => {
        register({
            id,
            name: "Outline",
            toolbar: <Toolbar />,
            // window: <Window />,
            context: ({ children }) => <OutlineContext>{children}</OutlineContext>,
        });
    }, [register]);
};
