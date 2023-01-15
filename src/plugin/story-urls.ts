import { getStoryUrls } from "@structures/get-urls.js";
import { StoryData } from "@type/globals.js";

export const generateStoryUrls = (storyData: StoryData[]) => {
    let urlBase = `export let storyUrls = [];\n`;
    if (storyData) {
        const paths = getStoryUrls(storyData);
        urlBase += `storyUrls = ${JSON.stringify(paths)}`;
    }
    return `${urlBase}`;
};
