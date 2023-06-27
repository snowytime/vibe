import React from "react";
import { ResizeWindow } from "./window";
import { Toolbar } from "./toolbar";
import { ResizeContext } from "./use-resize";

export const resize = () => ({
    id: "resize-addon",
    name: "Resize",
    window: ({ children }) => <ResizeWindow>{children}</ResizeWindow>,
    toolbar: <Toolbar />,
    context: ({ children }) => <ResizeContext>{children}</ResizeContext>,
});
