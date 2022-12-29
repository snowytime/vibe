/**
 * The main thing that any addon might ever need. Just run the `getVibeData` function and all relevant things
 * will be available to you
 */
import { getConfig } from "@config/index.js";
import {
	findConfig,
	findFolder,
	findStories,
	findVite
} from "@finders/index.js";
import { getStoryData } from "@parsers/index.js";
import { generateTree, getJson } from "@structures/index.js";

export const getVibeData = async () => {
	const [folderPath] = await findFolder();
	const [configPath] = await findConfig(folderPath);
	const [vitePath] = await findVite(folderPath);
	const config = await getConfig(folderPath);
	const stories = await findStories(config);
	const storyData = await getStoryData(stories);
	const storyTree = generateTree(storyData);
	const json = getJson(storyData, config);
	return {
		config,
		stories: storyData,
		json,
		storyTree,
		subscribers: [...stories, configPath],
		vitePath
	};
};
