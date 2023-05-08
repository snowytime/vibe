import { GenericContext } from "@snowytime/react-magic/helpers";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Action, VibeContextItems } from "../types";

export const useConsole = (addons, dispatch) => {
    // manage things within
    const [enabled, setEnabled] = useState(false);
    const [log, setLog] = useState([]);

    // methods
    const toggleEnabled = useCallback(() => {}, []);

    const addToLog = useCallback((entry) => {
        setLog((prev) => [...prev, entry]);
    }, []);

    const clearLog = useCallback(() => {
        setLog([]);
    }, []);

    const initialConsoleLog = useRef(window.console.log);

    const mountAddon = useCallback(() => {
        window.console.log = <T>(t: T) => {
            dispatch({
                type: Action.set_addon_console_log,
                payload: { log: t },
            });
            initialConsoleLog.current(t);
        };
    }, [dispatch]);

    const unmountAddon = useCallback(() => {
        // when unmounting the console addon
        // we remove all its content
        setLog([]);
        window.console.log = initialConsoleLog.current;
    }, []);

    useEffect(() => {
        if (addons.console.enabled) {
            // mount console
            mountAddon();
        }
    }, [addons.console.enabled, mountAddon]);

    return [mountAddon, unmountAddon];
};
