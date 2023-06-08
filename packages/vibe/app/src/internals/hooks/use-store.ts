import { useCallback, useEffect, useReducer, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useObjectiveMemo } from "./use-objective-memo";
import { serializer } from "../helpers";

type Config<T> = {
    [key: string]: {
        value: T[keyof T];
        cache: boolean;
    };
};

export const useStore = <T>(key: string, config: Config<T>, wipe?: boolean) => {
    const memoizedConfig = useObjectiveMemo(config);

    const { search, pathname } = useLocation(); // on location changes we reset the state to our cached value

    const getCache = useCallback(() => {
        const cachedState = serializer.get(key);
        return cachedState || {};
    }, [key]);

    const updateCache = useCallback(
        (what: any) => {
            serializer.set(key, what);
        },
        [key],
    );

    const clearState = useCallback(() => {
        serializer.clear(key);
    }, [key]);

    const getRawState = useCallback(() => {
        const state = {};
        const keys = Object.keys(memoizedConfig);
        if (!keys.length) {
            // just get the cache
            return getCache() as T;
        }
        keys.forEach((key) => {
            const { value, cache } = memoizedConfig[key];
            const updatedValue =
                cache || memoizedConfig.globalCache ? getCache()[key] ?? value : value;
            state[key] = updatedValue;
        });
        return state as T;
    }, [memoizedConfig, getCache]);

    // actual state
    const [state, update] = useReducer(
        (prev: T, curr: Partial<T> & { cache?: boolean; clear?: boolean }) => {
            const { cache = true, clear = false, ...rest } = curr;
            Object.keys(rest).forEach((key) => {
                // check if the cache should update
                if (cache && !Object.keys(memoizedConfig).length) {
                    // serialize everything
                    updateCache({ [key]: rest[key] });
                }
                if (cache && memoizedConfig[key]?.cache) {
                    updateCache({ [key]: rest[key] });
                }
            });
            if (clear) {
                return { ...getRawState(), ...rest };
            }
            return { ...prev, ...rest };
        },
        getRawState(),
    );

    useEffect(() => {
        // on the url ? query change, we check
        const newState = getRawState();
        update({ ...newState, cache: false });
    }, [search, getRawState]);

    const pathRef = useRef(pathname);
    useEffect(() => {
        if (pathname !== pathRef.current) {
            // run effect
            if (wipe) {
                clearState();
                const newState = getRawState();
                update({ ...newState, clear: true });
            }
            pathRef.current = pathname;
        }
    }, [clearState, getRawState, pathname, wipe]);

    const cachedState = useObjectiveMemo(state);

    return {
        state: cachedState,
        update,
        clearState,
    };
};
