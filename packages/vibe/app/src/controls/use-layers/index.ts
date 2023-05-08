import { useCallback, useState } from "react";
import { useStore } from "../store/use-store";

type Layers = {
    enabled: boolean;
};

export const useLayersAddon = () => {
    const { update, state } = useStore<Layers>("layers");
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
