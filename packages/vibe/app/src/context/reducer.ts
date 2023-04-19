import { Tree } from "../types";
import { serializer } from "./helpers";
import { VibeContextItems, Action, Theme, Control } from "./types";

export type Actions =
    | { type: Action.initialize }
    | { type: Action.set_addon_background_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_console_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_controls_enabled; payload: { enabled: boolean } }
    | {
          type: Action.set_addon_controls_update;
          payload: {
              type?: Control;
              value?: any;
              name?: string;
              description?: string;
              original?: any;
          };
      }
    | { type: Action.set_addon_controls_switch }
    | { type: Action.set_addon_controls_id; payload: { id: string } }
    | { type: Action.set_addon_layers_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_listeners_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_outline_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_resize_enabled; payload: { enabled: boolean } }
    | { type: Action.set_addon_resize_height; payload: { height: string } }
    | { type: Action.set_addon_resize_width; payload: { width: string } }
    | { type: Action.set_addons_open; payload: { open: boolean } }
    | { type: Action.set_sidebar_open; payload: { open: boolean } }
    | { type: Action.set_watcher_open; payload: { open: boolean } }
    | { type: Action.set_watcher_selected; payload: { selected: string | null } }
    | { type: Action.set_search; payload: { search: string } }
    | { type: Action.set_search_filtered_tree; payload: { tree: Tree } }
    | { type: Action.set_theme; payload: { theme: Theme } };

export const reducer = (state: VibeContextItems, action: Actions): VibeContextItems => {
    switch (action.type) {
        // run on app mounting
        case Action.initialize: {
            const savedSettings = serializer.get();
            if (savedSettings.theme) {
                document.documentElement.setAttribute("data-theme", savedSettings.theme);
                document.documentElement.style.transition = "color 0.2s ease-in-out";
            }
            return { ...state, ...savedSettings };
        }
        // panels
        case Action.set_sidebar_open: {
            const { open } = action.payload;
            serializer.set("sidebarPanel.open", open);
            return {
                ...state,
                sidebarPanel: {
                    ...state.sidebarPanel,
                    open,
                },
            };
        }
        case Action.set_addons_open: {
            const { open } = action.payload;
            serializer.set("addonPanel.open", open);
            return {
                ...state,
                addonPanel: {
                    ...state.addonPanel,
                    open,
                },
            };
        }
        case Action.set_watcher_open: {
            const { open } = action.payload;
            serializer.set("watcherPanel.open", open);
            return {
                ...state,
                watcherPanel: {
                    ...state.watcherPanel,
                    open,
                },
            };
        }
        // theme
        case Action.set_theme: {
            const { theme } = action.payload;
            document.documentElement.setAttribute("data-theme", theme);
            document.documentElement.style.transition = "color 0.2s ease-in-out";
            // save the theme
            serializer.set("theme", theme);
            return { ...state, theme };
        }
        // search
        case Action.set_search: {
            const { search } = action.payload;
            // save the state
            serializer.set("search", search);
            return { ...state, search };
        }
        case Action.set_search_filtered_tree: {
            const { tree } = action.payload;
            return { ...state, filteredTree: tree };
        }
        // selected watcher category
        case Action.set_watcher_selected: {
            const { selected } = action.payload;
            serializer.set("watcherPanel.selected", selected);
            return { ...state, watcherPanel: { ...state.watcherPanel, selected } };
        }
        // resize addon
        case Action.set_addon_resize_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.resize.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: {
                        ...state.addons.resize,
                        enabled,
                    },
                },
            };
        }
        case Action.set_addon_resize_height: {
            const { height } = action.payload;
            serializer.set("addons.resize.data.height", height);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: {
                        ...state.addons.resize,
                        data: {
                            ...state.addons.resize.data,
                            height,
                        },
                    },
                },
            };
        }
        case Action.set_addon_resize_width: {
            const { width } = action.payload;
            serializer.set("addons.resize.data.width", width);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    resize: {
                        ...state.addons.resize,
                        data: {
                            ...state.addons.resize.data,
                            width,
                        },
                    },
                },
            };
        }
        // listeners addon
        case Action.set_addon_listeners_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.listeners.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    listeners: {
                        ...state.addons.listeners,
                        enabled,
                    },
                },
            };
        }
        // outline addon
        case Action.set_addon_outline_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.outline.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    outline: {
                        ...state.addons.outline,
                        enabled,
                    },
                },
            };
        }
        // console addon
        case Action.set_addon_console_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.console.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    console: {
                        ...state.addons.console,
                        enabled,
                    },
                },
            };
        }
        // layers
        case Action.set_addon_layers_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.layers.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    layers: {
                        ...state.addons.layers,
                        enabled,
                    },
                },
            };
        }
        // controls (includes background)
        case Action.set_addon_controls_enabled: {
            const { enabled } = action.payload;
            serializer.set("addons.controls.enabled", enabled);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    controls: {
                        ...state.addons.controls,
                        enabled,
                    },
                },
            };
        }
        case Action.set_addon_controls_id: {
            const { id } = action.payload;
            serializer.set("addons.controls.id", id);
            return {
                ...state,
                addons: {
                    ...state.addons,
                    controls: {
                        ...state.addons.controls,
                        id,
                    },
                },
            };
        }
        case Action.set_addon_controls_update: {
            const { name, description, value, type, original } = action.payload;

            console.log(typeof description);
            // for persistence
            const payload = {
                ...state.addons.controls.data[name],
                name,
                ...(description === undefined ? {} : { description }),
                ...(value === undefined ? {} : { value }),
                ...(type === undefined ? {} : { type }),
                ...(original === undefined ? {} : { original }),
            };

            serializer.set(`addons.controls.data.${name}`, payload);

            return {
                ...state,
                addons: {
                    ...state.addons,
                    controls: {
                        ...state.addons.controls,
                        data: {
                            ...state.addons.controls.data,
                            [name]: payload,
                        },
                    },
                },
            };
        }
        case Action.set_addon_controls_switch: {
            serializer.set(`addons.controls.data`, {});

            return {
                ...state,
                addons: {
                    ...state.addons,
                    controls: {
                        ...state.addons.controls,
                        data: {},
                    },
                },
            };
        }
        // just return the current state if no match
        default: {
            return state;
        }
    }
};
