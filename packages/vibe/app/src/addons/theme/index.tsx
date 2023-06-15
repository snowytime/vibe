import React from "react";
import { ThemeContext } from "./use-theme";
import { ThemeToggle } from "./toggle";

/*
Addons must be defined as functions that are callable, if not
they will be ignored and not mounted
*/
export const theme = ({ directive }: { directive?: string }) => ({
    id: "theme-addon",
    name: "Theme",
    wildcard: <ThemeToggle />,
    context: ({ children }) => <ThemeContext directive={directive}>{children}</ThemeContext>,
});
