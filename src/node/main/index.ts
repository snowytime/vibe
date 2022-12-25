/**
 * Functions used by clients
 */

import {
	findConfig,
	findFolder,
	findStories,
	getConfig,
	getJson,
	getStoryData
} from "../index.js";

export const getVibeData = async () => {
	// this function is dependent on the config, so we are going to generate that from scratch
	const [folderPath] = await findFolder();
	const [configPath] = await findConfig(folderPath);
	const config = await getConfig(folderPath);
	const stories = await findStories(config);
	const storyData = await getStoryData(stories);
	const json = getJson(storyData, config);
	return { json, stories, configPath, config };
};
