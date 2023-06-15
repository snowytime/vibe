import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { useStore } from "../../internals/hooks/use-store";
import { useRegistry } from "../../internals/manager";
import { useObjectiveMemo } from "../../internals/hooks";

export enum Theme {
    Light = "light",
    Dark = "dark",
}

type ThemeState = {
    theme: Theme;
};

type ThemeMethods = {
    updateTheme: (state?: Theme) => void;
};

type ThemeContext = ThemeState & ThemeMethods;

const Context = createContext<ThemeContext>(null);

export const ThemeContext = ({
    children,
    directive,
}: {
    children: React.ReactNode;
    directive?: string;
}) => {
    const { state, update } = useStore<ThemeState>("theme", {
        theme: {
            value: Theme.Light,
            cache: true,
        },
    });

    // handle sync
    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", state.theme);
        if (directive === "class") {
            const oppositeClass = state.theme === "dark" ? "light" : "dark";
            document.documentElement.classList.remove(oppositeClass);
            document.documentElement.classList.add(state.theme);
        }
        document.documentElement.style.transition = "color 0.2s ease-in-out";
    }, [directive, state.theme]);

    const updateTheme = useCallback(
        (theme: Theme) => {
            update({ theme });
        },
        [update],
    );

    const memo = useMemo(
        () => ({
            theme: state.theme,
            updateTheme,
        }),
        [state.theme, updateTheme],
    );

    return <Context.Provider value={memo}>{children}</Context.Provider>;
};

export const useThemeAddon = () => {
    return useContext(Context);
};
