import { GenericContext } from "@snowytime/react-magic/helpers";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Action, VibeContextItems } from "../types";

export const useConsole = (addons, dispatch) => {
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
