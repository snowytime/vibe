import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { GenericContext } from "@snowytime/react-hooks";

export const Context = GenericContext;

interface Story {
    component: string;
    url: string;
    path: string;
    id: string;
    storyName: string | undefined;
    name: string;
}

interface Category {
    name: string;
    type: "file" | "folder";
    path?: string;
    children: Category[];
}

interface Config {
    port: number | number[];
    preview: number | number[];
    out: string;
    stories: string | string[];
    defaultStory: string | null;
    entry: string;
    expose: boolean;
    website: string;
    repo: string;
    version: string;
}
interface VibeContext {
    config: Config;
    storyTree: Category[];
    storyUrls: string[];
    stories: Story[];
}

export const useVibeContext = () => {
    // stories is useful for seeing all stories, storyTree is useful to see the structured version of the stories
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { stories, storyTree, config, storyUrls } = React.useContext(
        GenericContext as any,
    ) as VibeContext;
    return { storyTree, storyUrls, stories, Link, useNavigate, useLocation, config };
};
