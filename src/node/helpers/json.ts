import { Config, JsonStructure, StoryData } from "../../index.js";

export const getJson = (
	entryData: StoryData[],
	config: Config
): JsonStructure => {
	const result: JsonStructure = {
		website: config.website,
		repo: config.repo,
		version: config.version,
		stories: {}
	};
	entryData.forEach((story) => {
		result.stories[story.id] = {
			...story
		};
	});
	return result;
};
