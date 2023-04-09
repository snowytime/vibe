export const _ = "";

export type Story = {
    url: string; // the url to the story in the ui
    filePath: string; // where the actual source of the file is
    componentName: string; // name of the component in the story file
    id: string; // random hash vibe id
    name: string; // custom story name, or the name of the component story
    [key: string]: string | { [key: string]: string }; // represents story meta
};

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
};

export interface Log {
    local: string;
    network?: string;
    duration: number;
    stories: number;
}
export interface BuildLog {
    stories: number;
    duration: number;
    destination: string;
}

export interface JsonStructure {
    website: string;
    repo: string;
    version: string;
    project: string;
    stories: {
        [key: string]: Story;
    };
}

export interface Category {
    name: string;
    type: "file" | "folder";
    path?: string;
    children: Category[];
    level: number;
}

export type Tree = Category[];
