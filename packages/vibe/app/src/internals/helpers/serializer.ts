export const serializer = {
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
