import React from "react";
import { OutlineContext } from "./use-outline";
import { Toolbar } from "./toolbar";

type Config = {
    msg?: string;
};

/*
Addons must be defined as functions that are callable, if not
they will be ignored and not mounted.
*/
export const outline = ({ msg }: Config) => ({
    id: "outline-addon",
    name: "Outline",
    toolbar: <Toolbar msg={msg} />,
    context: ({ children }) => <OutlineContext>{children}</OutlineContext>,
});
