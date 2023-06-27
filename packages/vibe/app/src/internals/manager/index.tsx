import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { render, useDomRef } from "@snowytime/react-magic/hooks";
import { useLocation } from "react-router-dom";

import { useObjectiveMemo } from "../../controls";
import { Config, Story } from "../../types";

interface AddonConfig {
    name: string;
    id?: string;
    order?: number;
    panel?: React.ReactNode;
    panelHeader?: React.ReactNode;
    toolbar?: React.ReactNode;
    wildcard?: React.ReactNode;
    story?: (data: any) => React.ReactNode;
    window?: (data: any) => React.ReactNode;
    context?: (data: { children: React.ReactNode }) => React.ReactNode;
}

type Props = {
    registry: AddonConfig[];
    config: Config;
    story: Story;
    register: (data: AddonConfig) => void;
    generateId: () => string;
    pathname: string;
    panels: AddonConfig[];
    toolbars: AddonConfig[];
    themeWildcard: AddonConfig | undefined;
    frameRef: HTMLIFrameElement;
    setFrameRef: React.Dispatch<HTMLIFrameElement>;
    ready: boolean;
    updateReady: (state: boolean) => void;
    mappedStoryWrappers: (component: React.ReactNode, args: any) => React.ReactNode;
    mappedWindow: (children: React.ReactNode) => React.ReactNode;
    registerStory: (story: Story) => void;
};

export const ManagerContext = createContext<Props>(null);

export const Manager = ({
    children,
    addons,
    config,
}: {
    children: React.ReactNode;
    addons: Record<string, any>;
    config: Config;
}) => {
    const [addonRegistry, setAddonRegistry] = useState<AddonConfig[]>([]);
    const [frameRef, setFrameRef] = useDomRef<HTMLIFrameElement>();
    const { pathname } = useLocation();
    const [_story, setStory] = useState(null);
    const story = useObjectiveMemo<Story | null>(_story);

    const registerStory = useCallback(
        (story: Story) => {
            setStory(story);
        },
        [setStory],
    );

    useEffect(() => {
        setReady(false);
    }, [pathname]);

    const [ready, setReady] = useState(false);

    const updateReady = useCallback((state: boolean) => {
        setReady(state);
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

    useEffect(() => {
        addons.forEach((addon) => {
            registerAddon(addon);
        });
    }, [addons, registerAddon]);

    const generateId = useCallback(() => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }, []);

    const memoizedRegistry = useObjectiveMemo(addonRegistry);

    const panels = useMemo(() => {
        return memoizedRegistry
            .filter((addon) => addon.panel)
            .sort((a, b) => (a.order > b.order ? 1 : -1));
    }, [memoizedRegistry]);

    const themeWildcard = useMemo(() => {
        return memoizedRegistry.find((addon) => addon.wildcard && addon.id === "theme-addon");
    }, [memoizedRegistry]);

    const mappedStoryWrappers = useCallback(
        (component: React.ReactNode, args: any) => {
            const storyWrappers = memoizedRegistry
                .filter((addon) => addon.story)
                .map((addon) => addon.story);

            const renderedComponent = component;

            if (!storyWrappers.length) return renderedComponent;

            return storyWrappers.reduceRight((component, ctx) => {
                return ctx({ Component: component, ...args });
            }, renderedComponent);
        },
        [memoizedRegistry],
    );

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

    const mappedWindow = useCallback((children: React.ReactNode) => {
        const windows = memoizedRegistry
            .filter((addon) => addon.window)
            .map((addon) => addon.window);

        const renderedComponent = children;

        if (!windows.length) return renderedComponent;

        return windows.reduceRight((component, ctx) => {
            return ctx({ children: component });
        }, renderedComponent);
    }, [memoizedRegistry]);

    const memo = useMemo(
        () => ({
            registry: memoizedRegistry,
            register: registerAddon,
            generateId,
            panels,
            themeWildcard,
            mappedStoryWrappers,
            mappedWindow,
            toolbars,
            frameRef,
            setFrameRef,
            ready,
            updateReady,
            pathname,
            config,
            story,
            registerStory,
        }),
        [
            memoizedRegistry,
            mappedStoryWrappers,
            registerAddon,
            generateId,
            panels,
            toolbars,
            frameRef,
            setFrameRef,
            mappedWindow,
            ready,
            config,
            story,
            updateReady,
            themeWildcard,
            pathname,
            registerStory,
        ],
    );

    return <ManagerContext.Provider value={memo}>{mappedChildren}</ManagerContext.Provider>;
};

export const useRegistry = () => {
    return useContext(ManagerContext);
};
