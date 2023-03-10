import React from "react";
import { CloseIcon, MenuIcon, MoonIcon, SunCirclesIcon } from "@snowytime/iconly-react/ui";
import { GithubIcon } from "@snowytime/iconly-react/programming";

import { Category } from "#type/index.js";
import { Tree } from "./tree/index.js";

import "./index.scss";

export const useTheme = () => {
    const [theme, setTheme] = React.useState("light");
    const toggleTheme = React.useCallback(() => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, [theme]);
    React.useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.transition = "color 0.2s ease-in-out";
    }, [theme]);
    return { theme, setTheme, toggleTheme };
};

export const Ui = ({
    children,
    title,
    tree,
    sidebar = true,
    repo,
    website,
}: {
    children: React.ReactNode;
    title: string;
    tree: Category[];
    sidebar: boolean;
    repo: string;
    website: string;
}) => {
    const [open, setOpen] = React.useState(true);
    const { theme, toggleTheme } = useTheme();
    return (
        <main className='vibe-wrapper'>
            <nav className='vibe-nav'>
                <div className='vibe-toolbar'>
                    {sidebar ? (
                        <div className='sidebar-btn' onClick={() => setOpen((s) => !s)}>
                            {open ? <CloseIcon height='40%' /> : <MenuIcon height='50%' />}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className='sidebar-btn' onClick={toggleTheme}>
                        {theme === "light" ? (
                            <SunCirclesIcon height='55%' />
                        ) : (
                            <MoonIcon height='45%' />
                        )}
                    </div>
                </div>
                <a href={website} target='_blank' rel='noreferrer' className='vibe-title'>
                    {title}
                </a>
                <a href={repo} target='_blank' rel='noreferrer' className='vibe-repo'>
                    <GithubIcon />
                </a>
            </nav>
            <section className='vibe-content'>
                {sidebar ? (
                    <div
                        style={{
                            width: open ? "" : "0",
                            transition: "width 0.2s ease-in-out",
                            border: open ? "" : "none",
                        }}
                        className='vibe-content-sidebar'
                    >
                        <Tree data={tree} />
                    </div>
                ) : (
                    ""
                )}
                <div className='vibe-content-window'>{children}</div>
            </section>
        </main>
    );
};
