import { useCallback, useState } from "react";
import { useStore } from "../store/use-store";

type Outline = {
    enabled: boolean;
};

export const useOutlineAddon = () => {
    const { update, state } = useStore<Outline>("outline");
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
