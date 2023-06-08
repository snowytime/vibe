import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { useStore } from "../store/use-store";
import { Story, Tree } from "../../types";
import { filterTree } from "./helpers";

export enum Theme {
    light = "light",
    dark = "dark",
}

type SettingsProps = {
    sidebarOpen: boolean;
    theme: Theme;
    tabOpen: boolean;
    selectedPanel: "sandbox" | "docs";
    selectedTab: string;
    search: string;
    selectedAddon: string;
    tabHeight: number;
    filteredTree: Tree;
    story: Story;
};

type Settings = {
    sidebarOpen: boolean;
    theme: Theme;
    tabOpen: boolean;
    selectedPanel: "sandbox" | "docs";
    selectedTab: string;
    search: string;
    selectedAddon: string;
    tabHeight: number;
    filteredTree: Tree;
    story: Story;
    // methods:
    toggleSidebar: () => void;
    updateSearch: (query: string) => void;
    updateSelectedAddon: (addon: string) => void;
    updateTheme: (theme: Theme) => void;
    toggleTab: () => void;
    updateSelectedPanel: (panel: "sandbox" | "docs") => void;
    updateTab: (tab: string) => void;
    updateTabHeight: (height: number) => void;
};

const SettingsContext = createContext<Settings>(null);

export const VibeSettings = ({
    children,
    storyTree,
    story,
}: {
    children: React.ReactNode;
    storyTree: Tree;
    story: Story;
}) => {
    const { state, update } = useStore<SettingsProps>("settings", {
        sidebarOpen: {
            value: true,
            cache: true,
        },
        theme: {
            value: Theme.light,
            cache: true,
        },
        tabOpen: {
            value: true,
            cache: true,
        },
        selectedPanel: {
            value: "sandbox",
            cache: true,
        },
        selectedTab: {
            value: null,
            cache: true,
        },
        search: {
            value: "",
            cache: true,
        },
        selectedAddon: {
            value: null,
            cache: true,
        },
        tabHeight: {
            value: 300,
            cache: true,
        },
    });

    const [filteredTree, setFilteredTree] = useState(storyTree);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", state.theme);
        document.documentElement.style.transition = "color 0.2s ease-in-out";
    }, [state.theme]);

    // useLayoutEffect(() => {
    //     if (!registry.length) return;
    //     const cachedTab = state.selectedTab;
    //     const addonConfiguration = registry.find((entry) => entry.id === cachedTab);
    //     if (!addonConfiguration.panel) {
    //         // we need to select a new tab that is actually active
    //         const nearestSelectedTab = registry.find((entry) => entry.panel)?.id || "";
    //         update({ selectedTab: nearestSelectedTab, cache: true });
    //     }
    // }, [registry, state.selectedTab, update]);

    // methods
    const updateSearch = useCallback(
        (query: string) => {
            update({ search: query });
            setFilteredTree(filterTree(storyTree, query));
        },
        [storyTree, update],
    );

    const toggleSidebar = useCallback(() => {
        const updatedState = !state.sidebarOpen;
        update({ sidebarOpen: updatedState });
    }, [state.sidebarOpen, update]);

    const toggleTab = useCallback(() => {
        const updatedState = !state.tabOpen;
        update({ tabOpen: updatedState });
    }, [state.tabOpen, update]);

    const updateSelectedPanel = useCallback(
        (panel: "sandbox" | "docs") => {
            update({ selectedPanel: panel });
        },
        [update],
    );

    const updateTab = useCallback(
        (tab: string) => {
            update({ selectedTab: tab });
        },
        [update],
    );

    const updateTheme = useCallback(
        (theme: Theme) => {
            update({ theme });
        },
        [update],
    );

    const updateSelectedAddon = useCallback(
        (addon: string) => {
            update({ selectedAddon: addon });
        },
        [update],
    );

    const updateTabHeight = useCallback(
        (height: number, cache?: boolean = false) => {
            update({ tabHeight: height, cache });
        },
        [update],
    );

    const memo = useMemo(
        () => ({
            // states
            ...state,
            filteredTree,
            story,
            // methods
            updateSearch,
            toggleSidebar,
            updateTheme,
            updateSelectedAddon,
            toggleTab,
            updateSelectedPanel,
            updateTab,
            updateTabHeight,
            update,
        }),
        [
            filteredTree,
            state,
            story,
            toggleSidebar,
            toggleTab,
            updateSearch,
            updateSelectedAddon,
            updateSelectedPanel,
            updateTab,
            updateTabHeight,
            updateTheme,
            update,
        ],
    );

    return (
        <SettingsContext.Provider value={memo}>
            {/* <b>{sidebarOpen ? "open" : "closed"}</b> */}
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    return useContext(SettingsContext);
};
