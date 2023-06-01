import { useCallback } from "react";
import { useStore } from "../store/use-store";

type Outline = {
    enabled: boolean;
};

export const useOutlineAddon = () => {
    const { update, state } = useStore<Outline>("outline", {
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
