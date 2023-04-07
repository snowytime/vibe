import React, { useState } from "react";
import "./styles.scss";
import { useDomRef } from "@snowytime/react-magic/hooks";

export const useTheme = () => {
    const [theme, setTheme] = React.useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    });

    const toggleTheme = React.useCallback(() => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    React.useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.transition = "color 0.2s ease-in-out";
    }, [theme]);

    return { theme, setTheme, toggleTheme };
};

export const Ui = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    const [resize, setResize] = useState(false);
    const [width, setWidth] = useState("100%");
    const [height, setHeight] = useState("100%");
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    const [ref, setRef] = useDomRef<HTMLDivElement>();
    const handleMouseDown = (e: MouseEvent) => {
        setDragging(true);
        setInitialPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    const toggleResize = React.useCallback(() => {
        if (!ref) return;
        setResize((r) => {
            if (r) {
                setWidth("100%");
                setHeight("100%");
            } else {
                setWidth(`${ref.getBoundingClientRect().width - 60}px`);
                setHeight(`${ref.getBoundingClientRect().height - 60}px`);
            }
            return !r;
        });
    }, [ref]);
    const handleMouseMove = (e: MouseEvent, direction) => {
        if (!dragging) return;
        const deltaX = e.clientX - initialPos.x;
        const deltaY = e.clientY - initialPos.y;
        if (direction === "right") {
            setWidth((w) => `${parseFloat(w) + deltaX * 2}px`);
        }
        if (direction === "bottom") {
            setHeight((h) => `${parseFloat(h) + deltaY * 2}px`);
        }
        if (direction === "left") {
            setWidth((w) => `${parseFloat(w) - deltaX * 2}px`);
        }
        if (direction === "top") {
            setHeight((h) => `${parseFloat(h) - deltaY * 2}px`);
        }
        setInitialPos({ x: e.clientX, y: e.clientY });
    };
    return (
        <main className='vibe-main'>
            <div className='vibe-sidebar'>
                <button type='button' onClick={toggleResize}>
                    resize
                </button>
                <div className='vibe-theme-toggle-wrapper' onClick={toggleTheme}>
                    <div className={`theme-track ${theme}`}>
                        <div>🌜</div>
                        <div className='vibe-toggle-thumb' />
                        <div>🌞</div>
                    </div>
                </div>
            </div>
            <div className={`vibe-window ${resize && "resize"}`}>
                <div className='vibe-content' style={{ width, height }} ref={setRef}>
                    {resize ? (
                        <div
                            className='window-dragger right'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={(e) => handleMouseMove(e, "right")}
                        >
                            <div />
                        </div>
                    ) : null}
                    {resize ? (
                        <div
                            className='window-dragger top'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={(e) => handleMouseMove(e, "top")}
                        >
                            <div />
                        </div>
                    ) : null}
                    <div>
                        <div>{children}</div>
                    </div>
                    {resize ? (
                        <div
                            className='window-dragger bottom'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={(e) => handleMouseMove(e, "bottom")}
                        >
                            <div />
                        </div>
                    ) : null}
                    {resize ? (
                        <div
                            className='window-dragger left'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={(e) => handleMouseMove(e, "left")}
                        >
                            <div />
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
};
