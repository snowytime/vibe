import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// new serializer
const serializer = {
    get: (key: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        // need to fix the url params
        let state = {};
        urlParams.forEach((value, k) => {
            if (k === key) {
                return (state = JSON.parse(value));
            }
        });
        return state;
    },
    set: (key: string, payload: any) => {
        const newCache = { ...serializer.get(key), ...payload };
        // set the new payload
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, JSON.stringify(newCache));
        const url = new URL(window.location.href);
        url.search = decodeURIComponent(searchParams.toString());
        window.history.replaceState(null, "", url.toString());
    },
    clear: (key: string) => {
        const url = new URL(window.location.href);
        const { searchParams } = url;
        searchParams.delete(key);
        url.search = decodeURIComponent(searchParams.toString());
        window.history.replaceState(null, "", url.toString());
    },
};

type Config<T> = {
    [key: string]: {
        value: T[keyof T];
        cache: boolean;
    };
};

const deepEqual = <T extends object>(obj1: T, obj2: T) => {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};

export const useObjectiveMemo = <T extends object>(object: T) => {
    const objRef = useRef(object);
    return useMemo(() => {
        if (!deepEqual(objRef.current, object)) {
            objRef.current = object;
        }
        return objRef.current;
    }, [object]);
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
