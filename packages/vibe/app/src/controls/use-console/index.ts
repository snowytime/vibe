import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "../use-settings";

export const useConsole = () => {
    const [log, setLog] = useState<{ message: string; count: number }[]>([]);
    const [pending, setPending] = useState(0);
    const { pathname } = useLocation();
    const { selectedTab } = useSettings();

    useEffect(() => {
        if (selectedTab === "console") {
            // we reset the pending state
            setPending(0);
        }
    }, [selectedTab]);

    const updatePending = useCallback(
        (t) => {
            // the log contains the message, and the count of the caller
            // we combine identical messages received in series
            if (log.length > 0 && log[log.length - 1].message === t) {
                // we update the last log item
                const lastIndex = log.length - 1;
                setLog((l) => {
                    const item = l[lastIndex];
                    item.count++;
                    return [...l.slice(0, lastIndex), item];
                });
            } else {
                setLog((l) => [...l, { message: t, count: 1 }]);
            }

            // handle the pending state
            if (selectedTab === "console") {
                // we reset the pending state
                setPending(0);
                return;
            }
            setPending((s) => (s += 1));
        },
        [log, selectedTab],
    );

    const initialConsoleLog = useRef(window.console.log);

    const mountAddon = useCallback(() => {
        // window.console.log = <T>(t: T) => {
        //     updatePending(t);
        // };
    }, [updatePending]);

    const unmountAddon = useCallback(() => {
        window.console.log = initialConsoleLog.current;
    }, []);

    useEffect(() => {
        mountAddon();
        return () => unmountAddon();
    }, [mountAddon, pathname, unmountAddon]);

    useEffect(() => {
        setLog([]);
        setPending(0);
    }, [pathname]);

    return {
        log,
        pending,
    };
};
