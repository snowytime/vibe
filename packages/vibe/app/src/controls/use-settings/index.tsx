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
    const { update, state } = useStore<Settings>("settings");
    // useEffect(() => console.log(state.sidebarOpen), [state]);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(state.sidebarOpen ?? true);
    const [selectedPanel, setSelectedPanel] = useState<"sandbox" | "docs">(
        state.selectedPanel ?? "sandbox",
    );
    const [selectedTab, setSelectedTab] = useState(state.selectedTab ?? "design");
    const [tabOpen, setTabOpen] = useState(state.tabOpen ?? true);
    const [theme, setTheme] = useState<Theme>(state.theme ?? Theme.light);
    const [search, setSearch] = useState(state.search ?? "");
    const [selectedAddon, setSelectedAddon] = useState(state.selectedAddon ?? "");
    const [tabHeight, setTabHeight] = useState(300);

    const [filteredTree, setFilteredTree] = useState(storyTree);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.transition = "color 0.2s ease-in-out";
    }, [search, storyTree, theme]);

    // methods
    const updateSearch = useCallback(
        (query: string) => {
            setSearch(query);
            setFilteredTree(filterTree(storyTree, query));
            update("search", query);
        },
        [storyTree, update],
    );

    const toggleSidebar = useCallback(() => {
        const updatedState = !sidebarOpen;
        setSidebarOpen(updatedState);
        update("sidebarOpen", updatedState);
    }, [sidebarOpen, update]);

    const toggleTab = useCallback(() => {
        const updatedState = !tabOpen;
        setTabOpen(updatedState);
        setTabHeight(null);
        update("tabOpen", updatedState);
    }, [tabOpen, update]);

    const updateSelectedPanel = useCallback(
        (panel: "sandbox" | "docs") => {
            setSelectedPanel(panel);
            update("selectedPanel", panel);
        },
        [update],
    );

    const updateTab = useCallback(
        (tab: string) => {
            setSelectedTab(tab);
            update("selectedTab", tab);
        },
        [update],
    );

    const updateTheme = useCallback(
        (theme: Theme) => {
            setTheme(theme);
            update("theme", theme);
        },
        [update],
    );

    const updateSelectedAddon = useCallback(
        (addon: string) => {
            setSelectedAddon(addon);
            update("selectedAddon", addon);
        },
        [update],
    );

    const updateTabHeight = useCallback((height: number) => {
        setTabHeight(height);
    }, []);

    const memo = useMemo(
        () => ({
            // states
            sidebarOpen,
            theme,
            search,
            selectedAddon,
            selectedTab,
            selectedPanel,
            tabOpen,
            tabHeight,
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
        }),
        [
            search,
            selectedAddon,
            selectedPanel,
            selectedTab,
            sidebarOpen,
            tabHeight,
            tabOpen,
            theme,
            filteredTree,
            story,
            toggleSidebar,
            toggleTab,
            updateSearch,
            updateSelectedAddon,
            updateSelectedPanel,
            updateTab,
            updateTabHeight,
            updateTheme,
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
