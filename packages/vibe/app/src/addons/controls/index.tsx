import React from "react";
import { Panel } from "./panel";
import { Context } from "./use-controls";

export const controls = () => ({
    id: "controls-addon",
    name: "Controls",
    panel: <Panel />,
    context: ({ children }) => <Context>{children}</Context>,
});
