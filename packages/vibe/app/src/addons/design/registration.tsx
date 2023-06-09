import React, { useEffect } from "react";
import { useRegistry } from "../../internals/manager";
import { Panel } from "./panel";

export const useRegisterDesignAddon = () => {
    const { register } = useRegistry();
    const id = "design-addon";

    useEffect(() => {
        register({
            id,
            name: "Design",
            panel: <Panel />,
        });
    }, [register]);
};
