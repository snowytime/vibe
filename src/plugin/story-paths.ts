import { getStoryPaths } from "@structures/get-paths.js";
import { StoryData } from "@type/globals.js";

export const generateStoryPaths = (storyData: StoryData[]) => {
    let pathBase = `export let storyPaths = [];\n`;
    if (storyData) {
        const paths = getStoryPaths(storyData);
        pathBase += `storyPaths = ${JSON.stringify(paths)}`;
    }
    return `${pathBase}`;
};
