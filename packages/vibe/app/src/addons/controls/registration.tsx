import React, { useEffect } from "react";
import { useRegistry } from "../../internals/manager";
import { Panel } from "./panel";
import { Context } from "./use-controls";

export const useRegisterControlsAddon = () => {
    const { register } = useRegistry();
    const id = "controls-addon";

    useEffect(() => {
        register({
            id,
            name: "Controls",
            panel: <Panel />,
            context: ({ children }) => <Context>{children}</Context>,
        });
    }, [register]);
};
