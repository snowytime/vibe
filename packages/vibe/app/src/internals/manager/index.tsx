import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useDomRef } from "@snowytime/react-magic/hooks";

import { useObjectiveMemo } from "../../controls";

interface AddonConfig {
    name: string;
    id?: string;
    order?: number;
    panel?: React.ReactNode;
    panelHeader?: React.ReactNode;
    toolbar?: React.ReactNode;
    context?: (data: { children: React.ReactNode }) => React.ReactNode;
}

type Props = {
    registry: AddonConfig[];
    register: (data: AddonConfig) => void;
    generateId: () => string;
    panels: AddonConfig[];
    toolbars: AddonConfig[];
    frameRef: HTMLIFrameElement;
    setFrameRef: React.Dispatch<HTMLIFrameElement>;
};

export const ManagerContext = createContext<Props>(null);

export const Manager = ({ children }: { children: React.ReactNode }) => {
    const [addonRegistry, setAddonRegistry] = useState<AddonConfig[]>([]);

    const [frameRef, setFrameRef] = useDomRef<HTMLIFrameElement>();

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
                return [...prev.filter((p) => p.id !== id), { ...existingRecord, ...rest }].sort(
                    (a, b) => (a.order > b.order ? 1 : -1),
                );
            }
            return [...prev, { id, order: prev.length, ...rest }].sort((a, b) =>
                a.order > b.order ? 1 : -1,
            );
        });
    }, []);

    const memoizedRegistry = useObjectiveMemo(addonRegistry);

    const panels = useMemo(() => {
        return memoizedRegistry
            .filter((addon) => addon.panel)
            .sort((a, b) => (a.order > b.order ? 1 : -1));
    }, [memoizedRegistry]);

    const toolbars = useMemo(() => {
        return memoizedRegistry
            .filter((addon) => addon.toolbar)
            .sort((a, b) => (a.order > b.order ? 1 : -1));
    }, [memoizedRegistry]);

    const mappedChildren = useMemo(() => {
        const addonContexts = memoizedRegistry
            .filter((addon) => addon.context)
            .map((addon) => addon.context);

        const renderedComponent = children;

        if (!addonContexts.length) return renderedComponent;

        return addonContexts.reduceRight((component, ctx) => {
            return ctx({ children: component });
        }, renderedComponent);
    }, [children, memoizedRegistry]);

    const memo = useMemo(
        () => ({
            registry: memoizedRegistry,
            register: registerAddon,
            generateId,
            panels,
            toolbars,
            frameRef,
            setFrameRef,
        }),
        [memoizedRegistry, registerAddon, generateId, panels, toolbars, frameRef, setFrameRef],
    );

    return <ManagerContext.Provider value={memo}>{mappedChildren}</ManagerContext.Provider>;
};

export const useRegistry = () => {
    return useContext(ManagerContext);
};
