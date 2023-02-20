import { StoryData } from "#type/globals.js";
import { getFamily } from "./family.js";
import { astConverter } from "./initial.js";
import { getNamed } from "./named.js";
import { getVibe } from "./vibe.js";

export const getStoryData = async (paths: string[]): Promise<StoryData[]> => {
	const storyData: StoryData[][] = [];
	for (const path of paths) {
		storyData.push(await getSingleStories(path));
	}
	const storiesFinished = storyData.flat();
	return storiesFinished;
};
// @ts-ignore
export const getSingleStories = async (path: string): Promise<StoryData[]> => {
	const ast = await astConverter(path);
	// get the story data (meta will be combined with individual named stories)
	const family = getFamily(ast);
	// get the stories (rough) with family data
	const stories = getNamed(ast, path, family);
	// now we get the .vibe object that could be on the story, and combine it with the family meta
	getVibe(ast, stories, family);
	// return the stories
	return stories;
};
