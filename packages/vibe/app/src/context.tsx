import React, { useReducer } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GenericContext } from "@snowytime/react-magic/helpers";
import { Category, Config, Stories } from "./types.js";

export enum Theme {
    light = "light",
    dark = "dark",
}

const storageKey = "vibe-settings";
const defaultSettings = {
    theme: Theme.light,
    sidebar: {
        open: true,
    },
    addons: {
        open: false,
        resize: {
            enabled: false,
            width: "",
            height: "",
        },
    },
    search: "",
};

// serializer
const serializer = {
    initialize: () => {
        localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
    },
    set: <T,>(key: string, value: T) => {
        const state = serializer.get();

        // split the key into individual keys
        const keys = key.split(".");

        // update the nested property
        let nestedState = state;
        for (let i = 0; i < keys.length - 1; i++) {
            const nestedKey = keys[i];
            if (!nestedState.hasOwnProperty(nestedKey)) {
                nestedState[nestedKey] = {};
            }
            nestedState = nestedState[nestedKey];
        }
        nestedState[keys[keys.length - 1]] = value;

        // save the state
        localStorage.setItem(storageKey, JSON.stringify(state));
    },
    get: (): Settings => {
        const state = localStorage.getItem(storageKey);
        if (!state) {
            localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
            return defaultSettings;
        }
        const decodedState = JSON.parse(state);
        return { ...defaultSettings, ...decodedState };
    },
};

type Settings = {
    theme: Theme;
    sidebar: {
        open: boolean;
    };
    addons: {
        open: boolean;
        resize: {
            enabled: boolean;
            width: string;
            height: string;
        };
    };
    search: string;
};

type VibePlugin = {
    stories: Stories;
    storyTree: Category[];
    urlMap: string[];
    config: Config;
};

type VibeProps = VibePlugin & {
    children: React.ReactNode;
};

type VibeContextItems = Settings &
    VibePlugin & {
        filteredTree: Category[];
        dispatch: React.Dispatch<Actions>;
    };

export enum Action {
    init = "initialize",
    setTheme = "setTheme",
    setSidebar = "setSidebarVisibility",
    setResizeEnabled = "enableResize",
    setSearch = "setSearch",
    setWidth = "setWidth",
    setHeight = "setHeight",
    setFilteredTree = "setFilteredTree",
    setAddonsOpen = "setAddonsOpen",
}

export type Actions =
    | { type: Action.init }
    | { type: Action.setTheme; payload: { state: Theme } }
    | { type: Action.setSidebar; payload: { state: boolean } }
    | { type: Action.setResizeEnabled; payload: { state: boolean } }
    | { type: Action.setSearch; payload: { state: string } }
    | { type: Action.setWidth; payload: { state: string } }
    | { type: Action.setHeight; payload: { state: string } }
    | { type: Action.setFilteredTree; payload: { state: Category[] } }
    | { type: Action.setAddonsOpen; payload: { state: boolean } };

// handler for all actions
const vibeReducer = (state: VibeContextItems, action: Actions): VibeContextItems => {
    switch (action.type) {
        case Action.init: {
            const savedSettings = serializer.get();
            // if an addon is enabled, open the addons panel on load
            if (savedSettings.addons.resize.enabled) {
                savedSettings.addons.open = true;
            }
            if (savedSettings.theme) {
                document.documentElement.setAttribute("data-theme", savedSettings.theme);
                document.documentElement.style.transition = "color 0.2s ease-in-out";
            }
            return { ...state, ...savedSettings };
        }
        case Action.setTheme: {
            const theme = action.payload.state;
            // set the theme
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.style.transition = "color 0.2s ease-in-out";
            // save the theme
            serializer.set("theme", theme);
            return { ...state, theme };
        }
        case Action.setSidebar: {
            const open = action.payload.state;
            // save the state
            serializer.set("sidebar.open", open);
            return { ...state, sidebar: { ...state.sidebar, open } };
        }
        case Action.setResizeEnabled: {
            const enabled = action.payload.state;
            // save the state
            serializer.set("addons.resize.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: { ...state.addons.resize, enabled },
                },
            };
        }
        case Action.setSearch: {
            const search = action.payload.state;
            // save the state
            serializer.set("search", search);
            return { ...state, search };
        }
        case Action.setWidth: {
            const width = action.payload.state;
            // save the state
            serializer.set("addons.resize.width", width);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: { ...state.addons.resize, width },
                },
            };
        }
        case Action.setHeight: {
            const height = action.payload.state;
            // save the state
            serializer.set("addons.resize.height", height);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: { ...state.addons.resize, height },
                },
            };
        }
        case Action.setFilteredTree: {
            const filteredTree = action.payload.state;
            return { ...state, filteredTree };
        }
        case Action.setAddonsOpen: {
            const open = action.payload.state;
            // save the state
            serializer.set("addons.open", open);
            return { ...state, addons: { ...state.addons, open } };
        }
        default:
            return state;
    }
};

export const ContextStore = ({ children, stories, config, urlMap, storyTree }: VibeProps) => {
    const initial: VibeContextItems = {
        ...serializer.get(),
        stories,
        config,
        urlMap,
        storyTree,
        filteredTree: storyTree,
        dispatch: () => {},
    };
    const [data, dispatch] = useReducer(vibeReducer, initial);
    // need to run the appropriate change on initial render to get theme
    React.useEffect(() => {
        dispatch({ type: Action.init });
    }, []);

    const valueMemo = React.useMemo(() => ({ ...data, dispatch }), [data, dispatch]);
    return <GenericContext.Provider value={valueMemo}>{children}</GenericContext.Provider>;
};

export const useVibe = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { dispatch, ...data } = React.useContext(GenericContext as any) as VibeContextItems;
    return {
        navigation: {
            Link,
            useNavigate,
            useLocation,
        },
        dispatch,
        ...data,
    };
};
