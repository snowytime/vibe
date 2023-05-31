import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { useLocation } from "react-router-dom";

const append = (key: string, specifier: string) => {
    return `${key}.${specifier}`;
};

const storageKey = "vibe-store";

export const serializer = {
    set: <T>(key: string, value: T) => {
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

        // append to URL
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(state)) {
            searchParams.set(key, JSON.stringify(value));
        }
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
    get: (key?: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const state: { [key: string]: any } = {};
        urlParams.forEach((value, key) => {
            state[key] = JSON.parse(value);
        });
        if (!key) {
            return state;
        }
        const keys = key.split(".");
        let nestedState = state;
        for (let i = 0; i < keys.length; i++) {
            const nestedKey = keys[i];
            if (!nestedState.hasOwnProperty(nestedKey)) {
                return null;
            }
            nestedState = nestedState[nestedKey];
        }
        return nestedState;
    },
};

// new serializer
const _serializer = {
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
        const newCache = { ..._serializer.get(key), ...payload };
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

export const _useStore = <T>(key: string, config: Config<T>) => {
    const memoizedConfig = useObjectiveMemo(config);

    const { search } = useLocation(); // on location changes we reset the state to our cached value

    const getCache = useCallback(() => {
        const cachedState = _serializer.get(key);
        return cachedState || {};
    }, [key]);

    const updateCache = useCallback(
        (what: any) => {
            _serializer.set(key, what);
        },
        [key],
    );

    const clearState = useCallback(() => {
        _serializer.clear(key);
    }, [key]);

    const getRawState = useCallback(() => {
        const state = {};
        Object.keys(memoizedConfig).forEach((key) => {
            const { value, cache } = memoizedConfig[key];
            const updatedValue = cache ? getCache()[key] || value : value;
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
                if (cache && memoizedConfig[key].cache) {
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

    return {
        state,
        update,
        clearState,
    };
};

export const useStore = <T>(key: string) => {
    const getState = useCallback(() => {
        const data = serializer.get(key) as T;
        return data || ({} as T);
    }, [key]);

    const pathname = useLocation();

    const [state, setState] = useState(getState());

    useEffect(() => {
        setState(getState());
    }, [getState, pathname]);

    const clear = useCallback(() => {
        setState({} as T);
    }, []);

    const update = useCallback(
        (name: string, what: T[keyof T]) => {
            const completeKey = name ? append(key, name) : key;
            if (!name && !what) {
                serializer.clear(completeKey);
            } else {
                serializer.set(completeKey, what);
            }
            setState(getState());
        },
        [getState, key],
    );

    return { update, state, clear };
};
