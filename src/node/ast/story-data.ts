import { StoryData } from "../../index.js";
import { generator } from "./generator.js";

// this function returns the story entry data that becomes used for the construction of
// the dynamic plugin data that gets provided to the app
export const getStoryData = async (paths: string[]): Promise<StoryData[]> => {
	const storyData: StoryData[][] = [];
	for (const path of paths) {
		storyData.push(await generator(path));
	}
	const storiesFinished = storyData.flat();
	return storiesFinished;
};
