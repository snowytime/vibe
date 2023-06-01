import { useCallback } from "react";
import { useStore } from "../store/use-store";

type Layers = {
    enabled: boolean;
};

export const useLayersAddon = () => {
    const { update, state } = useStore<Layers>("layers", {
        enabled: {
            value: false,
            cache: true,
        },
    });

    const toggleEnabled = useCallback(() => {
        const updatedState = !state.enabled;
        update({ enabled: updatedState });
    }, [state.enabled, update]);

    return {
        enabled: state.enabled,
        toggleEnabled,
    };
};
