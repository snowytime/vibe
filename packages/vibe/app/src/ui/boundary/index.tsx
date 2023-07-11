import React, { ErrorInfo, useCallback, useEffect, useRef, useState } from "react";
import { RootBoundary } from "./boundary";

/*
componentDidMount(): void {
        const originalLog = console.error;
        console.error = (...args) => {
            originalLog.apply(console, args);
            if (args[0].includes("[vite] Internal Server Error")) {
                console.log(args);
                this.setState({ viteError: args[0] });
            }
        };
    }
*/

const ErrorState = ({ errorInfo, viteError }: { errorInfo: ErrorInfo; viteError: string }) => {
    return (
        <div style={{ width: "100%" }}>
            <h1>Error occured</h1>
            <p>{viteError ?? errorInfo.componentStack}</p>
        </div>
    );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const [viteError, setViteError] = useState("");
    const initialConsoleLog = useRef(window.console.error);

    const mountAddon = useCallback(() => {
        window.console.error = <T,>(t: T) => {
            initialConsoleLog.current(t);
            if (typeof t === "string" && t.includes("[vite] Internal Server Error")) {
                setViteError(t);
            }
        };
    }, []);

    const unmountAddon = useCallback(() => {
        window.console.log = initialConsoleLog.current;
    }, []);

    useEffect(() => {
        mountAddon();
        return () => unmountAddon();
    }, [mountAddon, unmountAddon]);

    return (
        <RootBoundary fallback={(errorInfo) => ErrorState({ viteError, errorInfo })}>
            {children}
        </RootBoundary>
    );
};
