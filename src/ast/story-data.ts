import { StoryData } from "@type/globals.js";
import { getTree } from "./get-tree.js";

export const getStoryData = async (paths: string[]): Promise<StoryData[]> => {
	const storyData: StoryData[][] = [];
	for (const path of paths) {
		storyData.push(await getTree(path));
	}
	const storiesFinished = storyData.flat();
	return storiesFinished;
};
