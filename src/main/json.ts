import { getJson } from "@structures/meta-json.js";
import { Config, StoryData } from "@type/globals.js";

// general conversion of story-data to json-content
export const json = (config: Config, storyData: StoryData[]) => {
	const jsonContent = getJson(storyData, config);
	return JSON.stringify(jsonContent);
};
