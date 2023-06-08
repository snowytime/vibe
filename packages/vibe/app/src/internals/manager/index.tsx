import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useObjectiveMemo } from "../../controls";

interface AddonConfig {
    name: string;
    id?: string;
    panel?: React.ReactNode;
    panelHeader?: React.ReactNode;
}

type Props = {
    registry: AddonConfig[];
    register: (data: AddonConfig) => void;
    generateId: () => string;
    panels: AddonConfig[];
};

export const ManagerContext = createContext<Props>(null);

export const Manager = ({ children }: { children: React.ReactNode }) => {
    const [addonRegistry, setAddonRegistry] = useState<AddonConfig[]>([]);

    const generateId = useCallback(() => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }, []);

    const registerAddon = useCallback(({ id, ...rest }: AddonConfig) => {
        setAddonRegistry((prev) => {
            const existingRecord = prev.find((record) => record.id === id);
            if (existingRecord) {
                return [...prev.filter((p) => p.id !== id), { ...existingRecord, ...rest }];
            }
            return [...prev, { id, ...rest }];
        });
    }, []);

    const memoizedRegistry = useObjectiveMemo(addonRegistry);

    const panels = useMemo(
        () => memoizedRegistry.filter((addon) => addon.panel),
        [memoizedRegistry],
    );

    const memo = useMemo(
        () => ({
            registry: memoizedRegistry,
            register: registerAddon,
            generateId,
            panels,
        }),
        [memoizedRegistry, registerAddon, generateId, panels],
    );

    return <ManagerContext.Provider value={memo}>{children}</ManagerContext.Provider>;
};

export const useRegistry = () => {
    return useContext(ManagerContext);
};
