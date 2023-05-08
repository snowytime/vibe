import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";

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

export const useStore = <T>(key: string) => {
    const state = useMemo(() => {
        const data = serializer.get(key) as T;
        return data || ({} as T);
    }, [key]);

    const update = useCallback(
        (name: string, what: T[keyof T]) => {
            const completeKey = append(key, name);
            serializer.set(completeKey, what);
            // update local storage with the key and string
        },
        [key],
    );

    return { update, state };
};
