import { Stories, Category, Config, VibeContext } from "./types.js";

declare module "virtual:vibe" {
    const stories: Stories;
    const storyTree: Category[];
    const config: Config;
    const Entry: React.ElementType;
    const Context: React.Context<VibeContext>;
    const storyUrls: string[];
    export { stories, storyTree, storyUrls, config, Entry, Context };
}
