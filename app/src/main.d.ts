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
    storyPaths: string[];
    stories: Story[];
}
declare module "virtual:vibe" {
    const stories: Story[];
    const storyTree: Category[];
    const config: Config;
    const Entry: React.ElementType;
    const Context: React.Context<VibeContext>;
    const storyPaths: string[];
    export { stories, storyTree, storyPaths, config, Entry, Context };
}
