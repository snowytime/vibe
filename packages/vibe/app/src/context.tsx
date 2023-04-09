import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GenericContext } from "@snowytime/react-magic/helpers";
import { Category, Config, Stories, VibeContext } from "./types.js";

type Settings = {
    theme: "light" | "dark";
    sidebarOpen: boolean;
    resizeEnabled: boolean;
    ready: boolean;
    search: string;
};
const vibeFromLocalStorage = JSON.parse(localStorage.getItem("vibe")) || {};

const initialState: Settings = {
    theme: vibeFromLocalStorage.theme || "light",
    sidebarOpen: true,
    ready: false,
    resizeEnabled: false,
    search: "",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "init": {
            const stash = JSON.parse(localStorage.getItem("vibe")) || {};
            if (stash.theme) {
                document.documentElement.setAttribute("data-theme", stash.theme);
                document.documentElement.style.transition = "color 0.2s ease-in-out";
            }
            return { ...state, ...stash, ready: true };
        }
        case "setTheme":
            const { payload: theme } = action;
            // Set the data-theme attribute and transition style
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.style.transition = "color 0.2s ease-in-out";
            // Save the new theme to local storage
            localStorage.setItem("vibe", JSON.stringify({ theme }));
            return { ...state, theme };
        case "setSidebarOpen":
            const { payload: sidebarOpen } = action;
            // Save the new sidebarOpen value to local storage
            return { ...state, sidebarOpen };
        case "setResizeEnabled":
            const { payload: resizeEnabled } = action;
            return { ...state, resizeEnabled };
        case "setFilteredTree":
            const { payload: filteredTree } = action;
            return { ...state, filteredTree };
        case "setSearch":
            const { payload: search } = action;
            return { ...state, search };
        default:
            return state;
    }
};

type Props = {
    stories: Stories;
    config: Config;
    urlMap: string[];
    storyTree: Category[];
    children: React.ReactNode;
};
export const ContextStore = ({ children, stories, config, urlMap, storyTree }: Props) => {
    const [settings, dispatch] = React.useReducer(reducer, {
        ...initialState,
        filteredTree: storyTree,
    });
    // need to run the appropriate change on initial render to get theme
    React.useEffect(() => {
        dispatch({ type: "init" });
    }, []);
    const values = React.useMemo(
        () => ({ stories, config, urlMap, storyTree }),
        [stories, config, urlMap, storyTree],
    );
    return (
        <GenericContext.Provider value={{ ...values, ...settings, dispatch }}>
            {children}
        </GenericContext.Provider>
    );
};

export const useVibeContext = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {
        stories,
        storyTree,
        config,
        storyUrls,
        theme,
        sidebarOpen,
        dispatch,
        ready,
        resizeEnabled,
        filteredTree,
        search,
    } = React.useContext(GenericContext as any) as VibeContext;
    return {
        storyTree,
        storyUrls,
        stories,
        Link,
        useNavigate,
        useLocation,
        config,
        theme,
        sidebarOpen,
        resizeEnabled,
        dispatch,
        ready,
        filteredTree,
        search,
    };
};
