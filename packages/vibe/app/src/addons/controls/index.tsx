import React from "react";
import { Panel } from "./panel";
import { Context } from "./use-controls";
import { StoryWrapped } from "./story";

export const controls = () => ({
    id: "controls-addon",
    name: "Controls",
    panel: <Panel />,
    context: ({ children }) => <Context>{children}</Context>,
    story: ({ Component, ...rest }) => (
        <StoryWrapped {...rest} Story={Component} args={rest.arguments} />
    ),
});
