import React from "react";
import { OutlineContext } from "./use-outline";
import { Toolbar } from "./toolbar";

/*
Addons must be defined as functions that are callable, if not
they will be ignored and not mounted
*/
export const outline = () => ({
    id: "outline-addon",
    name: "Outline",
    toolbar: <Toolbar />,
    context: ({ children }) => <OutlineContext>{children}</OutlineContext>,
});
