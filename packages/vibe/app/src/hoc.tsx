import React from "react";
import { useRegistry } from "./internals/manager";
import { useSettings } from "./internals/settings";
import { Story } from "./types";

export const HOC = ({ story }: { story: Story }) => {
    const { updateReady, registerStory } = useRegistry();
    const { selectedPanel } = useSettings();

    const renderedItem = () => {
        if (selectedPanel === "sandbox") {
            registerStory(story);
            return React.createElement(story.component);
        }
        registerStory(story);
        return <Docs>{story.doc}</Docs>;
    };

    return <div ref={() => updateReady(true)}>{renderedItem()}</div>;
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
