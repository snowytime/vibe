export interface StoryData {
    url: string;
    filePath: string;
    componentName: string;
    id: string;
    name: string;
    familyName: string;
    [key: string]: string | { [key: string]: string };
}

export interface ServerReturn {
    local: string;
    network?: string;
    duration: number;
    stories: number;
}
export interface BuildReturn {
    stories: number;
    duration: number;
    destination: string;
}

export interface Config {
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

export interface JsonStructure {
    website: string;
    repo: string;
    version: string;
    stories: {
        [key: string]: StoryData;
    };
}

export interface Category {
    name: string;
    type: "file" | "folder";
    path?: string;
    children: Category[];
}

export type Tree = Category[];
