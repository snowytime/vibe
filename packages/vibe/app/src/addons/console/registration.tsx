import React, { useEffect } from "react";
import { useRegistry } from "../../internals/manager";
import { Panel } from "./panel";
import { Header } from "./header";
import { useConsole } from "./use-console";

export const useRegisterConsoleAddon = () => {
    const { register } = useRegistry();
    const { log, pending } = useConsole();
    const id = "console-addon";

    useEffect(() => {
        register({
            id,
            name: "Console",
            panel: <Panel log={log} />,
            panelHeader: <Header pending={pending} />,
        });
    }, [register, id, log, pending]);
};
