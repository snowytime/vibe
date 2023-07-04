import React from "react";
import { useRegistry } from "./internals/manager";
import { useSettings } from "./internals/settings";

export const HOC = ({ story, doc }: { story: any; doc?: any }) => {
    const { updateReady } = useRegistry();
    const { selectedPanel } = useSettings();
    return (
        <div ref={() => updateReady(true)}>
            {selectedPanel === "sandbox" ? React.createElement(story) : <Docs>{doc}</Docs>}
        </div>
    );
};

const NoDoc = () => {
    return <div style={{ height: "100%", width: "100%", background: "gray" }}>No docs :(</div>;
};

const Docs = ({ children }: { children: React.ElementType<HTMLDivElement> }) => {
    if (!children) {
        return <NoDoc />;
    }

    return React.createElement(children);
};
