import { useCallback, useState } from "react";
import { useStore } from "../store/use-store";

type Resize = {
    height: number;
    width: number;
    enabled: boolean;
};

export const useResizeAddon = () => {
    const { update, state } = useStore<Resize>("resize");
    const [enabled, setEnabled] = useState(state.enabled ?? false);

    const toggleEnabled = useCallback(() => {
        const updatedState = !enabled;
        setEnabled(updatedState);
        update("enabled", updatedState);
    }, [enabled, update]);

    return {
        enabled,
        toggleEnabled,
    };
};
