import { Category, Config, Stories, Tree } from "../types";
import { Actions } from "./reducer";

export enum Theme {
    light = "light",
    dark = "dark",
}

export type Settings = {
    theme: Theme;
    sidebarPanel: {
        open: boolean;
    };
    watcherPanel: {
        open: boolean;
        selected: string;
    };
    addonPanel: {
        open: boolean;
    };
    addons: {
        resize: {
            enabled: boolean;
            data: {
                width: string;
                height: string;
            };
        };
        outline: {
            enabled: boolean;
        };
        console: {
            enabled: boolean;
            log: any[];
        };
        listeners: {
            enabled: boolean;
        };
        layers: {
            enabled: boolean;
        };
        controls: {
            enabled: boolean;
            id: string;
            data: any;
        };
        background: {
            enabled: boolean;
            backgroundColor: string;
            color: string;
        };
        padding: {
            enabled: boolean;
        };
    };
    search: string;
};

export const defaultSettings: Settings = {
    theme: Theme.light,
    sidebarPanel: {
        open: true,
    },
    watcherPanel: {
        open: false,
        selected: null,
    },
    addonPanel: {
        open: false,
    },
    addons: {
        resize: {
            enabled: false,
            data: {
                width: "",
                height: "",
            },
        },
        outline: {
            enabled: false,
        },
        console: {
            enabled: false,
            log: [],
        },
        listeners: {
            enabled: false,
        },
        layers: {
            enabled: false,
        },
        controls: {
            enabled: false,
            id: "",
            data: {},
        },
        padding: {
            enabled: false,
        },
        background: {
            enabled: false,
            backgroundColor: "hsl(var(--background))",
            color: "",
        },
    },
    search: "",
};

export enum Action {
    initialize = "INITIALIZE",
    reset_addon_controls = "RESET_ADDON_CONTROLS",
    set_sidebar_open = "SET_SIDEBAR_ENABLED",
    set_addons_open = "SET_ADDONS",
    // watcher panel
    set_watcher_open = "SET_WATCHER",
    set_watcher_selected = "SET_WATCHER_SELECTED",
    // theme stuff
    set_theme = "SET_THEME",
    // story search
    set_search = "SET_SEARCH",
    set_search_filtered_tree = "SET_SEARCH_FILTERED_TREE",
    // resize addon
    set_addon_resize_enabled = "SET_ADDON_RESIZE_ENABLED",
    set_addon_resize_width = "SET_ADDON_RESIZE_WIDTH",
    set_addon_resize_height = "SET_ADDON_RESIZE_HEIGHT",
    // outline addon
    set_addon_outline_enabled = "SET_ADDON_OUTLINE_ENABLED",
    // layer addon
    set_addon_layers_enabled = "SET_ADDON_LAYERS_ENABLED",
    // console addon
    set_addon_console_enabled = "SET_ADDON_CONSOLE_ENABLED",
    // background addon
    set_addon_background_enabled = "SET_ADDON_BACKGROUND_ENABLED",
    // controls addon
    set_addon_controls_enabled = "SET_ADDON_CONTROLS_ENABLED",
    set_addon_controls_update = "SET_ADDON_CONTROLS_UPDATE",
    set_addon_controls_switch = "SET_ADDON_CONTROLS_SWITCH",
    set_addon_controls_id = "SET_ADDON_CONTROLS_ID",
    // listeners addon
    set_addon_listeners_enabled = "SET_ADDON_LISTENERS_ENABLED",
    toggle = "TOGGLE",
    set_addon_console_log = "SET_ADDON_CONSOLE_LOG",
}

export type Args = {
    type?: Control;
    value?: any;
    name?: string;
    description?: string;
};

export enum Control {
    select = "select",
    multi_select = "multi-select",
    radio = "radio",
    check = "check",
    range = "range",
}

export type VibePlugin = {
    stories: Stories;
    storyTree: Tree;
    urlMap: string[];
    config: Config;
};

export type VibeProps = VibePlugin & {
    children: React.ReactNode;
};

export type VibeContextItems = Settings &
    VibePlugin & {
        filteredTree: Category[];
        dispatch: React.Dispatch<Actions>;
        toggleAddon: (s: string) => void;
        toggleConsoleAddon: () => void;
    };
