import React from "react";

export type Story = {
    component: React.ElementType; // the name of the component
    doc: string | null;
    url: string; // the url to the story in the ui
    filePath: string; // where the actual source of the file is
    componentName: string; // name of the component in the story file
    id: string; // random hash vibe id
    name: string; // custom story name, or the name of the component story
    design: string;
};

export type Stories = Story[];

export type Config = {
    devPort: number | number[];
    previewPort: number | number[];
    outDir: string;
    stories: string | string[];
    defaultStory: string | null;
    entry: string; // if the entry file has any other name than [Ee]ntry.[jt]s[x]
    expose: boolean; // if vibe should expose the preview server to the internet
    website: string;
    repo: string;
    version: string;
    project: string;
    mode: "development" | "production";
    addons: any[];
};

export interface Category {
    name: string;
    type: "file" | "folder";
    path?: string;
    children: Category[];
    level: number;
}

export type Tree = Category[];

export type VibeContext = {
    stories: Story[];
    config: Config;
    storyTree: Tree;
    storyUrls: string[];
    theme: "light" | "dark";
    sidebarOpen: boolean;
    ready: boolean;
    dispatch: React.Dispatch<any>;
    resizeEnabled: boolean;
    filteredTree: Tree;
    search: string;
};
