import { StoryData } from "#type/globals.js";

// we just wanna get the paths themselves for premature routing
export const getStoryUrls = (storyData: StoryData[]) => {
    return storyData.map((story) => story.url.toLowerCase());
};
