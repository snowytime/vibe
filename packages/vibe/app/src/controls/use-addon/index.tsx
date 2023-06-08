import React, {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { useObjectiveMemo } from "../store/use-store";

interface AddonConfig {
    id: string;
    panel: boolean;
}

type Props = {
    registry: AddonConfig[];
    register: (data: AddonConfig) => void;
};

const AddonsContext = createContext<Props>(null);

export const AddonManager = ({ children }: { children: React.ReactNode }) => {
    const [addonRegistry, setAddonRegistry] = useState<AddonConfig[]>([]);

    const registerAddon = useCallback(
        ({ id, ...rest }: AddonConfig) => {
            setAddonRegistry((prev) => {
                const existingRecord = prev.find((record) => record.id === id);
                if (existingRecord) {
                    return [...prev.filter((p) => p.id !== id), { ...existingRecord, ...rest }];
                }
                return [...prev, { id, ...rest }];
            });
        },
        [], // Empty dependency array for useCallback
    );

    const memoizedRegistry = useObjectiveMemo(addonRegistry);

    const memo = useMemo(
        () => ({
            registry: memoizedRegistry,
            register: registerAddon,
        }),
        [memoizedRegistry, registerAddon],
    );

    return <AddonsContext.Provider value={memo}>{children}</AddonsContext.Provider>;
};

export const useAddonRegistry = () => {
    return useContext(AddonsContext);
};
