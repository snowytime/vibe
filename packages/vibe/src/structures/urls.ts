import { Story } from "#types/index.js";

// we just wanna get the paths themselves for premature routing
export const getStoryUrls = (stories: Story[]) => {
    return stories.map((story) => story.url.toLowerCase());
};
