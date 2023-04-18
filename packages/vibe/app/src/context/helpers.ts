import { Settings, defaultSettings } from "./types";

const storageKey = "vibe-settings";

export const serializer = {
    initialize: () => {
        localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
    },
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
