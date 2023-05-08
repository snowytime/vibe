import { useCallback, useState } from "react";
import { useStore } from "../store/use-store";

type Controls = {
    enabled: boolean;
};

export const useControlsAddon = () => {
    const { update, state } = useStore<Controls>("controls");
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
