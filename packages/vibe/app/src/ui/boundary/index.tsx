import React from "react";
import { RootBoundary } from "./boundary";
import { useRegistry, VibeError, ViteError, ReactError } from "../../internals/manager";

const ViteErrorDisplay = ({ error }: { error: ViteError }) => (
    <div>
        <h5>Vite</h5>
        <p>{error.err.message}</p>
    </div>
);

const ReactErrorDisplay = ({ error }: { error: ReactError }) => (
    <div>
        <h5>React</h5>
        <p>{error.componentStack}</p>
    </div>
);

const ErrorState = ({ error }: { error: VibeError }) => {
    return (
        <div style={{ width: "100%" }}>
            <h1>Error occured</h1>
            {error.source === "react" && <ReactErrorDisplay error={error} />}
            {error.source === "vite" && <ViteErrorDisplay error={error} />}
        </div>
    );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const { error, updateError } = useRegistry();

    return (
        <RootBoundary
            hmrActivation={!!error}
            onReactError={(r) => updateError(r)}
            fallback={<ErrorState error={error} />}
        >
            {children}
        </RootBoundary>
    );
};
