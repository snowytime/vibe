import React, { useEffect, useReducer, useMemo } from "react";
import { GenericContext } from "@snowytime/react-magic/helpers";
import { serializer } from "./helpers";
import { Action, VibeContextItems, VibeProps } from "./types";
import { reducer } from "./reducer";

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
    const [data, dispatch] = useReducer(reducer, initial);
    // need to run the appropriate change on initial render to get theme
    useEffect(() => {
        dispatch({ type: Action.initialize });
    }, []);

    const valueMemo = useMemo(() => ({ ...data, dispatch }), [data, dispatch]);
    return <GenericContext.Provider value={valueMemo}>{children}</GenericContext.Provider>;
};
