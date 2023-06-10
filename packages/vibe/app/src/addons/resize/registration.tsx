import React, { useEffect } from "react";
import { useRegistry } from "../../internals/manager";

export const useRegisterResizeAddon = () => {
    const { register } = useRegistry();
    const id = "resize-addon";

    useEffect(() => {
        register({
            id,
            name: "Resize",
            // toolbar: <Toolbar />,
            // window: <Window />,
            context: ({ children }) => children,
        });
    }, [register]);
};
