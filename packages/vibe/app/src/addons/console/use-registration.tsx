import React, { useEffect, useRef } from "react";
import { useRegistry } from "../../internals/manager";
import { Panel } from "./panel";
import { Header } from "./header";
import { useConsole } from "./use-console";

export const useRegisterConsoleAddon = () => {
    const { register, generateId } = useRegistry();
    const { log, pending } = useConsole();
    const { current: id } = useRef(generateId());

    useEffect(() => {
        register({
            id,
            name: "Console",
            panel: <Panel log={log} />,
            panelHeader: <Header pending={pending} />,
        });
    }, [log, pending, register, id]);
};
