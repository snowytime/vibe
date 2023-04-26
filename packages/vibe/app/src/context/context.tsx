import React, { useEffect, useReducer, useMemo, useCallback, useRef } from "react";
import { GenericContext } from "@snowytime/react-magic/helpers";
import { serializer } from "./helpers";
import { Action, VibeContextItems, VibeProps } from "./types";
import { reducer } from "./reducer";
import { useConsole } from "./hooks/use-console";

export const ContextStore = ({ children, stories, config, urlMap, storyTree }: VibeProps) => {
    const initial: VibeContextItems = {
        ...serializer.get(),
        stories,
        config,
        urlMap,
        storyTree,
        filteredTree: storyTree,
        dispatch: () => {},
        toggleAddon: () => {},
        toggleConsoleAddon: () => {},
    };
    const [data, dispatch] = useReducer(reducer, initial);
    // need to run the appropriate change on initial render to get theme
    useEffect(() => {
        dispatch({ type: Action.initialize });
    }, []);

    // helpers
    const toggleAddon = useCallback(
        (addon: string) => {
            const currentState = data.addons[addon].enabled as boolean;

            if (!currentState && !data.watcherPanel.selected) {
                dispatch({
                    type: Action.set_watcher_selected,
                    payload: { selected: addon },
                });
            }

            const enabledAddons = () => {
                return Object.entries(data.addons)
                    .filter(([, value]) => value.enabled)
                    .map(([key]) => key);
            };

            if (data.watcherPanel.selected === addon && enabledAddons().length > 1) {
                const newAddon = enabledAddons().filter((i) => i !== addon);
                dispatch({
                    type: Action.set_watcher_selected,
                    payload: { selected: newAddon[0] },
                });
            }

            // setter
            dispatch({
                type: Action.toggle,
                payload: { category: addon, enabled: !currentState },
            });
        },
        [data.addons, data.watcherPanel.selected],
    );

    const [consoleMount, consoleUnmount] = useConsole(data.addons, dispatch);

    const toggleConsoleAddon = useCallback(() => {
        const state = data.addons.console.enabled;
        if (state) {
            consoleUnmount();
            toggleAddon("console");
            return;
        }
        consoleMount();

        toggleAddon("console");
    }, [consoleMount, consoleUnmount, data.addons.console.enabled, toggleAddon]);

    const valueMemo = useMemo(
        () => ({ ...data, dispatch, toggleAddon, toggleConsoleAddon }),
        [data, dispatch, toggleAddon, toggleConsoleAddon],
    );
    return <GenericContext.Provider value={valueMemo}>{children}</GenericContext.Provider>;
};
